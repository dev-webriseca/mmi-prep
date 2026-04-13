"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { getTimerMinutes } from "@/lib/timerStore";

export default function Timer() {
  const initialSeconds = getTimerMinutes() * 60;
  const [totalSeconds, setTotalSeconds] = useState(initialSeconds);
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const secs = getTimerMinutes() * 60;
    setTotalSeconds(secs);
    setTimeLeft((prev) => (prev === initialSeconds ? secs : prev));
  }, [initialSeconds]);

  const isWarning = timeLeft <= 60 && timeLeft > 0;
  const isDone = timeLeft <= 0;

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearTimer();
  }, [clearTimer]);

  const startTimer = useCallback(() => {
    if (isDone) return;
    clearTimer();
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [isDone, clearTimer]);

  const pauseTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
  }, [clearTimer]);

  const resetTimer = useCallback(() => {
    clearTimer();
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  }, [clearTimer, totalSeconds]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const display = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <div className="timer-section">
      <div
        className={`timer-display ${isWarning ? "warning" : ""}`}
        style={isDone ? { color: "var(--accent-danger)", WebkitTextFillColor: "var(--accent-danger)" } : {}}
        suppressHydrationWarning
      >
        {isDone ? "00:00" : display}
      </div>
      <div className="timer-controls">
        {!isRunning ? (
          <button
            className="btn btn-primary btn-icon"
            onClick={startTimer}
            title="Start"
            disabled={isDone}
          >
            ▶
          </button>
        ) : (
          <button
            className="btn btn-secondary btn-icon"
            onClick={pauseTimer}
            title="Pause"
          >
            ⏸
          </button>
        )}
        <button
          className="btn btn-secondary btn-icon"
          onClick={resetTimer}
          title="Reset"
        >
          ↺
        </button>
      </div>
    </div>
  );
}
