import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";
import { leadership } from "@/data/leadership";

export function Leadership() {
  return (
    <section id="leadership" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="Involvement" title="Leadership & Positions of Responsibility" />
      <div className="space-y-8">
        {leadership.map((item) => (
          <TimelineItem
            key={item.org}
            title={item.role}
            subtitle={item.org}
            period={item.period}
          >
            {item.bullets.map((b, i) => (
              <p key={i} className="mt-1 first:mt-0">
                {b}
              </p>
            ))}
          </TimelineItem>
        ))}
      </div>
    </section>
  );
}
