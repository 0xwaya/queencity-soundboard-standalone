"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  event: string;
  label?: string;
  children: ReactNode;
  className?: string;
};

export default function TrackedExternalLink({ href, event, label, children, className, ...rest }: Props) {
  return (
    <a
      href={href}
      className={className}
      onClick={() => track(event, { label: label ?? href })}
      {...rest}
    >
      {children}
    </a>
  );
}
