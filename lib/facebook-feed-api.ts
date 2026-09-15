import type { InstagramFeedPayload } from "@/lib/instagram-feed-api";
import { publicApiUrl } from "./public-api";

const emptyFeed: InstagramFeedPayload = { profile: null, posts: [] };

export async function fetchFacebookFeed(): Promise<InstagramFeedPayload> {
  const api = publicApiUrl();
  if (!api) return emptyFeed;

  try {
    const response = await fetch(`${api}/social/facebook-feed`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return emptyFeed;
    const payload = (await response.json()) as { data?: InstagramFeedPayload };
    if (payload.data && Array.isArray(payload.data.posts)) {
      return {
        profile: payload.data.profile ?? null,
        posts: payload.data.posts,
      };
    }
    return emptyFeed;
  } catch {
    return emptyFeed;
  }
}
