"use client";

import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { AutoplayVideo } from "@/components/AutoplayVideo";
import { ProgressiveImage } from "@/components/ProgressiveImage";
import { socialPhones as copy } from "@/lib/content";
import { formatStat } from "@/lib/format-stat";
import {
  fetchInstagramFeed,
  type InstagramFeedPayload,
  type InstagramFeedPost,
} from "@/lib/instagram-feed-api";
import { instagramEmbedSrc, instagramHandle, instagramProfileUrl } from "@/lib/social-embeds";
import { useLanguage } from "@/lib/i18n";
import { useInViewOnce } from "@/lib/use-in-view";
import { usePhoneFeedScroll } from "@/lib/use-phone-feed-scroll";

function isReel(post: InstagramFeedPost) {
  return post.media_type === "VIDEO" || post.media_type === "REELS";
}

function isCarousel(post: InstagramFeedPost) {
  return post.media_type === "CAROUSEL_ALBUM";
}

function TileBadge({ post }: { post: InstagramFeedPost }) {
  if (isCarousel(post)) {
    return (
      <svg className="ig-profile-badge" viewBox="0 0 24 24" aria-hidden>
        <path
          fill="currentColor"
          d="M7 7h10v10H7V7Zm-3 3h2v8h8v2H4V10Zm16-6H9a2 2 0 0 0-2 2v1h11v11h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"
        />
      </svg>
    );
  }
  if (isReel(post)) {
    return (
      <svg className="ig-profile-badge" viewBox="0 0 24 24" aria-hidden>
        <path fill="currentColor" d="M8 6.8v10.4L18 12 8 6.8Z" />
      </svg>
    );
  }
  return null;
}

function ProfileTile({
  post,
  root,
}: {
  post: InstagramFeedPost;
  root: RefObject<HTMLDivElement | null>;
}) {
  const videoSrc = isReel(post) ? post.media_url : null;
  const imageSrc = post.preview_url || (!videoSrc ? post.media_url : null);
  if (!videoSrc && !imageSrc) return null;
  const inner = (
    <>
      {videoSrc ? (
        <AutoplayVideo src={videoSrc} poster={imageSrc ?? undefined} className="ig-profile-media" root={root} />
      ) : (
        <ProgressiveImage
          src={imageSrc}
          alt={post.caption ?? ""}
          referrerPolicy="no-referrer"
          root={root}
          rootMargin="80px 0px"
          imgClassName="ig-profile-media"
        />
      )}
      <TileBadge post={post} />
    </>
  );

  if (post.permalink) {
    return (
      <a href={post.permalink} target="_blank" rel="noreferrer" className="ig-profile-tile">
        {inner}
      </a>
    );
  }

  return <div className="ig-profile-tile">{inner}</div>;
}

function ReelViewer({
  post,
  root,
}: {
  post: InstagramFeedPost;
  root: RefObject<HTMLDivElement | null>;
}) {
  const src = post.media_url;
  if (!src) {
    return <ProfileTile post={post} root={root} />;
  }

  return (
    <div className="ig-reel-tile">
      <AutoplayVideo src={src} poster={post.preview_url ?? undefined} className="ig-reel-video" root={root} />
      {post.permalink ? (
        <a href={post.permalink} target="_blank" rel="noreferrer" className="ig-reel-open">
          <span className="sr-only">{post.caption ?? "Instagram"}</span>
        </a>
      ) : null}
    </div>
  );
}

function DeferredEmbed({ title }: { title: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const show = useInViewOnce(hostRef, { rootMargin: "200px 0px" });

  return (
    <div ref={hostRef} className="social-phone-iframe-wrap">
      {show ? (
        <iframe
          title={title}
          src={instagramEmbedSrc()}
          loading="lazy"
          allow="encrypted-media; clipboard-write"
          className="social-phone-iframe"
        />
      ) : null}
    </div>
  );
}

export function InstagramPhoneFeed({ title }: { title: string }) {
  const { t, dir, locale } = useLanguage();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [feed, setFeed] = useState<InstagramFeedPayload | null>(null);
  const [tab, setTab] = useState<"posts" | "reels">("posts");
  usePhoneFeedScroll(scrollRef, (feed?.posts.length ?? 0) > 0);

  useEffect(() => {
    let cancelled = false;
    fetchInstagramFeed().then((payload) => {
      if (!cancelled) setFeed(payload);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const posts = feed?.posts ?? [];
  const visible = useMemo(
    () => (tab === "reels" ? posts.filter(isReel) : posts.filter((post) => post.preview_url || post.media_url)),
    [posts, tab],
  );

  if (feed === null) {
    return <p className="ig-feed-status">{t(copy.loading)}</p>;
  }

  if (posts.length === 0) {
    return <DeferredEmbed title={title} />;
  }

  const handle = feed.profile?.username || instagramHandle();
  const displayName = feed.profile?.name || handle;
  const avatar = feed.profile?.profile_picture_url;
  const postCount = feed.profile?.media_count ?? posts.length;
  const followers = feed.profile?.followers_count ?? 0;
  const following = feed.profile?.follows_count ?? 0;
  const profileUrl = feed.profile?.permalink || instagramProfileUrl();

  return (
    <div className="ig-profile" dir={dir}>
      <div className="ig-profile-top">
        <span className="ig-profile-username">{handle}</span>
        <a href={profileUrl} target="_blank" rel="noreferrer" className="ig-profile-more">
          {t(copy.openInstagram)}
        </a>
      </div>

      <div className="ig-profile-chrome">
        <div className="ig-profile-head">
          {avatar ? (
            <ProgressiveImage
              src={avatar}
              alt=""
              referrerPolicy="no-referrer"
              className="ig-profile-avatar overflow-hidden"
              imgClassName="h-full w-full object-cover"
            />
          ) : (
            <span className="ig-profile-avatar ig-profile-avatar-fallback" aria-hidden>
              {handle.slice(0, 1).toUpperCase()}
            </span>
          )}
          <dl className="ig-profile-stats">
            <div>
              <dt>{t(copy.postsStat)}</dt>
              <dd>{formatStat(postCount, locale)}</dd>
            </div>
            <div>
              <dt>{t(copy.followersStat)}</dt>
              <dd>{formatStat(followers, locale)}</dd>
            </div>
            <div>
              <dt>{t(copy.followingStat)}</dt>
              <dd>{formatStat(following, locale)}</dd>
            </div>
          </dl>
        </div>

        <div className="ig-profile-bio">
          <p className="ig-profile-name">{displayName}</p>
          {feed.profile?.biography ? <p>{feed.profile.biography}</p> : null}
        </div>

        <div className="ig-profile-actions">
          <a href={profileUrl} target="_blank" rel="noreferrer" className="ig-profile-follow">
            {t(copy.follow)}
          </a>
        </div>

        <div className="ig-profile-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === "posts"}
            className={tab === "posts" ? "ig-profile-tab is-active" : "ig-profile-tab"}
            onClick={() => setTab("posts")}
          >
            {t(copy.postsTab)}
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === "reels"}
            className={tab === "reels" ? "ig-profile-tab is-active" : "ig-profile-tab"}
            onClick={() => setTab("reels")}
          >
            {t(copy.reelsTab)}
          </button>
        </div>
      </div>

      <div
        className="ig-profile-scroll"
        ref={scrollRef}
        tabIndex={0}
        aria-label={t(copy.feedScroll)}
      >
        {visible.length === 0 ? (
          <p className="ig-feed-status">{t(copy.emptyReels)}</p>
        ) : tab === "reels" ? (
          <div className="ig-reel-stack">
            {visible.map((post) => (
              <ReelViewer key={post.id} post={post} root={scrollRef} />
            ))}
          </div>
        ) : (
          <div className="ig-profile-grid">
            {visible.map((post) => (
              <ProfileTile key={post.id} post={post} root={scrollRef} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
