import './globals.css'
import React from 'react'

export const metadata = {
  title: 'GearGuard',
  description: 'Maintenance Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="
          min-h-screen
          bg-background
          text-foreground
          antialiased
        "
      >
        {/* 
          Root layout wrapper
          - bg-background comes from globals.css (Odoo light theme)
          - min-h-screen ensures full-height pages
          - antialiased improves font rendering
        */}
        {children}
      </body>
    </html>
  )
}
