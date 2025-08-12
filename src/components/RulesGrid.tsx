'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Rule } from '@/types';
import RuleCard from './RuleCard';
import FullScreenOverlay from './FullScreenOverlay';

export default function RulesGrid() {
  const [rules, setRules] = useState<Rule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRule, setSelectedRule] = useState<Rule | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchRules();
  }, []);

  const fetchRules = async () => {
    try {
      setLoading(true);

      // Check if Supabase is configured
      if (!supabase) {
        throw new Error(
          'Supabase is not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
        );
      }

      const { data, error } = await supabase
        .from('rules')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        throw error;
      }

      setRules(data || []);
    } catch (err) {
      console.error('Error fetching rules:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');

      // Fallback: Create placeholder rules if Supabase fails
      const placeholderRules: Rule[] = Array.from({ length: 40 }, (_, i) => ({
        id: i + 1,
        rule: `This is rule number ${i + 1} - quote will be loaded from Supabase`,
      }));
      setRules(placeholderRules);
    } finally {
      setLoading(false);
    }
  };

  const handleRuleClick = (rule: Rule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedRule(null), 200);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading the forty rules...</p>
        </div>
      </div>
    );
  }

  if (error && rules.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">💔</div>
          <h2 className="font-serif text-2xl font-semibold mb-2">
            Unable to load rules
          </h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={fetchRules}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-full font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50/30 via-background to-rose-50/30 dark:from-violet-950/30 dark:via-background dark:to-rose-950/30">
      {/* Header */}
      <div className="container mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-foreground mb-4">
            The Forty Rules of{' '}
            <span className="bg-gradient-to-r from-violet-600 to-rose-600 bg-clip-text text-transparent">
              Love
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Click on any rule to discover the wisdom within. Each rule is a step
            on the journey toward deeper understanding and love.
          </p>
          {error && (
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-amber-800 dark:text-amber-200 text-sm">
                ⚠️ Using placeholder data. Please check your Supabase
                connection.
              </p>
            </div>
          )}
        </div>

        {/* Rules Grid - 4 columns, 10 rows */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-6xl mx-auto">
          {rules.map((rule, index) => (
            <RuleCard
              key={rule.id}
              rule={rule}
              index={index}
              onClick={handleRuleClick}
            />
          ))}
        </div>

        {/* Footer Quote */}
        <div className="text-center mt-20 max-w-2xl mx-auto">
          <blockquote className="font-serif text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
            &quot;Love is the bridge between you and everything.&quot;
          </blockquote>
          <cite className="block mt-4 text-sm text-muted-foreground/80">
            — Rumi
          </cite>
        </div>
      </div>

      {/* Full Screen Quote Display */}
      <FullScreenOverlay
        rule={selectedRule}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
