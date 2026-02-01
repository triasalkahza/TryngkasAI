'use server';

/**
 * @fileOverview Processes the content of a website given its URL.
 *
 * - summarizeWebsiteUrl - A function that handles the website processing.
 * - SummarizeWebsiteUrlInput - The input type for the summarizeWebsiteUrl function.
 * - SummarizeWebsiteUrlOutput - The return type for the summarizeWebsiteUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {extractWebsiteContent} from '@/services/extract-website-content';

const SummarizeWebsiteUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to process.'),
  outputType: z.string().describe('The desired output type (e.g., "Ringkasan", "Poin Penting").'),
  language: z.string().describe('The desired output language (e.g., "Indonesia", "Inggris").'),
  intensity: z.number().describe('The intensity of the summarization (0-100).'),
});
export type SummarizeWebsiteUrlInput = z.infer<typeof SummarizeWebsiteUrlInputSchema>;

const SummarizeWebsiteUrlOutputSchema = z.object({
  result: z.string().describe('The generated output based on the user request.'),
});
export type SummarizeWebsiteUrlOutput = z.infer<typeof SummarizeWebsiteUrlOutputSchema>;

export async function summarizeWebsiteUrl(input: SummarizeWebsiteUrlInput): Promise<SummarizeWebsiteUrlOutput> {
  return summarizeWebsiteUrlFlow(input);
}

const SummarizeContentInputSchema = z.object({
  websiteContent: z.string().describe('The content of the website to process.'),
  outputType: z.string().describe('The desired output type (e.g., "Ringkasan", "Poin Penting").'),
  language: z.string().describe('The desired output language (e.g., "Indonesia", "Inggris").'),
  intensity: z.number().describe('The intensity of the summarization (0-100).'),
});

const summarizeWebsitePrompt = ai.definePrompt({
  name: 'summarizeWebsitePrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeWebsiteUrlOutputSchema,
    format: 'json',
  },
  prompt: `You are an expert content analyst. Your task is to process the text provided below based on the user's requirements.

Task: Generate '{{outputType}}'
Output Language: {{language}}
Conciseness Level: {{intensity}} (A value from 0 to 100, where 0 is least concise and 100 is most concise).

Based on the Conciseness Level, adjust the length and detail of your output.

Output Formatting Instructions:
- If the task is 'ringkasan', provide a concise summary in a single, well-structured paragraph.
- If the task is 'poin penting', provide the output as a bulleted list. Each point must start with '• ' and be on a new line. Separate each point with a single empty line.
- If the task is 'pertanyaan', provide the output as a numbered list of questions (e.g., 1., 2., 3.). Each question must be on a new line. Separate each question with a single empty line.
- If the task is 'ide konten', provide the output as a bulleted list. Each point must start with '• ' and be on a new line. Separate each point with a single empty line.

Website Content: 
{{{websiteContent}}}

Provide your response in the 'result' field of the JSON output, following the formatting instructions strictly.`,
});

const summarizeWebsiteUrlFlow = ai.defineFlow(
  {
    name: 'summarizeWebsiteUrlFlow',
    inputSchema: SummarizeWebsiteUrlInputSchema,
    outputSchema: SummarizeWebsiteUrlOutputSchema,
  },
  async ({url, ...options}) => {
    const websiteContent = await extractWebsiteContent(url);
    const {output} = await summarizeWebsitePrompt({websiteContent, ...options});
    return output!;
  }
);
