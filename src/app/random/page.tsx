"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { questions, categories, Category } from "@/data/questions";
import Timer from "@/components/Timer";
import VoiceRecorder from "@/components/VoiceRecorder";

function getCategoryTagClass(category: string): string {
  const map: Record<string, string> = {
    "Personal Identity & Self-Awareness": "tag-personal",
    "Motivation for PA & Career Direction": "tag-motivation",
    "Healthcare Knowledge & System Awareness": "tag-healthcare",
    "Behavior, Teamwork & Ethics": "tag-ethics",
    "Resilience, Work Ethic & Program Fit": "tag-resilience",
  };
  return map[category] || "tag-personal";
}

function pickRandom<T>(arr: T[], exclude?: T): T {
  if (arr.length === 1) return arr[0];
  let candidate: T;
  do {
    candidate = arr[Math.floor(Math.random() * arr.length)];
  } while (candidate === exclude);
  return candidate;
}

export default function RandomPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [currentQuestion, setCurrentQuestion] = useState<
    (typeof questions)[number] | null
  >(null);
  const [notes, setNotes] = useState("");
  const [animKey, setAnimKey] = useState(0); // bump to re-trigger CSS animation
  const [timerKey, setTimerKey] = useState(0); // bump to reset timer
  const [seen, setSeen] = useState<Set<number>>(new Set());
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const pool = activeCategory === "All"
    ? questions
    : questions.filter((q) => q.category === activeCategory);

  const handleNext = useCallback(() => {
    if (pool.length === 0) return;

    // If all questions in pool have been seen, reset the "seen" set
    const available = pool.filter((q) => !seen.has(q.id));
    const source = available.length > 0 ? available : pool;

    const next = pickRandom(source, currentQuestion ?? undefined);
    setCurrentQuestion(next);
    setSeen((prev) => new Set([...prev, next.id]));
    setNotes("");
    setAnimKey((k) => k + 1);
    setTimerKey((k) => k + 1);
  }, [pool, currentQuestion, seen]);

  const handleTranscript = useCallback((text: string) => {
    setNotes((prev) => (prev ? prev + " " + text : text));
  }, []);

  const copyNotes = useCallback(() => {
    navigator.clipboard.writeText(notes);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [notes]);

  const handleCategoryChange = (cat: Category | "All") => {
    setActiveCategory(cat);
    setCurrentQuestion(null);
    setNotes("");
    setSeen(new Set());
    setAnimKey((k) => k + 1);
    setTimerKey((k) => k + 1);
  };

  const progress = seen.size > 0 ? Math.round((seen.size / pool.length) * 100) : 0;

  return (
    <main className="page-wrapper">
      {/* Back */}
      <Link href="/" className="back-button" style={{ display: "inline-block", marginBottom: "var(--space-lg)" }}>
        ← Back to Questions
      </Link>

      {/* Hero */}
      <section className="hero" style={{ paddingBottom: "var(--space-xl)" }}>
        <div className="hero-badge">🎲 Random Practice</div>
        <h1>Surprise yourself, Maryam.</h1>

      </section>

      {/* Category filter */}
      <div className="category-filter">
        <button
          className={`chip ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => handleCategoryChange("All")}
        >
          All ({questions.length})
        </button>
        {categories.map((cat) => {
          const count = questions.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Progress bar */}
      {seen.size > 0 && (
        <div className="random-progress-wrap">
          <div className="random-progress-label">
            <span>{seen.size} / {pool.length} seen</span>
            <span>{progress}%</span>
          </div>
          <div className="random-progress-track">
            <div
              className="random-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Question card or Start prompt */}
      {currentQuestion ? (
        <div key={animKey} className="random-question-wrap animate-in">
          {/* Category tag */}
          <div className="detail-meta" style={{ marginBottom: "var(--space-md)" }}>
            <span className="question-number">#{currentQuestion.id}</span>
            <span className={`question-category-tag ${getCategoryTagClass(currentQuestion.category)}`}>
              {currentQuestion.category}
            </span>
          </div>

          {/* Prompt */}
          <div className="detail-prompt">
            <div className="detail-prompt-label">💬 Question</div>
            <p>{currentQuestion.prompt}</p>
          </div>

          {/* Timer */}
          <Timer key={timerKey} onIsRunningChange={setIsTimerRunning} />

          {/* Notes */}
          <div className="notes-section">
            <div className="notes-section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
                <h3 style={{ margin: 0 }}>📝 Your Response Notes</h3>
                <VoiceRecorder onTranscript={handleTranscript} isActive={isTimerRunning} />
              </div>
              <button 
                className="btn btn-secondary" 
                style={{ padding: '4px 8px', fontSize: '0.8rem' }}
                onClick={copyNotes}
                disabled={!notes}
                title="Copy notes"
              >
                {copied ? '✅ Copied!' : '📋 Copy Text'}
              </button>
            </div>
            <textarea
              className="notes-textarea"
              placeholder="Outline your response, jot down key points, or draft your answer here..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              id={`random-notes-${currentQuestion.id}`}
            />
          </div>

          {/* Next button */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "var(--space-xl)" }}>
            <button className="btn btn-primary random-next-btn" onClick={handleNext}>
              🎲 Next random question
            </button>
          </div>
        </div>
      ) : (
        <div className="random-start-state">
          <div className="random-start-icon">🎲</div>
          <h2>Ready to practice?</h2>
          <p>
            {pool.length} question{pool.length !== 1 ? "s" : ""} in your
            selected pool. Hit the button and get started!
          </p>
          <button className="btn btn-primary random-next-btn" onClick={handleNext}>
            Start Random Practice
          </button>
        </div>
      )}
    </main>
  );
}
