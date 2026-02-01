'use server';

/**
 * @fileOverview Processes content from uploaded PDF files using Gemini AI.
 *
 * - summarizePdfUpload - A function that handles the PDF processing.
 * - SummarizePdfUploadInput - The input type for the summarizePdfUpload function.
 * - SummarizePdfUploadOutput - The return type for the summarizePdfUpload function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePdfUploadInputSchema = z.object({
  pdfDataUri: z
    .string()
    .describe(
      "A PDF file, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  outputType: z.string().describe('The desired output type (e.g., "Ringkasan", "Poin Penting").'),
  language: z.string().describe('The desired output language (e.g., "Indonesia", "Inggris").'),
  intensity: z.number().describe('The intensity of the summarization (0-100).'),
});
export type SummarizePdfUploadInput = z.infer<typeof SummarizePdfUploadInputSchema>;

const SummarizePdfUploadOutputSchema = z.object({
  result: z.string().describe('The generated output based on the user request.'),
});
export type SummarizePdfUploadOutput = z.infer<typeof SummarizePdfUploadOutputSchema>;

export async function summarizePdfUpload(input: SummarizePdfUploadInput): Promise<SummarizePdfUploadOutput> {
  return summarizePdfUploadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePdfUploadPrompt',
  input: {schema: SummarizePdfUploadInputSchema},
  output: {schema: SummarizePdfUploadOutputSchema,
    format: 'json',
  },
  prompt: `You are an expert content analyst. Your task is to process the content of the PDF provided below based on the user's requirements.

Task: Generate '{{outputType}}'
Output Language: {{language}}
Conciseness Level: {{intensity}} (A value from 0 to 100, where 0 is least concise and 100 is most concise).

Based on the Conciseness Level, adjust the length and detail of your output.

PDF to process:
{{media url=pdfDataUri}}

Provide your response in the 'result' field of the JSON output.`,
});

const summarizePdfUploadFlow = ai.defineFlow(
  {
    name: 'summarizePdfUploadFlow',
    inputSchema: SummarizePdfUploadInputSchema,
    outputSchema: SummarizePdfUploadOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
