import React, { useMemo, useState } from 'react';
import { Reveal, GlitchText } from './ui/Animations';
import { Calendar, Tag, ArrowUpRight } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { BlogPost } from '../types';

const basePath = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
const blogBasePath = `${basePath}/blog`;
const primaryCategories = [
  'General',
  'AI',
  'CyberDefense',
  'CyberAttack',
  'IT Security',
  'IT Audits',
  'SaaS',
  'Cyber Inteligence',
];

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(date));

const Pill: React.FC<{ label: string }> = ({ label }) => (
  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 text-xs text-gray-300 border border-white/10">
    <Tag className="w-3 h-3 text-primary" />
    {label}
  </span>
);

const Thumbnail: React.FC<{ post: BlogPost }> = ({ post }) => {
  if (post.thumbnail?.src) {
    return (
      <img
        src={post.thumbnail.src}
        alt={post.thumbnail.alt || post.title}
        className="w-full h-full object-cover"
        loading="lazy"
      />
    );
  }
  return (
    <div className="w-full h-full bg-gradient-to-br from-black via-secondary to-primary/20 flex items-center justify-center text-xs text-gray-200 uppercase tracking-[0.2em]">
      Thumbnail
    </div>
  );
};

const Blog: React.FC = () => {
  const initialCategory = (() => {
    if (typeof window === 'undefined') return 'All';
    const params = new URLSearchParams(window.location.search);
    return params.get('category') || 'All';
  })();
  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const articles = useMemo(
    () => [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
    []
  );
  const popular = useMemo(
    () => blogPosts.filter((p) => p.featured).concat(blogPosts.filter((p) => !p.featured).slice(0, 2)),
    []
  );

  const handleOpen = (post: BlogPost) => {
    const href = `${blogBasePath}/${post.slug}`;
    if (typeof window !== 'undefined') {
      window.location.href = href;
    }
  };

  // fixed categories for SEO buckets; tags remain separate labels
  const categoryOptions = useMemo(() => ['All', ...primaryCategories], []);

  const filteredArticles = useMemo(() => {
    if (activeCategory === 'All') return articles;
    return articles.filter(
      (post) => post.category === activeCategory || post.tags.includes(activeCategory)
    );
  }, [activeCategory, articles]);

  return (
    <section id="blog" className="py-24 md:py-32 bg-secondary/10 border-y border-white/5">
      <div className="container mx-auto px-4">
        {/* Kategorien */}
        <div className="mb-4 text-xs uppercase tracking-[0.2em] text-gray-500">Kategorien</div>
        <div className="mb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryOptions.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full text-left rounded-xl border bg-black/30 p-4 transition-all hover:-translate-y-1 ${
                  active
                    ? 'border-primary/60 shadow-[0_0_18px_rgba(57,255,136,0.25)]'
                    : 'border-white/10 hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-sm font-semibold ${active ? 'text-white' : 'text-gray-100'}`}>{cat}</span>
                  <span
                    className={`w-2 h-2 rounded-full ${
                      active ? 'bg-primary shadow-[0_0_10px_rgba(57,255,136,0.6)]' : 'bg-white/30'
                    }`}
                  />
                </div>
                <p className="mt-2 text-xs text-gray-400">Filtert Posts nach Thema/Tag</p>
              </button>
            );
          })}
        </div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <Reveal>
            <div>
              <p className="text-xs font-mono uppercase text-primary mb-3">Insights & Research</p>
              <h2 className="text-4xl font-display font-bold flex items-center gap-3">
                <GlitchText text="byondSEC Articles" />
              </h2>
              <p className="text-gray-400 mt-3 max-w-2xl">
                Actionable writeups for CISOs, engineers, and defenders. No fluff—just exploits, fixes, and playbooks.
              </p>
            </div>
          </Reveal>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Updated weekly</span>
            <span className="px-3 py-1 rounded-full border border-white/10 bg-white/5">Hands-on research</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Left: Articles */}
          <div className="lg:col-span-2 space-y-6">
            {filteredArticles.map((article) => (
              <article
                key={article.title}
                className="group bg-black/40 border border-white/10 rounded-xl p-6 hover:border-primary/40 transition-colors shadow-[0_10px_40px_rgba(0,0,0,0.25)]"
              >
                <button
                  onClick={() => handleOpen(article)}
                  className="block aspect-video w-full rounded-lg overflow-hidden border border-white/10 mb-4 hover:border-primary/50 transition-colors"
                  aria-label={`Open ${article.title}`}
                >
                  <Thumbnail post={article} />
                </button>
                <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                  <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-mono uppercase tracking-[0.2em]">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {formatDate(article.date)}</span>
                  <span>{article.readTime} read</span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <button
                      onClick={() => handleOpen(article)}
                      className="text-left text-2xl font-display font-bold mb-2 group-hover:text-white transition-colors"
                    >
                      {article.title}
                    </button>
                    <p className="text-gray-400 leading-relaxed">{article.excerpt}</p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {article.tags.map((tag) => (
                        <Pill key={tag} label={tag} />
                      ))}
                    </div>
                  </div>
                  <button
                    className="self-start px-4 py-2 rounded-full border border-primary/50 text-primary text-sm font-bold inline-flex items-center gap-1 hover:bg-primary hover:text-black transition-colors"
                    onClick={() => handleOpen(article)}
                  >
                    Read article <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          {/* Right: Popular */}
          <aside className="bg-black/40 border border-white/10 rounded-xl p-6 h-fit sticky top-28">
            <h3 className="text-xl font-display font-bold mb-4">Populäre Artikel</h3>
            <div className="space-y-4">
              {popular.map((item) => (
                <div key={item.title} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                    <span className="px-2 py-1 rounded bg-white/5 text-white/80">{item.category}</span>
                    <span>{formatDate(item.date)}</span>
                  </div>
                  <button
                    className="text-sm text-white font-semibold hover:text-primary transition-colors inline-flex items-center gap-2"
                    onClick={() => handleOpen(item)}
                  >
                    {item.title}
                    <ArrowUpRight className="w-4 h-4 text-primary" />
                  </button>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Recommendations */}
      </div>
    </section>
  );
};

export default Blog;
