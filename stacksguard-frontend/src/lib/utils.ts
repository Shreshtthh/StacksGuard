import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

export function getRiskLevel(score: number): string {
  if (score >= 71) return 'HIGH RISK';
  if (score >= 31) return 'MEDIUM RISK';
  return 'LOW RISK';
}

export function getRiskColor(score: number): string {
  if (score >= 71) return 'red';
  if (score >= 31) return 'yellow';
  return 'green';
}

export function getRiskColorClass(score: number): string {
  if (score >= 71) return 'text-red-600';
  if (score >= 31) return 'text-yellow-600';
  return 'text-green-600';
}

export function getRiskBgClass(score: number): string {
  if (score >= 71) return 'bg-red-500';
  if (score >= 31) return 'bg-yellow-500';
  return 'bg-green-500';
}

export function formatCurrency(value: number): string {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `$${(value / 1000).toFixed(1)}K`;
  }
  return `$${value}`;
}

export function truncateAddress(address: string, chars: number = 6): string {
  if (address.length <= chars * 2) return address;
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}
