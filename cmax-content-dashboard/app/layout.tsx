import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Content Strategy — Cmax Air',
  description: 'Trending videos, viral formulas y micro-influencers outdoor para Cmax Air',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
