import { ReactNode } from "react";

export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  tags: string[];
  icon: ReactNode;
}

export interface CaseStudy {
  client: string;
  industry: string;
  title: string;
  stats: { label: string; value: string }[];
}

export interface PricingTier {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ArticleSection {
  id: string;
  title: string;
  level: 2 | 3;
  paragraphs?: string[];
  bullets?: string[];
  quote?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string; // ISO string
  author: string;
  category: string;
  tags: string[];
  excerpt: string;
  readTime: string;
  featured?: boolean;
  thumbnail?: { src: string; alt?: string };
  sections: ArticleSection[];
}
