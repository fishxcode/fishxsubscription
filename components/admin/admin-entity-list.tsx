type AdminEntityListProps<T extends Record<string, unknown>> = {
  rows: T[];
  columns: ReadonlyArray<{ key: keyof T; label: string }>;
};

export function AdminEntityList<T extends Record<string, unknown>>({ rows, columns }: AdminEntityListProps<T>) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border/70 bg-card/70">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-border/70 text-left text-muted-foreground">
            {columns.map((column) => (
              <th key={String(column.key)} className="px-4 py-3 font-medium">
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-b border-border/40 last:border-0">
              {columns.map((column) => (
                <td key={String(column.key)} className="px-4 py-3">
                  {String(row[column.key] ?? "-")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
