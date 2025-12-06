import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { NavItem } from '../types';
import { MagneticButton, DecryptedText } from './ui/Animations';
import { Menu, X, Box, ArrowUpRight, ChevronDown } from 'lucide-react';
import DarkVeil from './ui/DarkVeil';
import { blogPosts } from '../data/blogPosts';

const base = import.meta.env.BASE_URL || '/';
const homePath = base === '/' ? '/' : base;
const servicesPath = `${homePath}services`;
const blogPath = `${homePath}blog`;
const contactPath = `${homePath}contact`;

const categories = Array.from(new Set(blogPosts.map((p) => p.category)));
const articlesSorted = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
const popularArticles = blogPosts.filter((p) => p.featured).slice(0, 4);

const navItems: NavItem[] = [
  { label: 'Home', href: homePath },
  { label: 'Services', href: servicesPath },
  { label: 'Articles', href: blogPath },
  { label: 'Contact', href: contactPath },
];

const Header: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileArticlesOpen, setMobileArticlesOpen] = useState(false);
  const [articlesOpen, setArticlesOpen] = useState(false);
  const [logoRotation, setLogoRotation] = useState(0);

  // Close dropdown on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (articlesOpen) {
        setArticlesOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [articlesOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-background/70 border-b border-white/5 overflow-visible">
        <div className="absolute inset-0 opacity-70">
          <DarkVeil hueShift={120} noiseIntensity={0.05} scanlineIntensity={0.08} scanlineFrequency={0.5} warpAmount={0.08} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-background/60 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between relative z-10">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <motion.button
              onClick={() => setLogoRotation(prev => prev + 360)}
              animate={{ rotate: logoRotation }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative w-8 h-8 flex items-center justify-center bg-primary/10 border border-primary/30 rounded hover:border-primary transition-colors cursor-pointer"
              aria-label="Spin logo"
            >
              <Box className="w-5 h-5 text-primary" />
            </motion.button>
            <a href={homePath} className="font-display font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
              byond<span className="text-primary">SEC</span>
            </a>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 relative">
            {navItems.map((item, i) => {
              const isBlog = item.label === 'Articles';
              if (!isBlog) {
                return (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="text-sm font-medium text-gray-400 hover:text-white relative group transition-colors"
                  >
                    <DecryptedText text={item.label} speed={100} animateOnHover={true} />
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                  </motion.a>
                );
              }
              return (
                <div
                  key={item.label}
                  className="relative flex items-center gap-1"
                >
                  <motion.a
                    href={item.href}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="text-sm font-medium text-gray-400 hover:text-white relative group transition-colors"
                  >
                    <DecryptedText text={item.label} speed={100} animateOnHover={true} />
                    <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                  </motion.a>
                  <button
                    aria-label="Toggle articles menu"
                    onClick={(e) => {
                      e.preventDefault();
                      setArticlesOpen((prev) => !prev);
                    }}
                    className="flex items-center justify-center p-1 rounded hover:text-primary transition-colors"
                  >
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${articlesOpen ? 'rotate-180 text-primary' : 'text-gray-500'}`}
                    />
                  </button>
                </div>
              );
            })}

            {articlesOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full mt-4 z-50 w-[min(1100px,calc(100vw-2rem))]"
              >
                <div className="rounded-xl border border-white/10 bg-background/95 backdrop-blur-lg shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden grid grid-cols-[220px_minmax(0,1fr)_260px]">
                  <div className="bg-black/30 border-r border-white/10 p-6 space-y-2">
                    <div className="text-xs uppercase tracking-[0.2em] text-primary mb-2">Categories</div>
                    {categories.map((cat) => (
                      <a
                        key={cat}
                        href={`${blogPath}?category=${encodeURIComponent(cat)}`}
                        className="block text-sm text-gray-200 hover:text-primary transition-colors"
                      >
                        {cat}
                      </a>
                    ))}
                    <a
                      href={blogPath}
                      className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-white transition-colors"
                    >
                      All Articles <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>

                  <div className="p-6 grid md:grid-cols-3 gap-3">
                    {articlesSorted.map((post) => (
                      <a
                        key={post.slug}
                        href={`${blogPath}/${post.slug}`}
                        className="flex flex-col gap-1 text-left rounded-lg border border-white/5 bg-white/5 p-3 hover:border-primary/50 hover:text-primary transition-colors"
                      >
                        <span className="text-[11px] uppercase tracking-[0.2em] text-primary">{post.category}</span>
                        <span className="text-sm font-semibold text-white leading-snug">{post.title}</span>
                        <span className="text-xs text-gray-400 line-clamp-2">{post.excerpt}</span>
                      </a>
                    ))}
                  </div>

                  <div className="p-6 bg-black/40 border-l border-white/10 flex flex-col gap-3">
                    <div className="text-xs uppercase text-primary tracking-[0.2em] mb-1">Popular</div>
                    <div className="space-y-3">
                      {popularArticles.map((post) => (
                        <a
                          key={post.slug}
                          href={`${blogPath}/${post.slug}`}
                          className="flex gap-3 items-start rounded-lg border border-white/10 p-2 hover:border-primary/50 transition-colors"
                        >
                          <div className="w-16 h-16 rounded-md overflow-hidden border border-white/10 flex-shrink-0">
                            <img src={post.thumbnail?.src || ''} alt={post.thumbnail?.alt || post.title} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1">
                            <div className="text-[11px] uppercase tracking-[0.2em] text-primary mb-1">{post.category}</div>
                            <div className="text-sm font-semibold text-white leading-snug">{post.title}</div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </nav>

          {/* CTA */}
          <div className="hidden md:block">
            <MagneticButton>
              <a href="#contact" className="px-5 py-2.5 bg-primary/10 text-primary border border-primary/50 text-xs font-bold uppercase tracking-widest hover:bg-primary hover:text-black transition-all duration-300 clip-path-slant">
                Request Pentest
              </a>
            </MagneticButton>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Scroll Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary origin-left shadow-[0_0_10px_#39FF88]"
          style={{ scaleX }}
        />
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 top-16 md:top-20 z-40 bg-background/95 backdrop-blur-lg flex flex-col p-8 gap-6 md:hidden overflow-y-auto"
        >
          {navItems.map((item) => {
            if (item.label === 'Articles') {
              return (
                <div key={item.label} className="border-b border-white/10 pb-4">
                  <button
                    onClick={() => setMobileArticlesOpen(!mobileArticlesOpen)}
                    className="flex items-center justify-between w-full text-2xl font-display font-bold text-white group"
                  >
                    {item.label}
                    <ChevronDown
                      className={`w-6 h-6 transition-transform duration-300 ${mobileArticlesOpen ? 'rotate-180 text-primary' : 'text-gray-400 group-hover:text-white'
                        }`}
                    />
                  </button>

                  {mobileArticlesOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="mt-6 flex flex-col gap-6 pl-2"
                    >
                      {/* Categories */}
                      <div className="space-y-3">
                        <div className="text-xs uppercase tracking-[0.2em] text-primary">Categories</div>
                        {categories.map((cat) => (
                          <a
                            key={cat}
                            href={`${blogPath}?category=${encodeURIComponent(cat)}`}
                            className="block text-lg text-gray-300 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {cat}
                          </a>
                        ))}
                        <a
                          href={blogPath}
                          className="mt-2 inline-flex items-center gap-2 text-base font-semibold text-primary hover:text-white transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          All Articles <ArrowUpRight className="w-4 h-4" />
                        </a>
                      </div>

                      {/* Popular */}
                      <div className="space-y-4">
                        <div className="text-xs uppercase tracking-[0.2em] text-primary">Popular</div>
                        <div className="grid gap-3">
                          {popularArticles.slice(0, 3).map((post) => (
                            <a
                              key={post.slug}
                              href={`${blogPath}/${post.slug}`}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex gap-3 items-start rounded-lg border border-white/10 p-2 bg-white/5 active:bg-white/10"
                            >
                              <div className="w-16 h-16 rounded-md overflow-hidden border border-white/10 flex-shrink-0">
                                <img
                                  src={post.thumbnail?.src || ''}
                                  alt={post.thumbnail?.alt || post.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="text-[10px] uppercase tracking-[0.2em] text-primary mb-1">{post.category}</div>
                                <div className="text-sm font-semibold text-white leading-snug line-clamp-2">{post.title}</div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                className="text-2xl font-display font-bold text-white border-b border-white/10 pb-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
          <a
            href="#contact"
            className="mt-4 w-full py-4 bg-primary text-black font-bold text-center uppercase tracking-widest"
            onClick={() => setMobileMenuOpen(false)}
          >
            Request Pentest
          </a>
        </motion.div>
      )}
    </>
  );
};

export default Header;
