import Link from "next/link";

const suggestedRoutes = [
  { label: "Back home", href: "/" },
  { label: "Browse articles", href: "/articles" },
  { label: "View projects", href: "/projects" },
];

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
      <div className="text-[11px] uppercase tracking-[0.24em] text-stone-500">404</div>
      <h1 className="mt-4 font-[family-name:var(--font-serif)] text-5xl font-semibold tracking-tight text-stone-950 sm:text-6xl">
        This page is missing from the issue.
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-stone-600">
        The route may have moved, the slug may be wrong, or this template simply does not ship
        that page yet.
      </p>
      <div className="mt-10 flex flex-wrap gap-3">
        {suggestedRoutes.map((route) => (
          <Link
            key={route.href}
            className="border border-stone-300 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:border-stone-950 hover:bg-stone-950 hover:text-white"
            href={route.href}
          >
            {route.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
