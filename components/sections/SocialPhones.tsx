"use client";

import type { ReactNode } from "react";
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
        <a href={href} target="_blank" rel="noreferrer" className="social-phone-open">
          {openLabel}
        </a>
      </figcaption>
    </figure>
  );
}

export function SocialPhones() {
  const { t } = useLanguage();

  return (
    <section id="social" className="social-phones-section">
      <Shell>
        <Reveal className="mx-auto mb-10 max-w-2xl text-center md:mb-14">
          <SectionHeading kicker={copy.kicker} title={copy.title} invert align="center" />
          <p className="mt-5 text-[0.98rem] leading-[1.7] text-white/70">{t(copy.lead)}</p>
        </Reveal>

        <div className="social-phones-row" dir="ltr" role="list">
          <PhoneFrame
            platform="facebook"
            title={t(copy.facebook)}
            href={facebookPageUrl()}
            openLabel={t(copy.openFacebook)}
            hideChrome
          >
            <FacebookPhoneFeed title={t(copy.facebookTitle)} />
          </PhoneFrame>

          <PhoneFrame
            platform="instagram"
            title={`@${instagramHandle()}`}
            href={instagramProfileUrl()}
            openLabel={t(copy.openInstagram)}
            hideChrome
          >
            <InstagramPhoneFeed title={t(copy.instagramTitle)} />
          </PhoneFrame>
        </div>
      </Shell>
    </section>
  );
}
