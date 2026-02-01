'use server';

/**
 * @fileOverview Processes text input using Gemini AI based on user-defined options.
 *
 * - summarizeTextInput - A function that handles the text processing.
 * - SummarizeTextInputInput - The input type for the summarizeTextInput function.
 * - SummarizeTextInputOutput - The return type for the summarizeTextInput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTextInputInputSchema = z.object({
  text: z.string().describe('The text to process.'),
  outputType: z.string().describe('The desired output type (e.g., "Ringkasan", "Poin Penting").'),
  language: z.string().describe('The desired output language (e.g., "Indonesia", "Inggris").'),
  intensity: z.number().describe('The intensity of the summarization (0-100).'),
});
export type SummarizeTextInputInput = z.infer<typeof SummarizeTextInputInputSchema>;

const SummarizeTextInputOutputSchema = z.object({
  result: z.string().describe('The generated output based on the user request.'),
});
export type SummarizeTextInputOutput = z.infer<typeof SummarizeTextInputOutputSchema>;

export async function summarizeTextInput(input: SummarizeTextInputInput): Promise<SummarizeTextInputOutput> {
  return summarizeTextInputFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTextInputPrompt',
  input: {schema: SummarizeTextInputInputSchema},
  output: {schema: SummarizeTextInputOutputSchema,
    format: 'json',
  },
  prompt: `You are an expert content analyst. Your task is to process the text provided below based on the user's requirements.

Task: Generate '{{outputType}}'
Output Language: {{language}}
Conciseness Level: {{intensity}} (A value from 0 to 100, where 0 is least concise and 100 is most concise).

Based on the Conciseness Level, adjust the length and detail of your output.

Text to process:
{{text}}

Provide your response in the 'result' field of the JSON output.`,
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
