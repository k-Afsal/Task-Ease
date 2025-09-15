'use server';

/**
 * @fileOverview An AI agent that suggests tasks to the user.
 *
 * - suggestTask - A function that generates a personalized task suggestion.
 * - SuggestTaskInput - The input type for the suggestTask function.
 * - SuggestTaskOutput - The return type for the suggestTask function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTaskInputSchema = z.object({
  userContext: z
    .string()
    .describe(
      'Briefly describe the user, their current goals, and their current tasks.'
    ),
});
export type SuggestTaskInput = z.infer<typeof SuggestTaskInputSchema>;

const SuggestTaskOutputSchema = z.object({
  taskSuggestion: z.string().describe('A suggested task for the user to add to their to-do list.'),
});
export type SuggestTaskOutput = z.infer<typeof SuggestTaskOutputSchema>;

export async function suggestTask(input: SuggestTaskInput): Promise<SuggestTaskOutput> {
  return suggestTaskFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTaskPrompt',
  input: {schema: SuggestTaskInputSchema},
  output: {schema: SuggestTaskOutputSchema},
  prompt: `You are a helpful AI assistant that suggests tasks to users based on their context.

  Consider the user's current goals, tasks, and any other relevant information to suggest a new task that would be helpful for them to add to their to-do list.

  User Context: {{{userContext}}}

  Task Suggestion:`,
});

const suggestTaskFlow = ai.defineFlow(
  {
    name: 'suggestTaskFlow',
    inputSchema: SuggestTaskInputSchema,
    outputSchema: SuggestTaskOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
