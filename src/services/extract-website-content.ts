'use server';

export async function extractWebsiteContent(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch website content: ${response.statusText}`);
  }
  return response.text();
}
