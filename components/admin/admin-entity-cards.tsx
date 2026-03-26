type AdminEntityCardsProps<T extends Record<string, unknown>> = {
  rows: T[];
  fields: ReadonlyArray<{ key: keyof T; label: string }>;
};

export function AdminEntityCards<T extends Record<string, unknown>>({ rows, fields }: AdminEntityCardsProps<T>) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {rows.map((row, index) => (
        <article key={index} className="rounded-xl border border-border/70 bg-card/70 p-4">
          {fields.map((field) => (
            <p key={String(field.key)} className="text-sm">
              <span className="text-muted-foreground">{field.label}：</span>
              <span className="font-medium">{String(row[field.key] ?? "-")}</span>
            </p>
          ))}
        </article>
      ))}
    </div>
  );
}
