'use server';

/**
 * @fileOverview Summarizes text input using Gemini AI.
 *
 * - summarizeTextInput - A function that handles the text summarization process.
 * - SummarizeTextInputInput - The input type for the summarizeTextInput function.
 * - SummarizeTextInputOutput - The return type for the summarizeTextInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputInputSchema = z.object({
  text: z.string().describe('The text to summarize.'),
});
export type SummarizeTextInputInput = z.infer<typeof SummarizeTextInputInputSchema>;

const SummarizeTextInputOutputSchema = z.object({
  summary: z.string().describe('The summarized text.'),
});
export type SummarizeTextInputOutput = z.infer<typeof SummarizeTextInputOutputSchema>;

export async function summarizeTextInput(input: SummarizeTextInputInput): Promise<SummarizeTextInputOutput> {
  return summarizeTextInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextInputPrompt',
  input: {schema: SummarizeTextInputInputSchema},
  output: {schema: SummarizeTextInputOutputSchema},
  prompt: `Summarize the following text:\n\n{{text}}`,
});

const summarizeTextInputFlow = ai.defineFlow(
  {
    name: 'summarizeTextInputFlow',
    inputSchema: SummarizeTextInputInputSchema,
    outputSchema: SummarizeTextInputOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
