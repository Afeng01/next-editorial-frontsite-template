import Image from "next/image";

type CardImageProps = {
  alt: string;
  src?: string;
  ratio?: "feature" | "card";
};

const ratioClassNames = {
  feature: "aspect-[4/5]",
  card: "aspect-[16/9]",
};

export function CardImage({ alt, src, ratio = "card" }: CardImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden bg-stone-100 ring-1 ring-stone-200 ${ratioClassNames[ratio]}`}
    >
      <Image
        alt={alt}
        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        fill
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
        src={src ?? "/images/placeholder-cover.svg"}
      />
    </div>
  );
}
