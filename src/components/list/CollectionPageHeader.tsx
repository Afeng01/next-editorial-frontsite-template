type CollectionPageHeaderProps = {
  eyebrow: string;
  title: string;
  summary: string;
};

export function CollectionPageHeader({
  eyebrow,
  title,
  summary,
}: CollectionPageHeaderProps) {
  return (
    <div className="border-b border-stone-300 pb-8" data-locale-region="page-header" data-locale-stagger="0">
      <div className="mb-4 text-[11px] uppercase tracking-[0.24em] text-stone-500">
        {eyebrow}
      </div>
      <h1 className="font-[family-name:var(--font-serif)] text-5xl font-semibold leading-none tracking-tight text-stone-950 sm:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">{summary}</p>
    </div>
  );
}
