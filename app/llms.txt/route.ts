import { llmsTxt } from "@/lib/llms-document";

export const dynamic = "force-static";

export async function GET() {
  const body = await llmsTxt();
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
