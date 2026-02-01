'use client';

import { useState } from 'react';
import * as z from 'zod';
import { Loader2, Clipboard, Download, FileText, Link as LinkIcon, UploadCloud } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

import { summarizeTextInput } from '@/ai/flows/summarize-text-input';
import { summarizePdfUpload } from '@/ai/flows/summarize-pdf-upload';
import { summarizeWebsiteUrl } from '@/ai/flows/summarize-website-url';

const textSchema = z.object({
  text: z.string().min(100, { message: 'Teks harus memiliki setidaknya 100 karakter.' }).max(15000, { message: 'Teks tidak boleh lebih dari 15.000 karakter.'}),
});

const urlSchema = z.object({
  url: z.string().url({ message: 'Harap masukkan URL yang valid.' }),
});

export function SummarizerTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [activeTab, setActiveTab] = useState('text');

  const [textInput, setTextInput] = useState('');
  const [urlInput, setUrlInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        toast({ variant: 'destructive', title: 'File tidak valid', description: 'Hanya file PDF yang diizinkan.' });
        return;
      }
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
        toast({ variant: 'destructive', title: 'Ukuran file terlalu besar', description: 'Ukuran file maksimal adalah 5MB.' });
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

    try {
      if (activeTab === 'text') {
        textSchema.parse({ text: textInput });
        const result = await summarizeTextInput({ text: textInput });
        setSummary(result.summary);
      } else if (activeTab === 'url') {
        urlSchema.parse({ url: urlInput });
        const result = await summarizeWebsiteUrl({ url: urlInput });
        setSummary(result.summary);
      } else if (activeTab === 'pdf') {
        if (!file) {
          throw new Error('Silakan pilih file PDF untuk diringkas.');
        }
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
          try {
            const pdfDataUri = reader.result as string;
            const result = await summarizePdfUpload({ pdfDataUri });
            setSummary(result.summary);
            setIsLoading(false);
          } catch (error) {
            console.error('PDF summarization error:', error);
            toast({ variant: 'destructive', title: 'Gagal Meringkas PDF', description: 'Terjadi masalah saat memproses file Anda.' });
            setIsLoading(false);
          }
        };
        reader.onerror = () => {
          toast({ variant: 'destructive', title: 'Gagal Membaca File', description: 'Tidak dapat memuat file PDF.' });
          setIsLoading(false);
        };
        // FileReader is async, so we return here to avoid setting isLoading to false prematurely.
        return;
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast({ variant: 'destructive', title: 'Input tidak valid', description: error.errors[0].message });
      } else {
        console.error('Summarization error:', error);
        toast({ variant: 'destructive', title: 'Terjadi Kesalahan', description: error.message || 'Gagal memproses permintaan Anda.' });
      }
    }
    
    setIsLoading(false);
  };

  const handleCopy = () => {
    if (!summary) return;
    navigator.clipboard.writeText(summary);
    toast({ title: 'Berhasil', description: 'Ringkasan telah disalin ke clipboard.' });
  };

  const handleDownload = () => {
    if (!summary) return;
    const blob = new Blob([summary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ringkasan_tryngkasai.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Mulai Meringkas</CardTitle>
          <CardDescription>Pilih sumber konten yang ingin Anda ringkas.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="text"><FileText className="mr-2 h-4 w-4" />Teks</TabsTrigger>
              <TabsTrigger value="pdf"><UploadCloud className="mr-2 h-4 w-4" />PDF</TabsTrigger>
              <TabsTrigger value="url"><LinkIcon className="mr-2 h-4 w-4" />URL</TabsTrigger>
            </TabsList>
            <form onSubmit={handleSubmit}>
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
                  <p className="text-xs text-muted-foreground">Ukuran file maksimal 5MB.</p>
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
              <Button type="submit" size="lg" className="mt-6 w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Meringkas...
                  </>
                ) : (
                  'Ringkas Sekarang'
                )}
              </Button>
            </form>
          </Tabs>
        </CardContent>
      </Card>
      
      <Card className="flex flex-col">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Hasil Ringkasan</CardTitle>
          <CardDescription>Ringkasan Anda akan muncul di sini.</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="relative h-full min-h-[300px] rounded-md border bg-background p-4">
            {isLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="mt-4 text-muted-foreground">AI sedang bekerja...</p>
              </div>
            )}
            <p className="text-sm text-foreground/90 whitespace-pre-wrap">{summary}</p>
            {!summary && !isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-muted-foreground">Menunggu untuk diringkas...</p>
                </div>
            )}
            {summary && (
              <div className="absolute right-2 top-2 flex gap-2">
                <Button variant="ghost" size="icon" onClick={handleCopy}>
                  <Clipboard className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleDownload}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
