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
