type AdminTopbarProps = {
  title: string;
  description?: string;
};

export function AdminTopbar({ title, description }: AdminTopbarProps) {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-xl font-semibold">{title}</h1>
      {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
    </div>
  );
}
