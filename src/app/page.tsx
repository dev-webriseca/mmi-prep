"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { questions, categories, Category } from "@/data/questions";
import QuestionCard from "@/components/QuestionCard";
import { getTimerMinutes, setTimerMinutes, PRESET_MINUTES } from "@/lib/timerStore";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [timerMinutes, setTimerMinutesState] = useState(8);

  useEffect(() => {
    setTimerMinutesState(getTimerMinutes());
  }, []);

  const handleTimerChange = (val: number) => {
    setTimerMinutes(val);
    setTimerMinutesState(val);
  };

  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchesCategory =
        activeCategory === "All" || q.category === activeCategory;
      const matchesSearch =
        searchQuery === "" ||
        q.prompt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const totalQuestions = questions.length;

  return (
    <main className="page-wrapper">
      {/* Hero */}
      <section className="hero">
        <div className="hero-badge">✨ PA School Interview Prep</div>
        <h1>Hey Maryam, let&apos;s practice. 💪</h1>

      </section>

      {/* Stats */}
      <div className="stats-bar">

        {categories.map((cat) => (
          <div className="stat-item" key={cat}>
            <span className="stat-value">
              {questions.filter((q) => q.category === cat).length}
            </span>
            <span className="stat-label">{cat.split(" ")[0]}</span>
          </div>
        ))}
      </div>

      {/* Random Practice CTA */}
      <Link href="/random" style={{ textDecoration: "none", color: "inherit" }}>
        <div className="random-cta-card">
          <div className="random-cta-icon">🎲</div>
          <div className="random-cta-body">
            <span className="random-cta-title">Random Practice Mode</span>
            <span className="random-cta-sub">
              Get served random questions one at a time — perfect for simulating real MMI pressure.
            </span>
          </div>
          <span className="random-cta-arrow">→</span>
        </div>
      </Link>

      {/* Search */}
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          id="search-questions"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-muted)",
              cursor: "pointer",
              fontSize: "1rem",
              lineHeight: 1,
              padding: 0,
            }}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>

      {/* Category filter */}
      <div className="category-filter">
        <button
          className={`chip ${activeCategory === "All" ? "active" : ""}`}
          onClick={() => setActiveCategory("All")}
        >
          All ({totalQuestions})
        </button>
        {categories.map((cat) => {
          const count = questions.filter((q) => q.category === cat).length;
          return (
            <button
              key={cat}
              className={`chip ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Timer Settings */}
      <div className="timer-settings">
        <label htmlFor="timer-select" className="timer-settings-label">⏱ Practice Timer Duration:</label>
        <select
          id="timer-select"
          className="timer-settings-select"
          value={timerMinutes}
          onChange={(e) => handleTimerChange(Number(e.target.value))}
        >
          {PRESET_MINUTES.map((m) => (
            <option key={m} value={m}>{m} minutes</option>
          ))}
        </select>
      </div>

      {/* Results count */}
      {(activeCategory !== "All" || searchQuery) && (
        <p
          style={{
            textAlign: "center",
            color: "var(--text-muted)",
            fontSize: "0.85rem",
            marginBottom: "var(--space-lg)",
            marginTop: "-8px",
          }}
        >
          Showing {filteredQuestions.length} question
          {filteredQuestions.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Questions grid */}
      {filteredQuestions.length > 0 ? (
        <div className="questions-grid">
          {filteredQuestions.map((q, i) => (
            <QuestionCard key={q.id} question={q} index={i} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">📭</div>
          <h3>No questions found</h3>
          <p style={{ color: "var(--text-muted)", marginTop: "8px" }}>
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </main>
  );
}
