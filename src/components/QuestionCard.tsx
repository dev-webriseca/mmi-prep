"use client";

import Link from "next/link";
import { Question } from "@/data/questions";

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

interface QuestionCardProps {
  question: Question;
  index: number;
}

export default function QuestionCard({ question, index }: QuestionCardProps) {
  return (
    <Link
      href={`/question/${question.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        className={`question-card animate-in stagger-${Math.min(index + 1, 6)}`}
        style={{ opacity: 0 }}
      >
        <div className="question-card-header">
          <span className="question-number">#{question.id}</span>
          <span
            className={`question-category-tag ${getCategoryTagClass(question.category)}`}
          >
            {question.category}
          </span>
        </div>
        <p className="question-title">{question.prompt}</p>
      </div>
    </Link>
  );
}
