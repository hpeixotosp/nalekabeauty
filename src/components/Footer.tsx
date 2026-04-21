"use client";

import { Separator } from "@/components/ui/separator";
import { MoveUp } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card pt-20 pb-10 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Brand */}
          <div className="flex flex-col gap-5">
            <a href="#" className="flex flex-col gap-0.5 no-underline w-max">
              <span className="font-serif-display text-2xl tracking-[0.12em] text-primary font-light">
                NALEKA
              </span>
              <span className="text-[10px] tracking-[0.45em] uppercase text-muted-foreground font-light">
                Beauty
              </span>
            </a>
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground mt-2">
              Transformando unhas em obras de arte com a exclusividade e qualidade 
              que você merece.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-4 md:items-center">
            <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
              Navegação
            </p>
            <div className="flex flex-col gap-3">
              {[
                ["Home", "#home"],
                ["Serviços", "#servicos"],
                ["Galeria", "#galeria"],
                ["Sobre", "#sobre"],
              ].map(([lbl, href]) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-foreground/80 hover:text-primary transition-colors w-max"
                >
                  {lbl}
                </a>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4 md:items-end">
             <p className="text-[10px] tracking-[0.3em] uppercase text-primary font-medium">
               Contato
             </p>
             <div className="flex flex-col gap-3 md:items-end text-sm text-foreground/80">
                <a 
                  href="https://wa.me/5500000000000" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  WhatsApp: (00) 00000-0000
                </a>
                <a 
                  href="https://instagram.com/nalekabeauty" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-2 hover:text-primary transition-colors"
                >
                  {/* Inline Instagram SVG for simplicity & reliability */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                  Instagram
                </a>
             </div>
          </div>
        </div>

        <Separator className="mt-16 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-wide text-muted-foreground uppercase">
          <p>© {currentYear} Naleka Beauty. Todos os direitos reservados.</p>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 hover:text-primary transition-colors"
          >
            Voltar ao topo <MoveUp className="size-3" />
          </button>
        </div>
      </div>
    </footer>
  );
}
