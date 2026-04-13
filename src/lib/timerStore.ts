const KEY = "mmi-timer-minutes";
export const DEFAULT_MINUTES = 8;
export const PRESET_MINUTES = [5, 6, 7, 8, 10, 12];

export function getTimerMinutes(): number {
  if (typeof window === "undefined") return DEFAULT_MINUTES;
  const stored = localStorage.getItem(KEY);
  if (!stored) return DEFAULT_MINUTES;
  const parsed = parseInt(stored, 10);
  return isNaN(parsed) || parsed < 1 ? DEFAULT_MINUTES : parsed;
}

export function setTimerMinutes(minutes: number): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, String(minutes));
}
