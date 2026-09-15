import { publicApiUrl } from "./public-api";

export type InstagramFeedPost = {
  id: string;
  caption: string | null;
  media_type: string;
  media_url: string | null;
  preview_url?: string | null;
  permalink: string | null;
  timestamp: string | null;
};

export type InstagramProfile = {
  username: string;
  name: string | null;
  biography: string | null;
  profile_picture_url: string | null;
  followers_count: number | null;
  follows_count: number | null;
  media_count: number | null;
  permalink?: string | null;
};

export type InstagramFeedPayload = {
  profile: InstagramProfile | null;
  posts: InstagramFeedPost[];
};

const emptyFeed: InstagramFeedPayload = { profile: null, posts: [] };

export async function fetchInstagramFeed(): Promise<InstagramFeedPayload> {
  const api = publicApiUrl();
  if (!api) return emptyFeed;

  try {
    const response = await fetch(`${api}/social/instagram-feed`, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });
    if (!response.ok) return emptyFeed;
    const payload = (await response.json()) as { data?: InstagramFeedPayload | InstagramFeedPost[] };
    if (Array.isArray(payload.data)) {
      return { profile: null, posts: payload.data };
    }
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
