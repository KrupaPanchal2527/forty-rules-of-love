'use client';

import { useEffect, useState } from 'react';
import { Rule } from '@/types';

interface FullScreenOverlayProps {
  rule: Rule | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function FullScreenOverlay({
  rule,
  isOpen,
  onClose,
}: FullScreenOverlayProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCopyFeedback, setShowCopyFeedback] = useState(false);

  useEffect(() => {
    if (isOpen && rule) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [isOpen, rule]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(onClose, 500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen || !rule) return null;

  const ruleNumber = rule.id || 1;

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/75 via-white/85 to-white/75 backdrop-blur-md">
        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 md:w-2 md:h-2 bg-primary/15 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Close Button - Larger and Mobile Friendly */}
      <button
        onClick={handleClose}
        className={`absolute top-4 right-4 md:top-8 md:right-8 w-14 h-14 md:w-16 md:h-16 rounded-full
          bg-background/90 backdrop-blur-sm border-2 border-border/50 hover:bg-background
          transition-all duration-300 hover:scale-110 z-10 flex items-center justify-center group
          shadow-lg hover:shadow-xl ${
            isAnimating
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-4'
          }`}
        style={{ transitionDelay: '200ms' }}
      >
        <span className="text-foreground text-2xl md:text-3xl group-hover:text-primary transition-colors font-light">
          x
        </span>
      </button>

      {/* Content */}
      <div className="flex items-center justify-center min-h-screen p-4 md:p-8">
        <div className="max-w-6xl mx-auto text-center w-full">
          {/* Title */}
          <h1
            className={`font-serif text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-8 md:mb-16 px-4
            transform transition-all duration-700 ${
              isAnimating
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            Rule {ruleNumber}
          </h1>

          {/* Quote - Clean and Simple */}
          <div
            className={`mb-12 md:mb-16 px-4 md:px-8 transform transition-all duration-700 delay-500 ${
              isAnimating
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
          >
            <blockquote className="font-serif text-xl md:text-3xl lg:text-4xl leading-relaxed text-foreground max-w-5xl mx-auto text-center">
              <span className="text-4xl md:text-6xl text-primary/50 font-bold">
                &ldquo;
              </span>
              <span className="italic px-2">{rule.rule}</span>
              <span className="text-4xl md:text-6xl text-primary/50 font-bold">
                &rdquo;
              </span>
            </blockquote>
          </div>

          {/* Attribution */}
          <div
            className={`text-base md:text-lg text-muted-foreground font-medium mb-8 md:mb-12 px-4
            transform transition-all duration-700 ${
              isAnimating
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '700ms' }}
          >
            <div className="flex flex-col items-center gap-2">
              <div>
                — From &ldquo;The Forty Rules of Love&rdquo; by Elif Shafak
              </div>
              {rule.page && (
                <div className="text-sm md:text-base text-muted-foreground/80 font-normal">
                  Page {rule.page}
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div
            className={`flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4
            transform transition-all duration-700 ${
              isAnimating
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `"${rule.rule}" - Rule ${ruleNumber} from The Forty Rules of Love`
                );
                setShowCopyFeedback(true);
                setTimeout(() => setShowCopyFeedback(false), 2000);
              }}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 bg-primary hover:bg-primary/90 text-primary-foreground
                rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105 shadow-xl
                backdrop-blur-sm"
            >
              {showCopyFeedback ? '✓ Copied!' : 'Share This Wisdom'}
            </button>

            <button
              onClick={handleClose}
              className="w-full sm:w-auto px-8 md:px-10 py-3 md:py-4 border-2 border-primary/50 text-primary hover:border-primary hover:bg-primary/10
                rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:scale-105
                backdrop-blur-sm"
            >
              Continue Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
