import React, { useEffect, useMemo, useRef, useState } from 'react';
import { blogPosts } from '../data/blogPosts';
import { BlogPost } from '../types';
import { Calendar, Tag, ArrowUpRight, ArrowLeft } from 'lucide-react';

type TocItem = { id: string; text: string; level: number };

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const blogBasePath = `${basePath}/blog`;

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(date));

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
    <Tag className="w-3 h-3 text-primary" />
    {label}
  </span>
);

const Thumbnail: React.FC<{ post: BlogPost; className?: string }> = ({ post, className = '' }) => {
  if (post.thumbnail?.src) {
    return (
      <img
        src={post.thumbnail.src}
        alt={post.thumbnail.alt || post.title}
        className={`w-full h-full object-cover ${className}`}
        loading="lazy"
      />
    );
  }
  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-black via-secondary to-primary/20 flex items-center justify-center text-xs text-gray-200 uppercase tracking-[0.2em] ${className}`}
    >
      Thumbnail
    </div>
  );
};

const getInitialSlug = (): string | null => {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.replace(basePath, '');
  const match = path.match(/\/blog\/([^/]+)/);
  return match ? match[1] : null;
};

const useToc = (containerRef: React.RefObject<HTMLDivElement>, dep: string) => {
  const [toc, setToc] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const headings = Array.from(container.querySelectorAll('h2, h3')) as HTMLHeadingElement[];
    const tocItems = headings.map((node) => ({
      id: node.id,
      text: node.innerText,
      level: Number(node.tagName.replace('H', ''))
    }));
    setToc(tocItems);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top > b.boundingClientRect.top ? 1 : -1));
        if (visible[0]?.target) {
          setActiveId((visible[0].target as HTMLElement).id);
        }
      },
      { rootMargin: '-20% 0px -60% 0px', threshold: [0, 1] }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [containerRef, dep]);

  return { toc, activeId };
};

const BlogPostPage: React.FC = () => {
  const [activeSlug, setActiveSlug] = useState<string>(() => getInitialSlug() || blogPosts[0].slug);
  const articleRef = useRef<HTMLDivElement>(null);
  const { toc, activeId } = useToc(articleRef, activeSlug);

  const article = useMemo<BlogPost | null>(() => {
    if (!blogPosts.length) return null;
    return blogPosts.find((p) => p.slug === activeSlug) || blogPosts[0];
  }, [activeSlug]);

  const newArticles = useMemo(
    () =>
      [...blogPosts]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5),
    []
  );

  const popularArticles = useMemo(
    () => blogPosts.filter((p) => p.featured).concat(blogPosts.filter((p) => !p.featured).slice(0, 2)),
    []
  );

  const relatedArticles = useMemo(() => {
    if (!article) return [];
    return blogPosts
      .filter((p) => p.slug !== article.slug && p.category === article.category)
      .slice(0, 4);
  }, [article]);

  useEffect(() => {
    // keep URL in sync without reload
    const target = `${blogBasePath}/${activeSlug}`;
    if (typeof window !== 'undefined' && window.location.pathname !== target) {
      window.history.pushState({}, '', target);
    }
  }, [activeSlug]);

  useEffect(() => {
    // reset scroll when switching articles
    window.scrollTo({ top: 0 });
  }, [activeSlug]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handlePop = () => {
      const slug = getInitialSlug();
      if (slug) setActiveSlug(slug);
    };
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const handleSelect = (slug: string) => {
    setActiveSlug(slug);
  };

  const handleTocClick = (id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    const offset = 100;
    const y = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (!article) {
    return (
      <main className="bg-background text-gray-200">
        <section className="py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-display font-bold mb-2">No article found</h1>
            <p className="text-gray-400">Please check the URL or return to the articles overview.</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="bg-background text-gray-200">
      <section className="pt-8 md:pt-12 pb-16">
        <div className="container mx-auto px-4 grid gap-10 lg:grid-cols-12">
          {/* Left: TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 space-y-6 bg-black/30 border border-white/10 rounded-xl p-5">
              <div className="border-l border-white/10 pl-4 space-y-2">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-display font-bold text-primary">Table of Contents</h4>
                  <button className="text-xs text-primary hover:text-white hidden md:block" onClick={() => scrollToTop()}>
                    Back to top
                  </button>
                </div>
                <div className="space-y-1">
                  {toc.map((item) => {
                    const active = activeId === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleTocClick(item.id)}
                        className="w-full text-left flex items-center gap-3 px-2 py-1 rounded hover:bg-white/5 transition-colors"
                      >
                        <span
                          className={`w-[2px] h-8 rounded-full ${active ? 'bg-primary shadow-[0_0_10px_rgba(57,255,136,0.5)]' : 'bg-white/20'
                            }`}
                        />
                        <span
                          className={`text-sm leading-snug ${active ? 'text-white font-semibold' : 'text-gray-300'
                            }`}
                        >
                          {item.text}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          {/* Middle: article + TOC */}
          <article ref={articleRef} className="lg:col-span-9 space-y-6">

            <header className="space-y-3">
              <button
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary transition-colors"
                onClick={() => (window.location.href = `${blogBasePath}`)}
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Articles
              </button>
              <div className="flex items-center gap-3 text-xs text-gray-400">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono uppercase tracking-wider">
                  {article.category}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {formatDate(article.date)}
                </span>
                <span>{article.readTime}</span>
                <span>{article.author}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-display font-bold leading-tight">{article.title}</h1>
              <div className="flex flex-wrap gap-2">
                {article.tags?.map((tag) => (
                  <Pill key={tag} label={tag} />
                ))}
              </div>
              <div className="aspect-video rounded-xl overflow-hidden border border-white/10">
                <Thumbnail post={article} className="rounded-xl" />
              </div>
            </header>

            <div className="space-y-10">
              {(article.sections || []).map((section) => {
                const Heading = section.level === 3 ? 'h3' : 'h2';
                return (
                  <section key={section.id} className="space-y-4">
                    <Heading id={`${article.slug}-${section.id}`} className="scroll-mt-28 text-2xl font-display font-bold">
                      {section.title}
                    </Heading>
                    {section.paragraphs?.map((p, idx) => (
                      <p key={idx} className="text-gray-300 leading-relaxed">
                        {p}
                      </p>
                    ))}
                    {section.bullets && (
                      <ul className="list-disc list-inside space-y-2 text-gray-300">
                        {section.bullets.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    )}
                    {section.quote && (
                      <blockquote className="border-l-2 border-primary/50 pl-4 text-gray-200 italic">
                        {section.quote}
                      </blockquote>
                    )}
                  </section>
                );
              })}
            </div>

            {/* Related articles based on category */}
            <section className="pt-10 border-t border-white/10">
              <h3 className="text-2xl font-display font-bold mb-6 text-primary/90">Related Articles in {article.category}</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedArticles.map((item) => (
                  <button
                    key={item.slug}
                    onClick={() => handleSelect(item.slug)}
                    className="group relative text-left border border-white/10 rounded-xl p-6 bg-secondary/5 hover:bg-secondary/10 hover:border-primary/40 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                      <span className="px-2 py-1 rounded-md bg-white/5 text-primary tracking-wider uppercase text-[10px]">{item.category}</span>
                      <span>{formatDate(item.date)}</span>
                    </div>
                    <div className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</div>
                    <p className="text-gray-400 text-sm line-clamp-2">{item.excerpt}</p>
                  </button>
                ))}
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* "All Articles" Marquee Section */}
      <section className="py-20 bg-black border-t border-white/10 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-8 flex justify-between items-end">
          <div>
            <p className="text-xs font-mono text-primary uppercase mb-2">Discovery</p>
            <button onClick={() => window.location.href = blogBasePath} className="text-3xl font-display font-bold hover:text-primary transition-colors text-left">
              All Articles <span className="text-gray-600"> down here</span>
            </button>
          </div>
          <a href={blogBasePath} className="text-sm font-semibold border-b border-primary text-primary hover:text-white transition-colors pb-1">View All Posts</a>
        </div>

        {/* Marquee Track */}
        <div className="relative flex overflow-x-hidden group">
          <div className="animate-marquee whitespace-nowrap flex gap-6 items-stretch py-4">
            {/* Double the list for seamless loop */}
            {[...blogPosts, ...blogPosts].map((post, i) => (
              <div key={`${post.slug}-${i}`} className="inline-block w-[350px] flex-shrink-0">
                <button
                  onClick={() => window.location.href = `${blogBasePath}/${post.slug}`}
                  className="w-full h-full text-left bg-[#080808] border border-white/10 rounded-lg p-5 hover:border-primary/50 transition-all hover:scale-[1.02] flex flex-col justify-between whitespace-normal"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] font-mono border border-white/10 px-2 py-1 rounded text-gray-400">{post.category}</span>
                      <time className="text-[10px] text-gray-500">{formatDate(post.date)}</time>
                    </div>
                    <h4 className="text-md font-bold text-gray-200 leading-snug mb-2 group-hover:text-primary line-clamp-2">{post.title}</h4>
                  </div>
                  <div className="text-xs text-gray-500 mt-4 flex items-center gap-1">
                    Read Article <ArrowUpRight className="w-3 h-3" />
                  </div>
                </button>
              </div>
            ))}
          </div>
          {/* Gradients to fade edges */}
          <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        </div>

        <style>{`
            .animate-marquee {
                animation: marquee 50s linear infinite;
            }
            .group:hover .animate-marquee {
                animation-play-state: paused;
            }
            @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
        `}</style>
      </section>
    </main>
  );
};

export default BlogPostPage;
