import { Link, type LinkProps } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type AnchorProps = Omit<ComponentProps<"a">, "href">;

export type SmartLinkProps = AnchorProps &
  ({ to: LinkProps["to"]; href?: never } | { href: string; to?: never });

/**
 * Renderiza um `Link` do router para rotas internas (`to`) ou uma âncora
 * externa que abre em nova aba (`href`).
 */
export function SmartLink({ to, href, ...props }: SmartLinkProps) {
  if (to !== undefined) {
    return <Link to={to} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}
