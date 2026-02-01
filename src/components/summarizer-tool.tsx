'use client';

import { useState } from 'react';
import * as z from 'zod';
import { Loader2, Clipboard, Download, FileText as FileTextIcon, Link as LinkIcon, UploadCloud, BookText, ListChecks, HelpCircle, Lightbulb } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';

import { summarizeTextInput } from '@/ai/flows/summarize-text-input';
import { summarizePdfUpload } from '@/ai/flows/summarize-pdf-upload';
import { summarizeWebsiteUrl } from '@/ai/flows/summarize-website-url';

const textSchema = z.object({
  text: z.string().min(100, { message: 'Teks harus memiliki setidaknya 100 karakter.' }).max(15000, { message: 'Teks tidak boleh lebih dari 15.000 karakter.'}),
});

const urlSchema = z.object({
  url: z.string().url({ message: 'Harap masukkan URL yang valid.' }),
});

type OutputType = 'ringkasan' | 'poin penting' | 'pertanyaan' | 'ide konten';
type Language = 'indonesia' | 'inggris';

const outputTypes: { id: OutputType; label: string; icon: React.ElementType }[] = [
  { id: 'ringkasan', label: 'Ringkasan', icon: BookText },
  { id: 'poin penting', label: 'Poin Penting', icon: ListChecks },
  { id: 'pertanyaan', label: 'Pertanyaan', icon: HelpCircle },
  { id: 'ide konten', label: 'Ide Konten', icon: Lightbulb },
];

const languages: { id: Language; label: string }[] = [
  { id: 'indonesia', label: 'Indonesia' },
  { id: 'inggris', label: 'Inggris' },
];


export function SummarizerTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [activeTab, setActiveTab] = useState('text');

  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const [outputType, setOutputType] = useState<OutputType>('ringkasan');
  const [language, setLanguage] = useState<Language>('indonesia');
  const [intensity, setIntensity] = useState([50]);

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({ variant: 'destructive', title: 'File tidak valid', description: 'Hanya file PDF yang diizinkan.' });
        return;
      }
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        toast({ variant: 'destructive', title: 'Ukuran file terlalu besar', description: 'Ukuran file maksimal adalah 10MB.' });
        return;
      }
      setFile(selectedFile);
      setFileName(selectedFile.name);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSummary('');

    const options = {
      outputType,
      language,
      intensity: intensity[0],
    };

    try {
      if (activeTab === 'text') {
        textSchema.parse({ text: textInput });
        const result = await summarizeTextInput({ text: textInput, ...options });
        setSummary(result.result);
      } else if (activeTab === 'url') {
        urlSchema.parse({ url: urlInput });
        const result = await summarizeWebsiteUrl({ url: urlInput, ...options });
        setSummary(result.result);
      } else if (activeTab === 'pdf') {
        if (!file) {
          throw new Error('Silakan pilih file PDF untuk diringkas.');
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          try {
            const pdfDataUri = reader.result as string;
            const result = await summarizePdfUpload({ pdfDataUri, ...options });
            setSummary(result.result);
          } catch (error: any) {
            console.error('PDF summarization error:', error);
            toast({ variant: 'destructive', title: 'Gagal Meringkas PDF', description: error.message || 'Terjadi masalah saat memproses file Anda.' });
          } finally {
            setIsLoading(false);
          }
        };
        reader.onerror = () => {
          toast({ variant: 'destructive', title: 'Gagal Membaca File', description: 'Tidak dapat memuat file PDF.' });
          setIsLoading(false);
        };
        return;
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({ variant: 'destructive', title: 'Input tidak valid', description: error.errors[0].message });
      } else {
        console.error('Summarization error:', error);
        toast({ variant: 'destructive', title: 'Terjadi Kesalahan', description: error.message || 'Gagal memproses permintaan Anda.' });
      }
    } finally {
      if (activeTab !== 'pdf') {
        setIsLoading(false);
      }
    }
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    toast({ title: 'Berhasil', description: 'Hasil telah disalin ke clipboard.' });
  };

  const handleDownload = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hasil_tryngkasai.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl text-center">Mulai Meringkas</CardTitle>
          <CardDescription className="text-center">Pilih sumber konten dan atur preferensi output Anda.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="font-bold"><FileTextIcon className="mr-2 h-4 w-4" />Teks</TabsTrigger>
                <TabsTrigger value="pdf" className="font-bold"><UploadCloud className="mr-2 h-4 w-4" />PDF</TabsTrigger>
                <TabsTrigger value="url" className="font-bold"><LinkIcon className="mr-2 h-4 w-4" />URL</TabsTrigger>
              </TabsList>
              <TabsContent value="text" className="mt-4">
                <div className="space-y-4">
                  <Label htmlFor="text-input" className="sr-only">Teks</Label>
                  <Textarea
                    id="text-input"
                    placeholder="Tempelkan teks Anda di sini... (minimal 100 karakter)"
                    className="min-h-[250px] resize-y"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </TabsContent>
              <TabsContent value="pdf" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="pdf-upload">Upload file PDF</Label>
                  <div className="relative">
                    <Input id="pdf-upload" type="file" accept="application/pdf" onChange={handleFileChange} className="pr-24" disabled={isLoading} />
                    <span className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-muted-foreground truncate max-w-[100px]">{fileName}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Ukuran file maksimal 10MB.</p>
                </div>
              </TabsContent>
              <TabsContent value="url" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="url-input">URL Website</Label>
                  <Input
                    id="url-input"
                    type="url"
                    placeholder="https://contoh-website.com/artikel"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    disabled={isLoading}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label>Jenis Output</Label>
                <div className="flex flex-wrap gap-2">
                  {outputTypes.map((type) => (
                    <Button
                      key={type.id}
                      type="button"
                      variant={outputType === type.id ? 'default' : 'outline'}
                      onClick={() => setOutputType(type.id)}
                      disabled={isLoading}
                      className="text-xs sm:text-sm font-bold"
                    >
                      <type.icon className="mr-2 h-4 w-4" />
                      {type.label}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Bahasa</Label>
                <div className="flex gap-2">
                  {languages.map((lang) => (
                    <Button
                      key={lang.id}
                      type="button"
                      variant={language === lang.id ? 'default' : 'outline'}
                      onClick={() => setLanguage(lang.id)}
                      disabled={isLoading}
                      className="font-bold"
                    >
                      {lang.label}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <Label htmlFor="intensity">Intensitas Ringkasan ({intensity[0]})</Label>
              <Slider
                id="intensity"
                min={0}
                max={100}
                step={1}
                value={intensity}
                onValueChange={setIntensity}
                disabled={isLoading}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Lebih Panjang</span>
                <span>Lebih Pendek</span>
              </div>
            </div>

            <Button type="submit" size="lg" className="mt-8 w-full bg-accent text-accent-foreground hover:bg-accent/90 font-bold" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                'Proses'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Hasil</CardTitle>
          <CardDescription>Berikut hasil yang telah diproses oleh AI.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-grow flex-col">
            <div className="relative flex-grow rounded-md border bg-background">
                {isLoading && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background/80">
                    <Loader2 className="h-10 w-10 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">AI sedang bekerja...</p>
                </div>
                )}
                <ScrollArea className="h-[350px] w-full">
                <div className="p-4">
                    <p className="text-sm text-foreground/90 whitespace-pre-wrap">{summary}</p>
                </div>
                </ScrollArea>
                {!summary && !isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-muted-foreground">Menunggu untuk diproses...</p>
                    </div>
                )}
            </div>
             {summary && !isLoading && (
              <div className="mt-4 flex justify-end gap-2">
                <Button size="sm" onClick={handleCopy} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Clipboard className="mr-2 h-4 w-4" />
                  Salin
                </Button>
                <Button size="sm" onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Download className="mr-2 h-4 w-4" />
                  Unduh
                </Button>
              </div>
            )}
        </CardContent>
      </Card>
    </div>
  );
}
