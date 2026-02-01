'use server';

/**
 * @fileOverview Summarizes the content of a website given its URL.
 *
 * - summarizeWebsiteUrl - A function that handles the website summarization process.
 * - SummarizeWebsiteUrlInput - The input type for the summarizeWebsiteUrl function.
 * - SummarizeWebsiteUrlOutput - The return type for the summarizeWebsiteUrl function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {extractWebsiteContent} from '@/services/extract-website-content';

const SummarizeWebsiteUrlInputSchema = z.object({
  url: z.string().url().describe('The URL of the website to summarize.'),
});
export type SummarizeWebsiteUrlInput = z.infer<typeof SummarizeWebsiteUrlInputSchema>;

const SummarizeWebsiteUrlOutputSchema = z.object({
  summary: z.string().describe('The summarized content of the website.'),
});
export type SummarizeWebsiteUrlOutput = z.infer<typeof SummarizeWebsiteUrlOutputSchema>;

export async function summarizeWebsiteUrl(input: SummarizeWebsiteUrlInput): Promise<SummarizeWebsiteUrlOutput> {
  return summarizeWebsiteUrlFlow(input);
}

const SummarizeContentInputSchema = z.object({
  websiteContent: z.string().describe('The content of the website to summarize.'),
});

const summarizeWebsitePrompt = ai.definePrompt({
  name: 'summarizeWebsitePrompt',
  input: {schema: SummarizeContentInputSchema},
  output: {schema: SummarizeWebsiteUrlOutputSchema},
  prompt: `Summarize the content of the following website:

Website Content: {{{websiteContent}}}`,
});

const summarizeWebsiteUrlFlow = ai.defineFlow(
  {
    name: 'summarizeWebsiteUrlFlow',
    inputSchema: SummarizeWebsiteUrlInputSchema,
    outputSchema: SummarizeWebsiteUrlOutputSchema,
  },
  async input => {
    const websiteContent = await extractWebsiteContent(input.url);
    const {output} = await summarizeWebsitePrompt({websiteContent});
    return output!;
  }
);
