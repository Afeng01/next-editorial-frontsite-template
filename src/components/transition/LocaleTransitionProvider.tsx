"use client";

import { useEffect, useRef, useState } from "react";

import type { Locale } from "@/lib/i18n/locales";

type LocaleTransitionProviderProps = {
  children: React.ReactNode;
  locale: Locale;
};

type TransitionState = {
  next: Locale;
  previous: Locale;
  switching: boolean;
};

const SWITCH_CLEAR_DELAY_MS = 420;

export function LocaleTransitionProvider({
  children,
  locale,
}: LocaleTransitionProviderProps) {
  const [renderedLocale, setRenderedLocale] = useState(locale);
  const [currentChildren, setCurrentChildren] = useState(children);
  const [previousChildren, setPreviousChildren] = useState<React.ReactNode | null>(null);
  const [transition, setTransition] = useState<TransitionState>({
    next: locale,
    previous: locale,
    switching: false,
  });
  const clearTimerRef = useRef<number | null>(null);
  const transitionIdRef = useRef(0);

  useEffect(() => {
    if (locale !== renderedLocale) {
      return;
    }

    queueMicrotask(() => {
      setCurrentChildren(children);
    });
  }, [children, locale, renderedLocale]);

  useEffect(() => {
    return () => {
      if (clearTimerRef.current != null) {
        window.clearTimeout(clearTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (locale === renderedLocale) {
      return;
    }

    if (clearTimerRef.current != null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }

    const previous = renderedLocale;
    const next = locale;
    transitionIdRef.current += 1;
    const transitionId = transitionIdRef.current;

    queueMicrotask(() => {
      setPreviousChildren(currentChildren);
      setTransition({
        next,
        previous,
        switching: true,
      });
      setRenderedLocale(next);
      setCurrentChildren(children);

      clearTimerRef.current = window.setTimeout(() => {
        if (transitionIdRef.current !== transitionId) {
          return;
        }

        setPreviousChildren(null);
        setTransition({
          next,
          previous: next,
          switching: false,
        });
        clearTimerRef.current = null;
      }, SWITCH_CLEAR_DELAY_MS);
    });
  }, [children, currentChildren, locale, renderedLocale]);

  return (
    <div
      className="locale-transition-root"
      data-locale={renderedLocale}
      data-locale-next={transition.switching ? transition.next : undefined}
      data-locale-previous={transition.switching ? transition.previous : undefined}
      data-locale-root="true"
      data-locale-switching={transition.switching ? "true" : undefined}
    >
      {previousChildren ? (
        <div
          aria-hidden="true"
          className="locale-transition-layer"
          data-locale-layer="previous"
        >
          {previousChildren}
        </div>
      ) : null}
      <div className="locale-transition-layer" data-locale-layer="current">
        {currentChildren}
      </div>
    </div>
  );
}
