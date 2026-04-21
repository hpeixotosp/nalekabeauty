"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "./ServicesSection";
import { Users, Star, Clock, Award } from "lucide-react";

const STATS = [
  { icon: Users, value: "500+",  label: "Clientes atendidas"       },
  { icon: Star,  value: "5,0",   label: "Avaliação no Google"       },
  { icon: Clock, value: "5+",    label: "Anos de experiência"       },
  { icon: Award, value: "100%",  label: "Produtos premium certificados" },
];

export function AboutSection() {
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
    <section id="sobre" ref={ref} className="py-24 bg-background border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">

          {/* Text column */}
          <div className="reveal flex flex-col gap-6">
            <SectionHeader eyebrow="Quem somos" title="Naleka Beauty" />
            <p className="text-sm leading-relaxed text-muted-foreground -mt-8">
              Somos apaixonadas por beleza e arte, transformando unhas em obras de arte há mais de 5 anos.
              Nosso atelier foi criado para você se sentir única, acolhida e ainda mais linda.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Utilizamos apenas produtos premium certificados, garantindo saúde, beleza e
              durabilidade. Cada detalhe é tratado com precisão e dedicação — porque você merece o melhor.
            </p>
            <div>
              <Button
                asChild
                variant="outline"
                className="rounded-none h-11 px-9 text-[11px] tracking-[0.2em] uppercase border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                <a href="#agendar">Agendar Agora</a>
              </Button>
            </div>
          </div>

          {/* Stats grid */}
          <div className="reveal grid grid-cols-2 gap-1">
            {STATS.map(({ icon: Icon, value, label }) => (
              <div
                key={label}
                className="flex flex-col gap-3 border border-border bg-muted/20 p-6 transition-colors duration-200 hover:border-primary/40"
              >
                <Icon className="size-4 text-primary" strokeWidth={1.25} />
                <p
                  className="font-serif-display font-light text-3xl text-foreground leading-none"
                >
                  {value}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
