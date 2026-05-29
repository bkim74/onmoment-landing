import type { LineContract, LocalizedLineContract, Locale } from "@/lib/lineContracts";

// Renders locale-specific lines for mobile vs desktop viewports.
// Mobile (< sm): block each line separately.
// Desktop (>= sm): single block per line, fewer breaks.
export function ResponsiveLines({
  lines,
  className,
  Tag = "span",
}: {
  lines: LineContract;
  className?: string;
  Tag?: "span" | "p";
}) {
  return (
    <>
      {/* Mobile */}
      <Tag className={`block sm:hidden ${className ?? ""}`}>
        {lines.mobile.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>

      {/* Desktop */}
      <Tag className={`hidden sm:block ${className ?? ""}`}>
        {lines.desktop.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </Tag>
    </>
  );
}

// Locale-aware wrapper — defaults to "ko" until locale routing is introduced.
export function LocalizedResponsiveLines({
  contracts,
  locale = "ko",
  className,
  Tag,
}: {
  contracts: LocalizedLineContract;
  locale?: Locale;
  className?: string;
  Tag?: "span" | "p";
}) {
  return (
    <ResponsiveLines
      lines={contracts[locale]}
      className={className}
      Tag={Tag}
    />
  );
}
