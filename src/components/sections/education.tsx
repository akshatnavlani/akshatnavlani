import { SectionHeading } from "@/components/ui/section-heading";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Badge } from "@/components/ui/badge";
import { education } from "@/data/education";

export function Education() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
      <SectionHeading eyebrow="Background" title="Education" />
      <TimelineItem
        title={education.institution}
        subtitle={education.degree}
        period={education.period}
      >
        <p>CGPA: {education.cgpa}</p>
        {education.highlights.map((h, i) => (
          <p key={i} className="mt-1">
            {h}
          </p>
        ))}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {education.coursework.map((c) => (
            <Badge key={c} variant="secondary" className="font-normal">
              {c}
            </Badge>
          ))}
        </div>
      </TimelineItem>
    </section>
  );
}
