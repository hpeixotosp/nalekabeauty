"use client";

import { useEffect, useRef } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "./ServicesSection";

const TESTIMONIALS = [
  {
    initial: "J",
    name: "Juliana M.",
    role: "Cliente há 2 anos",
    quote: "Minha experiência foi incrível! As unhas ficaram perfeitas e duraram muito mais do que eu esperava. Super indico a Naleka Beauty.",
  },
  {
    initial: "C",
    name: "Camile R.",
    role: "Cliente há 1 ano",
    quote: "Atendimento super cuidadoso e caprichado. Uma verdadeira artista! Meu gel com nail art ficou ainda melhor que nas referências.",
  },
  {
    initial: "P",
    name: "Patrícia S.",
    role: "Indicação de amiga",
    quote: "Ambiente lindo, profissionalismo incrível! Saí de lá me sentindo uma rainha. Naleka Beauty é referência em qualidade.",
  },
];

export function TestimonialsSection() {
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
    <section id="depoimentos" ref={ref} className="py-24 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader eyebrow="Depoimentos" title="Clientes que Amam" />

        <div className="reveal stagger grid grid-cols-1 gap-4 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <Card key={t.name} className="rounded-none border-border hover:border-primary/30 transition-colors duration-200">
              <CardHeader className="pb-0 pt-7 px-7">
                {/* Stars */}
                <div className="flex gap-0.5 text-primary text-sm mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </CardHeader>

              <CardContent className="px-7 pb-0">
                <CardDescription
                  className="font-serif-display text-[1.05rem] leading-relaxed text-foreground/80 font-light"
                >
                  "{t.quote}"
                </CardDescription>
              </CardContent>

              <CardFooter className="flex-col items-start gap-4 px-7 pb-7 pt-6">
                <Separator />
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="flex size-8 items-center justify-center border border-border font-serif-display text-sm text-primary font-light">
                    {t.initial}
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <p className="text-xs text-foreground">{t.name}</p>
                    <p className="text-[10px] text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
