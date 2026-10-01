import { SectionHeading } from "@/components/SectionHeading";
import { channels } from "@/content/channels";
import { ChannelCard } from "../components/ChannelCard";

export function ContactSection() {
  return (
    <section id="contact" className="min-h-screen flex items-center px-6 py-24">
      <div className="mx-auto max-w-3xl w-full">
        <SectionHeading label="// 04_contact.sh" centered>
          open a<br />
          channel.
        </SectionHeading>
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-warm-paper/40 text-center mb-10">
          ls ~/channels · escolha por onde falar comigo
        </p>

        <div className="grid sm:grid-cols-2 gap-3">
          {channels.map((channel, i) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
