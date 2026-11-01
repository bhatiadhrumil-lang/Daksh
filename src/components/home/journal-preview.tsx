import { SectionHeading } from "@/components/ui/section-heading";
import { JournalCard } from "@/components/journal/journal-card";
import { journalPosts } from "@/lib/data";

export function JournalPreview() {
  return (
    <section className="container-page mt-16 sm:mt-24">
      <SectionHeading
        eyebrow="The journal"
        title="Notes on living well"
        description="Slow homes, honest materials, and the people behind the pieces."
        action={{ label: "Read the journal", href: "/blog" }}
      />
      <div className="mt-8 grid gap-x-6 gap-y-10 sm:mt-10 md:grid-cols-3 lg:gap-x-7">
        {journalPosts.map((post) => (
          <JournalCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
