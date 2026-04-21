import { Separator } from "@/components/ui/separator";

export function RibbonBanner() {
  const items = [
    "Design Exclusivo",
    "Produtos Premium",
    "Acabamento Impecável",
    "Atendimento Personalizado",
  ];

  return (
    <div className="w-full overflow-hidden bg-primary py-3">
      <div className="mx-auto flex w-full max-w-[2000px] flex-nowrap items-center whitespace-nowrap">
        {/* Double array for endless scrolling illusion */}
        <div className="marquee flex items-center">
          {[...items, ...items, ...items, ...items].map((text, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-8 text-[10px] tracking-[0.25em] uppercase text-primary-foreground font-medium">
                {text}
              </span>
              <div className="h-1 w-1 bg-primary-foreground/30 rotate-45" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
