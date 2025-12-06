import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Methodology from './components/Methodology';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { CustomCursor, Reveal, GlitchText, SpotlightCard, BorderBeam, DecryptedText } from './components/ui/Animations';
import { CheckCircle2 } from 'lucide-react';
import Blog from './components/Blog';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ScrollToTop from './components/ui/ScrollToTop';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import ArticlesStrip from './components/ArticlesStrip';

import EngagementModels from './components/EngagementModels';
import CyberDamageTicker from './components/CyberDamageTicker';

// Logo Loop with SVGs
const LogoLoop = () => {
  const logos = [
    // AWS
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12"><path d="M18.73 14.7l-1.37.89c-.6.39-1.2.7-1.8.92-.6.23-1.22.34-1.84.34-1.07 0-1.92-.35-2.55-1.06-.63-.7-1.12-1.78-1.46-3.23h5.9c.19 1.45.62 2.14 1.12 2.14.33 0 .66-.27 1-.8zm-4.32-3.15h-5.4c.09-1.2.53-2.08 1.3-2.65.65-.48 1.48-.72 2.5-.72.8 0 1.5.17 2.08.52.59.34 1.05.82 1.39 1.43l1.45-.85c-.53-.94-1.25-1.67-2.17-2.18-.9-.52-2-.78-3.3-.78-1.7 0-3.07.44-4.13 1.32-1.06.87-1.75 2.12-2.08 3.74h-.54v1.6h.46c.19 1.7.83 2.97 1.9 3.82 1.08.85 2.5 1.28 4.25 1.28.88 0 1.75-.15 2.6-.46.85-.3 1.7-.77 2.54-1.4l-.84-1.5z" /></svg>,
    // Microsoft
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12"><path d="M0 0h11.377v11.372H0zM12.623 0H24v11.372H12.623zM0 12.623h11.377V24H0zM12.623 12.623H24V24H12.623z" /></svg>,
    // Docker
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12"><path d="M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.119a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m0 2.716h2.119a.186.186 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.119a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.185m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.185m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.929 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m2.929 2.919a.186.186 0 00.185-.185v-1.888a.186.186 0 00-.185-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185h2.119m-2.929 0h2.12a.186.186 0 00.184-.185v-1.888a.186.186 0 00-.184-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-2.964 0h2.119a.186.186 0 00.185-.185v-1.888a.186.186 0 00-.185-.186h-2.12a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m-5.892 0h2.119a.185.185 0 00.185-.185v-1.888a.186.186 0 00-.185-.186h-2.119a.186.186 0 00-.186.185v1.888c0 .102.084.185.186.185m8.166 5.507c-3.964 0-6.948-.506-6.948-1.666 0-.897 1.802-1.54 4.032-1.638l.685-.029v1.077c-.16.035-.326.068-.495.093-1.83.27-1.928.69-1.928.796 0 .43.916 1.054 4.546 1.054 3.733 0 4.654-.64 4.654-1.054 0-.127-.132-.516-1.815-.796a15.36 15.36 0 00-.63-.093v-1.072c2.49.098 4.502.766 4.502 1.66 0 1.16-2.984 1.666-6.603 1.666" /></svg>,
    // Kubernetes
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12"><path d="M11.954 1.143L2.433 6.138l1.397 2.213L11.95 4.39l8.136 3.961 1.396-2.213zM2.872 7.74l-.953.5V17.06l.953.5 1.4-2.218V9.957zm18.256 0l-1.4 2.217v5.304l1.4 2.218.953-.5V8.24zM3.86 17.58l8.14 4.27 8.14-4.27 1.396 2.212-9.536 5L2.464 19.792zM12 9.07l-3.237 1.7v3.398L12 15.866l3.237-1.698V10.77z" /></svg>,
    // GitHub
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>,
    // Linux
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 md:w-12 md:h-12"><path d="M12 20.52c4.08 0 7.38-3.3 7.38-7.38 0-4.08-3.3-7.38-7.38-7.38-4.08 0-7.38 3.3-7.38 7.38 0 4.08 3.3 7.38 7.38 7.38zm0-16.14c4.83 0 8.76 3.93 8.76 8.76 0 4.83-3.93 8.76-8.76 8.76-4.83 0-8.76-3.93-8.76-8.76 0-4.83 3.93-8.76 8.76-8.76z" /></svg>
  ];

  return (
    <div className="relative flex overflow-hidden py-12 border-b border-white/5 bg-secondary/10">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10 pointer-events-none" />
      <div className="animate-marquee whitespace-nowrap flex gap-24 items-center">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="flex gap-24 items-center text-gray-700">
            {logos.map((logo, idx) => (
              <div key={idx} className="hover:text-primary transition-colors duration-300 opacity-60 hover:opacity-100 transform hover:scale-110">
                {logo}
              </div>
            ))}
          </div>
        ))}
      </div>
      <style>{`
                .animate-marquee {
                  animation: marquee 40s linear infinite;
                }
                @keyframes marquee {
                  0% { transform: translateX(0%); }
                  100% { transform: translateX(-50%); }
                }
             `}</style>
    </div>
  );
};

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

const resolveView = () => {
  if (typeof window === 'undefined') return 'home';
  const path = window.location.pathname.replace(basePath, '') || '/';
  if (path.startsWith('/contact')) return 'contact';
  if (path.startsWith('/services')) return 'services';
  if (path.startsWith('/blog/') && path.split('/blog/')[1]) return 'blog-detail';
  if (path === '/blog' || path === '/blog/') return 'blog';
  return 'home';
};

function App() {
  const view = resolveView();

  if (view === 'blog') {
    return (
      <div className="min-h-screen text-gray-200 selection:bg-primary selection:text-black">
        <CustomCursor />
        <Header />
        <main className="pt-16 md:pt-20">
          <BlogPage />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (view === 'blog-detail') {
    return (
      <div className="min-h-screen text-gray-200 selection:bg-primary selection:text-black">
        <CustomCursor />
        <Header />
        <main className="pt-16 md:pt-20">
          <BlogPostPage />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (view === 'contact') {
    return (
      <div className="min-h-screen text-gray-200 selection:bg-primary selection:text-black">
        <CustomCursor />
        <Header />
        <main className="pt-16 md:pt-20">
          <ContactPage />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  if (view === 'services') {
    return (
      <div className="min-h-screen text-gray-200 selection:bg-primary selection:text-black">
        <CustomCursor />
        <Header />
        <main className="pt-16 md:pt-20">
          <ServicesPage />
        </main>
        <Footer />
        <ScrollToTop />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-200 selection:bg-primary selection:text-black">
      <CustomCursor />
      <Header />

      <main>
        <Hero />

        {/* Logo Loop Section */}
        <LogoLoop />

        <CyberDamageTicker />

        <Services />

        <Methodology />

        {/* Case Studies Teaser (Simplified Horizontal Layout) */}
        <section id="cases" className="py-32 bg-secondary/10 border-y border-white/5">
          <div className="container mx-auto px-4">
            <Reveal>
              <h2 className="text-4xl font-display font-bold mb-12"><GlitchText text="Declassified Case Studies" /></h2>
            </Reveal>
            <div className="flex flex-col md:flex-row gap-8 overflow-x-auto pb-8 snap-x">
              {[1, 2, 3].map((i) => (
                <div key={i} className="min-w-[300px] md:min-w-[400px] bg-black border border-white/10 p-8 rounded-lg snap-center relative group overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                    <span className="text-6xl font-display font-bold text-white/5">0{i}</span>
                  </div>
                  <div className="text-primary text-xs font-mono mb-2">FINTECH SECTOR</div>
                  <h3 className="text-2xl font-bold mb-4">API Broken Access Control</h3>
                  <p className="text-sm text-gray-400 mb-6">Discovery of a critical IDOR vulnerability allowing full account takeover across 50k users.</p>
                  <div className="flex gap-4 border-t border-white/10 pt-4">
                    <div>
                      <div className="text-xs text-gray-500">Impact</div>
                      <div className="text-red-400 font-bold">Critical</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-500">Fixed In</div>
                      <div className="text-primary font-bold">4 Hours</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ArticlesStrip />

        <EngagementModels />

        <Contact />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
}


export default App;
