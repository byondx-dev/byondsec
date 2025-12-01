import React from 'react';
import { blogPosts } from '../data/blogPosts';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { GlitchText } from './ui/Animations';

const base = import.meta.env.BASE_URL || '/';
const blogBasePath = `${base === '/' ? '/' : base}blog`;

const ArticlesStrip: React.FC = () => {
  return (
    <section id="articles" className="py-24 bg-secondary/10 border-y border-white/5">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase text-primary mb-2">Latest Articles</p>
            <h2 className="text-3xl font-display font-bold">
              <GlitchText text="Insights to act on" />
            </h2>
          </div>
          <a
            href={blogBasePath}
            className="inline-flex items-center gap-2 text-sm text-primary font-semibold hover:text-white transition-colors"
          >
            Alle Articles <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
          {blogPosts.map((post) => (
            <article
              key={post.slug}
              className="min-w-[280px] max-w-xs bg-black/40 border border-white/10 rounded-xl p-4 snap-start hover:border-primary/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                <span className="px-2 py-1 rounded bg-primary/10 text-primary uppercase tracking-[0.15em]">{post.category}</span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Intl.DateTimeFormat('de-DE', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(post.date))}
                </span>
              </div>
              <button
                onClick={() => (window.location.href = `${blogBasePath}/${post.slug}`)}
                className="text-left text-lg font-display font-bold text-white hover:text-primary transition-colors"
              >
                {post.title}
              </button>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3">{post.excerpt}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[11px] rounded-full border border-white/10 text-gray-300">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesStrip;
