import React from 'react';
import { motion } from 'framer-motion';
import { GlitchText, Reveal, MagneticButton } from '../components/ui/Animations';
import DarkVeil from '../components/ui/DarkVeil';
import { ArrowUpRight, Shield, Activity, Sparkles } from 'lucide-react';

const effects = [
  { title: 'Shimmer CTA', desc: 'Button with shimmer sweep on hover.', variant: 'shimmer' },
  { title: 'Lift Card', desc: 'Elevates with shadow + scale.', variant: 'lift' },
  { title: 'Gradient Border', desc: 'Animated border beam loop.', variant: 'border' },
  { title: 'Parallax Icon', desc: 'Icon drifts subtly on hover.', variant: 'parallax' },
  { title: 'Tilt', desc: '3D tilt following cursor.', variant: 'tilt' },
  { title: 'Glow Pulse', desc: 'Soft glow pulsing.', variant: 'glow' },
  { title: 'Slide In', desc: 'Content slides from left.', variant: 'slide' },
  { title: 'Fade Up', desc: 'Fade + translate up.', variant: 'fade' },
  { title: 'Tag Bounce', desc: 'Badge with slight bounce.', variant: 'bounce' },
  { title: 'Underline Grow', desc: 'Underline expands on hover.', variant: 'underline' },
  { title: 'Icon Spin', desc: 'Icon spins gently.', variant: 'spin' },
  { title: 'Scale Tap', desc: 'Tap feedback scaling.', variant: 'tap' },
  { title: 'Shadow Shift', desc: 'Shadow moves on hover.', variant: 'shadow' },
  { title: 'Blur Reveal', desc: 'Blur out -> clear on hover.', variant: 'blur' },
  { title: 'Ripple', desc: 'Radial ripple click effect.', variant: 'ripple' },
  { title: 'Skeleton', desc: 'Skeleton loading bar.', variant: 'skeleton' },
  { title: 'Floating Chips', desc: 'Chips drift up/down.', variant: 'float' },
  { title: 'Stagger List', desc: 'Items enter with stagger.', variant: 'stagger' },
  { title: 'Neon Outline', desc: 'Neon outline glow.', variant: 'neon' },
  { title: 'Badge Flash', desc: 'Quick flash indicator.', variant: 'flash' },
];

const ServicesPage: React.FC = () => {
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
                Services & Motion Library
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
                <GlitchText text="Offensive Security, with Motion" />
              </h1>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl">
                20+ interaction patterns inspired by ReactBits, woven into our services narrative—so every section feels alive.
              </p>
              <MagneticButton>
                <a href="#library" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-black font-semibold text-sm hover:shadow-[0_0_30px_rgba(57,255,136,0.35)] transition-shadow">
                  Explore interactions <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          {[{ icon: Shield, title: 'Pentests & Red Team', desc: 'Full-spectrum adversarial simulation with rich reporting.' },
            { icon: Activity, title: 'Continuous Validation', desc: 'Attack surface monitoring, retesting, and alerting.' },
            { icon: Sparkles, title: 'Detection Engineering', desc: 'Purple teaming, detections, and runbooks tuned with you.' },
          ].map((card) => (
            <motion.div
              key={card.title}
              whileHover={{ y: -6, boxShadow: '0 12px 35px rgba(0,0,0,0.35)' }}
              className="p-6 rounded-xl border border-white/10 bg-black/40 space-y-3"
            >
              <card.icon className="w-6 h-6 text-primary" />
              <h3 className="text-xl font-display font-bold">{card.title}</h3>
              <p className="text-gray-400">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section id="library" className="py-20 bg-secondary/10 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-display font-bold">20 ReactBits-inspired interactions</h2>
            <span className="text-sm text-gray-400">Hover / focus to preview</span>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {effects.map((effect, idx) => (
              <motion.div
                key={effect.title}
                className="relative p-4 rounded-lg border border-white/10 bg-black/30 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                whileHover={{ y: -4, scale: 1.01 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-[0.2em] text-primary">{effect.variant}</span>
                  <motion.span
                    className="w-2 h-2 rounded-full bg-primary/70"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: idx * 0.05 }}
                  />
                </div>
                <h4 className="text-lg font-display font-bold mb-1">{effect.title}</h4>
                <p className="text-sm text-gray-400 mb-3">{effect.desc}</p>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary via-accent to-primary"
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 2 + idx * 0.05, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
