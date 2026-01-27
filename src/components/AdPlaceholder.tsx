interface AdPlaceholderProps {
  slot: string;
  className?: string;
}

export default function AdPlaceholder({ slot, className = "" }: AdPlaceholderProps) {
  const isSidebar = slot === "sidebar";

  return (
    <div
      data-ad-slot={slot}
      className={`flex items-center justify-center rounded border border-dashed border-border bg-muted text-sm text-muted-foreground ${
        isSidebar ? "min-h-[250px]" : "min-h-[90px]"
      } ${className}`}
    >
      Advertisement
    </div>
  );
}
