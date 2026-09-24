"use client";

import { useRef, type ReactNode } from "react";
import { useInViewOnce } from "@/lib/use-in-view";
import { socialPhones as copy } from "@/lib/content";
import { useLanguage } from "@/lib/i18n";
import { InstagramPhoneFeed } from "@/components/InstagramPhoneFeed";
import { FacebookPhoneFeed } from "@/components/FacebookPhoneFeed";
import {
  facebookPageUrl,
  instagramHandle,
  instagramProfileUrl,
} from "@/lib/social-embeds";
import { SocialBrandIcon } from "../SocialBrandIcon";
import { Reveal } from "../motion";
import { SectionHeading, Shell } from "../ui";

function PhoneFrame({
  platform,
  title,
  href,
  openLabel,
  hideChrome,
  children,
}: {
  platform: "facebook" | "instagram";
  title: string;
  href: string;
  openLabel: string;
  hideChrome?: boolean;
  children: ReactNode;
}) {
  return (
    <figure className="social-phone">
      <div className="social-phone-bezel">
        <div className="social-phone-notch" aria-hidden />
        <div className="social-phone-screen">
          {hideChrome ? null : (
            <header className="social-phone-bar">
              <SocialBrandIcon platform={platform} />
              <span>{title}</span>
            </header>
          )}
          <div className="social-phone-feed">{children}</div>
        </div>
      </div>
      <figcaption className="social-phone-caption">
        <a href={href} target="_blank" rel="me noreferrer" className="social-phone-open">
          {openLabel}
        </a>
      </figcaption>
    </figure>
  );
}

export function SocialPhones({ headingLevel = 2 }: { headingLevel?: 1 | 2 } = {}) {
  const { t } = useLanguage();
  const rowRef = useRef<HTMLDivElement>(null);
  const showFeeds = useInViewOnce(rowRef, { rootMargin: "480px 0px" });

  return (
    <section id="social" className="social-phones-section">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <SectionHeading kicker={copy.kicker} title={copy.title} invert align="center" level={headingLevel} />
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-white/70">{t(copy.lead)}</p>
        </Reveal>

        <div ref={rowRef} className="social-phones-row" dir="ltr">
          <PhoneFrame
            platform="facebook"
            title={t(copy.facebook)}
            href={facebookPageUrl()}
            openLabel={t(copy.openFacebook)}
            hideChrome
          >
            {showFeeds ? <FacebookPhoneFeed title={t(copy.facebookTitle)} /> : null}
          </PhoneFrame>

          <PhoneFrame
            platform="instagram"
            title={`@${instagramHandle()}`}
            href={instagramProfileUrl()}
            openLabel={t(copy.openInstagram)}
            hideChrome
          >
            {showFeeds ? <InstagramPhoneFeed title={t(copy.instagramTitle)} /> : null}
          </PhoneFrame>
        </div>
      </Shell>
    </section>
  );
}
