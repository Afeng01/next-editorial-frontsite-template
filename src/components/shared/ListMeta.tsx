type ListMetaProps = {
  prefix?: string;
  value: string;
};

export function ListMeta({ prefix, value }: ListMetaProps) {
  return (
    <div className="text-[11px] uppercase tracking-[0.18em] text-stone-500">
      {prefix ? `${prefix} ` : ""}
      {value}
    </div>
  );
}
