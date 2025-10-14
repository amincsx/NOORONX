import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Convert any Persian/Arabic digits to English (Latin) digits
export function toEnglishDigits(input: string | number): string {
  const s = String(input);
  const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const arabic = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const pIdx = persian.indexOf(ch);
    if (pIdx !== -1) { out += String(pIdx); continue; }
    const aIdx = arabic.indexOf(ch);
    if (aIdx !== -1) { out += String(aIdx); continue; }
    out += ch;
  }
  return out;
}

// Convert any English digits to Persian (Farsi) digits
export function toPersianDigits(input: string | number): string {
  const s = String(input);
  const persian = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    const eIdx = parseInt(ch, 10);
    if (!isNaN(eIdx)) { out += persian[eIdx]; continue; }
    out += ch;
  }
  return out;
}