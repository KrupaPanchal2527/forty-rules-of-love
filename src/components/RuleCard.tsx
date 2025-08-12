'use client';

import { useState } from 'react';
import { Rule } from '@/types';

interface RuleCardProps {
  rule: Rule;
  index: number;
  onClick: (rule: Rule) => void;
}

const colorVariants = [
  'from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 border-violet-200 dark:border-violet-800',
  'from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 border-rose-200 dark:border-rose-800',
  'from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800',
  'from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800',
  'from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800',
  'from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800',
  'from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 border-pink-200 dark:border-pink-800',
  'from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800',
  'from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border-teal-200 dark:border-teal-800',
  'from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800',
  'from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-cyan-200 dark:border-cyan-800',
  'from-lime-50 to-lime-100 dark:from-lime-950 dark:to-lime-900 border-lime-200 dark:border-lime-800',
];

export default function RuleCard({ rule, index, onClick }: RuleCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const colorVariant = colorVariants[index % colorVariants.length];

  return (
    <div
      className={`
        relative group cursor-pointer
        bg-gradient-to-br ${colorVariant}
        border rounded-2xl p-6
        transition-all duration-300 ease-out
        hover:scale-105 hover:shadow-xl hover:-translate-y-1
        ${isHovered ? 'shadow-2xl' : 'shadow-md'}
        ring-1 ring-black/5 dark:ring-white/5
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(rule)}
    >
      {/* Rule Number */}
      <div className="flex items-center justify-center h-full min-h-[120px]">
        <div className="text-center">
          <div className="font-serif text-4xl md:text-5xl font-bold text-foreground/80 mb-2">
            {index + 1}
          </div>
          <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            Rule
          </div>
        </div>
      </div>

      {/* Hover Effect Overlay */}
      <div
        className={`
          absolute inset-0 rounded-2xl
          bg-gradient-to-br from-background/20 to-background/40
          opacity-0 group-hover:opacity-100
          transition-opacity duration-300
        `}
      />

      {/* Subtle Pattern */}
      <div
        className="absolute inset-0 rounded-2xl opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, currentColor 1px, transparent 1px),
                           radial-gradient(circle at 80% 50%, currentColor 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />
    </div>
  );
}
