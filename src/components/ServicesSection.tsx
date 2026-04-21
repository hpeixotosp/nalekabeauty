"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Wand2, Sparkles, RefreshCw, Scissors } from "lucide-react";

const SERVICES = [
  {
    icon: Wand2,
    num: "01",
    title: "Alongamento em Gel",
    description: "Unhas naturais e duradouras com acabamento impecável. Formatos personalizados ao seu estilo.",
    duration: "2h – 3h",
    price: "A partir de R$ 120",
  },
  {
    icon: Sparkles,
    num: "02",
    title: "Gel com Nail Art",
    description: "Designs exclusivos, flores, strass, degradê e texturas apuradas. Nail art de atelier.",
    duration: "3h – 4h",
    price: "A partir de R$ 180",
    featured: true,
  },
  {
    icon: RefreshCw,
    num: "03",
    title: "Manutenção em Gel",
    description: "Reposição e reforço para manter suas unhas sempre perfeitas e saudáveis.",
    duration: "1h30 – 2h",
    price: "A partir de R$ 80",
  },
  {
    icon: Scissors,
    num: "04",
    title: "Remoção Segura",
    description: "Remoção delicada sem danos à uma natural, com hidratação e tratamento especial.",
    duration: "1h",
    price: "A partir de R$ 50",
  },
];

function SectionHeader({ eyebrow, title, body }: { eyebrow: string; title: string; body?: string }) {
  return (
    <div className="reveal mb-14 max-w-md">
      <p className="text-[10px] tracking-[0.45em] uppercase text-primary mb-3">{eyebrow}</p>
      <h2
        className="font-serif-display font-light text-foreground leading-tight"
        style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
      >
        {title}
      </h2>
      <Separator className="mt-5 mb-4 w-10" />
      {body && <p className="text-sm leading-relaxed text-muted-foreground">{body}</p>}
    </div>
  );
}

export function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.1 }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="servicos" ref={ref} className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="O que oferecemos"
          title="Nossos Serviços"
          body="Cada atendimento pensado com precisão para realçar sua beleza natural."
        />

        <div className="reveal stagger grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Card
                key={s.num}
                className={cn(
                  "relative flex flex-col rounded-none border-border transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
                  s.featured ? "bg-card" : "bg-muted/30"
                )}
              >
                {s.featured && (
                  <div className="absolute right-4 top-4">
                    <Badge variant="secondary" className="text-[9px] tracking-[0.15em] uppercase rounded-none px-2">
                      Mais pedido
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2 pt-7 px-6">
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className="font-serif-display font-light text-3xl leading-none text-muted/60"
                      style={{ color: "var(--border)" }}
                    >
                      {s.num}
                    </span>
                    <Icon className="text-primary opacity-75" strokeWidth={1.25} />
                  </div>
                  <CardTitle className="font-serif-display font-normal text-foreground text-lg leading-snug">
                    {s.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 px-6 pb-0">
                  <CardDescription className="text-sm leading-relaxed">
                    {s.description}
                  </CardDescription>
                </CardContent>

                <CardFooter className="flex-col items-start gap-3 px-6 pb-6 pt-5">
                  <Separator />
                  <div className="flex w-full items-center justify-between">
                    <span className="text-[10px] text-muted-foreground">{s.duration}</span>
                    <span className="text-xs font-medium text-primary">{s.price}</span>
                  </div>
                  <Button
                    asChild
                    variant="ghost"
                    className="h-auto p-0 text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-primary rounded-none"
                  >
                    <a href="#agendar">Agendar →</a>
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Export shared SectionHeader for reuse in other sections
export { SectionHeader };
