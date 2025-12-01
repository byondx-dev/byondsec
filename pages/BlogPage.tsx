import React from 'react';
import Blog from '../components/Blog';
import { Reveal, GlitchText } from '../components/ui/Animations';
import { ArrowRight } from 'lucide-react';
import DarkVeil from '../components/ui/DarkVeil';

const basePath = import.meta.env.BASE_URL || '/';
const homePath = basePath === '/' ? '/' : basePath;

const BlogPage: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-200">
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/5 bg-secondary/40">
        <div className="absolute inset-0">
          <DarkVeil hueShift={120} noiseIntensity={0.06} scanlineIntensity={0.1} scanlineFrequency={0.4} warpAmount={0.12} resolutionScale={1.1} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/70 to-background/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="max-w-4xl space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-xs font-mono uppercase tracking-[0.2em] text-primary">
                Articles & Field Notes
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                <GlitchText text="Security Insights, Playbooks & Stories" />
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                Technische Deep-Dives, Red-Team-Storys und klare Handlungsanleitungen für CISOs, Engineers und Blue Teams.
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-300">
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">Wöchentlich neue Artikel</span>
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">Pragmatische Fixes & Patterns</span>
                <span className="px-4 py-2 rounded-lg bg-white/5 border border-white/10">Case Files aus echten Engagements</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Blog />

      <section className="py-16">
        <div className="container mx-auto px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold">Zur Hauptseite</h2>
            <p className="text-gray-400">Services, Methodik und Kontakt auf einen Blick.</p>
          </div>
          <a
            href={homePath}
            className="inline-flex items-center gap-2 px-5 py-3 border border-white/10 rounded-lg bg-white/5 hover:border-primary/50 hover:text-primary transition-colors"
          >
            Startseite öffnen <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>
    </div>
  );
};

export default BlogPage;
