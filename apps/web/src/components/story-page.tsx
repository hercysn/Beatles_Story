type StoryPageProps = {
  title: string;
  description: string;
};

export function StoryPage({ title, description }: StoryPageProps) {
  return (
    <section className="mx-auto w-full max-w-4xl px-6 py-14 sm:py-20">
      <div className="border-l-4 border-apple pl-6">
        <h1 className="text-3xl font-semibold text-ink sm:text-5xl">{title}</h1>
        <p className="mt-6 text-lg leading-8 text-muted">{description}</p>
      </div>
    </section>
  );
}
