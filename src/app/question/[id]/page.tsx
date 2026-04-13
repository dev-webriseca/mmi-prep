"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { questions } from "@/data/questions";
import Timer from "@/components/Timer";
import { useState } from "react";

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

export default function QuestionDetailPage() {
  const params = useParams();
  const id = Number(params.id);
  const question = questions.find((q) => q.id === id);
  const [notes, setNotes] = useState("");

  if (!question) {
    return (
      <div className="question-detail">
        <div className="empty-state">
          <div className="empty-state-icon">❓</div>
          <h3>Question not found</h3>
          <Link href="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            ← Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = questions.findIndex((q) => q.id === id);
  const prevQuestion = currentIndex > 0 ? questions[currentIndex - 1] : null;
  const nextQuestion =
    currentIndex < questions.length - 1 ? questions[currentIndex + 1] : null;

  return (
    <div className="question-detail">
      {/* Back button */}
      <Link href="/" className="back-button">
        ← Back to Questions
      </Link>

      {/* Header */}
      <div className="detail-header animate-in">
        <div className="detail-meta">
          <span className="question-number">Question #{question.id}</span>
          <span
            className={`question-category-tag ${getCategoryTagClass(question.category)}`}
          >
            {question.category}
          </span>
        </div>
      </div>

      {/* Prompt */}
      <div className="detail-prompt animate-in stagger-1" style={{ opacity: 0 }}>
        <div className="detail-prompt-label">💬 Question</div>
        <p>{question.prompt}</p>
      </div>

      {/* Timer */}
      <Timer />

      {/* Notes */}
      <div className="notes-section animate-in stagger-2" style={{ opacity: 0 }}>
        <h3>📝 Your Response Notes</h3>
        <textarea
          className="notes-textarea"
          placeholder="Outline your response, jot down key points, or draft your answer here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          id={`notes-question-${question.id}`}
        />
      </div>

      {/* Navigation */}
      <div className="question-nav">
        {prevQuestion ? (
          <Link href={`/question/${prevQuestion.id}`} className="nav-btn">
            <span className="nav-btn-label">← Previous</span>
            <span className="nav-btn-title">{prevQuestion.prompt}</span>
          </Link>
        ) : (
          <div />
        )}
        {nextQuestion ? (
          <Link
            href={`/question/${nextQuestion.id}`}
            className="nav-btn"
            style={{ textAlign: "right" }}
          >
            <span className="nav-btn-label">Next →</span>
            <span className="nav-btn-title">{nextQuestion.prompt}</span>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}
