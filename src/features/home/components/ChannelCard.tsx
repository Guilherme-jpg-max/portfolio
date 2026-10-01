import type { CSSProperties } from "react";
import { FileText, Github, Linkedin, MessageCircle, type LucideIcon } from "lucide-react";
import { GlowOverlay } from "@/components/GlowOverlay";
import { SmartLink } from "@/components/SmartLink";
import type { Channel, ChannelKind } from "@/content/types";

const CHANNEL_ICONS: Record<ChannelKind, LucideIcon> = {
  whatsapp: MessageCircle,
  linkedin: Linkedin,
  github: Github,
  resume: FileText,
};

type Props = {
  channel: Channel;
  style?: CSSProperties;
};

export function ChannelCard({ channel, style }: Props) {
  const Icon = CHANNEL_ICONS[channel.kind];
  const target = channel.to !== undefined ? { to: channel.to } : { href: channel.href };

  return (
    <SmartLink
      {...target}
      className="panel-ember p-5 rounded-md group relative overflow-hidden fade-up flex items-center gap-4"
      style={style}
    >
      <GlowOverlay />
      <div className="relative flex items-center justify-center w-10 h-10 rounded-md border border-ember text-warm-paper/70 group-hover:text-hot-signal group-hover:border-signal transition-colors shrink-0">
        <Icon size={18} />
      </div>
      <div className="relative min-w-0">
        <p className="font-mono text-sm uppercase tracking-[0.2em] text-warm-paper group-hover:text-hot-signal transition-colors">
          {channel.label}
        </p>
        <p className="font-mono text-[11px] text-warm-paper/50 truncate">{channel.detail}</p>
      </div>
      <span className="relative ml-auto font-mono text-warm-paper/30 group-hover:text-hot-signal transition-colors">
        →
      </span>
    </SmartLink>
  );
}
