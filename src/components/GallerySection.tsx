"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { SectionHeader } from "./ServicesSection";

const GALLERY = [
  { src: "/img_nude.png",     alt: "Gel Nude Clássico",   label: "Gel Nude Clássico",   cls: "row-span-2" },
  { src: "/img_floral.png",   alt: "Floral em Gel",       label: "Floral em Gel"                          },
  { src: "/img_degradee.png", alt: "Stiletto Degradê",    label: "Stiletto Degradê"                       },
  { src: "/img_french.png",   alt: "Francesinha em Gel",  label: "Francesinha em Gel",  cls: "col-span-2" },
  { src: "/img_gems.png",     alt: "Gold Gems",            label: "Gold Gems"                              },
];

export function GallerySection() {
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
    <section id="galeria" ref={ref} className="py-24 bg-muted/20">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Nosso Trabalho"
          title="Galeria de Arte"
          body="Cada design é uma expressão de elegância. Veja o que criamos para nossas clientes."
        />

        <div className="reveal grid grid-cols-2 md:grid-cols-3 gap-1 auto-rows-[220px]">
          {GALLERY.map((item, i) => (
            <div key={i} className={`relative group overflow-hidden ${item.cls ?? ""}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 py-4 px-4 bg-gradient-to-t from-background/90 to-transparent">
                <p className="text-[9px] tracking-[0.3em] uppercase text-primary">{item.label}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-7 text-center text-[9px] tracking-[0.35em] uppercase text-muted-foreground/40">
          Mais criações no Instagram · @nalekabeauty
        </p>
      </div>
    </section>
  );
}
