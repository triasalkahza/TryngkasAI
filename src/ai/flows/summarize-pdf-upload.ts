'use server';

/**
 * @fileOverview Summarizes content from uploaded PDF files using Gemini AI.
 *
 * - summarizePdfUpload - A function that handles the PDF summarization process.
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
});
export type SummarizePdfUploadInput = z.infer<typeof SummarizePdfUploadInputSchema>;

const SummarizePdfUploadOutputSchema = z.object({
  summary: z.string().describe('The summary of the PDF content.'),
});
export type SummarizePdfUploadOutput = z.infer<typeof SummarizePdfUploadOutputSchema>;

export async function summarizePdfUpload(input: SummarizePdfUploadInput): Promise<SummarizePdfUploadOutput> {
  return summarizePdfUploadFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizePdfUploadPrompt',
  input: {schema: SummarizePdfUploadInputSchema},
  output: {schema: SummarizePdfUploadOutputSchema},
  prompt: `You are an expert summarizer who creates concise and accurate summaries of PDF documents.

  Summarize the content of the following PDF document:

  {{media url=pdfDataUri}}
  `,
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
