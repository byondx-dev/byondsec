import React from 'react';
import Contact from '../components/Contact';
import { Reveal, GlitchText } from '../components/ui/Animations';
import DarkVeil from '../components/ui/DarkVeil';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen text-gray-200">
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-20 border-b border-white/5 bg-secondary/40">
        <div className="absolute inset-0">
          <DarkVeil hueShift={120} noiseIntensity={0.06} scanlineIntensity={0.1} scanlineFrequency={0.4} warpAmount={0.12} resolutionScale={1.1} />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-background/70 to-background/90" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Reveal>
            <div className="max-w-3xl space-y-4">
              <p className="text-xs font-mono uppercase text-primary">Get in touch</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold">
                <GlitchText text="Talk to byondSEC" />
              </h1>
              <p className="text-gray-300 text-lg">
                Planung für einen Pentest, Red Teaming oder schnelle Rückmeldung? Schick uns Kontext, wir antworten kurzfristig.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
