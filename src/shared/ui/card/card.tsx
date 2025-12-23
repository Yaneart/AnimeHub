import { type ReactNode } from 'react';

export function Card({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        border: '1px solid #e5e7eb',
        borderRadius: 8,
        padding: 12,
        background: '#fff',
      }}
    >
      {children}
    </div>
  );
}
