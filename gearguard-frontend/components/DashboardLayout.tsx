'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div
      className="
        min-h-screen
        bg-[hsl(330,25%,92%)]
      "
    >
      {/* ======================================================
          NAVBAR
          - Slightly darker than page background
          - Always visible
          - Odoo-style soft separation
      ====================================================== */}
      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-[hsl(330,25%,78%)]
          bg-[hsl(330,30%,85%)]
          backdrop-blur
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            px-8
            py-3
          "
        >
          {/* ================= LOGO ================= */}
          <div
            className="
              flex
              items-center
              gap-3
              font-bold
              text-[hsl(330,45%,22%)]
            "
          >
            <div
              className="
                flex
                h-8
                w-8
                items-center
                justify-center
                rounded-md
                bg-[hsl(270,70%,60%)]
                text-white
                shadow-sm
              "
            >
              GG
            </div>
            <span className="tracking-wide">
              GearGuard
            </span>
          </div>

          {/* ================= NAVIGATION ================= */}
          <nav
            className="
              flex
              gap-6
              text-sm
              font-medium
            "
          >
            {[
              { name: 'Dashboard', href: '/' },
              { name: 'Maintenance', href: '/maintenance' },
              { name: 'Calendar', href: '/calendar' },
              { name: 'Equipment', href: '/equipment' },
              { name: 'Reporting', href: '/reporting' },
              { name: 'Teams', href: '/teams' },
            ].map((item) => {
              const isActive = pathname === item.href

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    rounded-md
                    px-3
                    py-1
                    transition
                    ${
                      isActive
                        ? `
                          bg-[hsl(330,40%,72%)]
                          text-[hsl(330,45%,20%)]
                          shadow-sm
                        `
                        : `
                          text-[hsl(330,30%,32%)]
                          hover:text-[hsl(330,45%,22%)]
                          hover:bg-[hsl(330,25%,88%)]
                        `
                    }
                  `}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* ================= USER INFO ================= */}
          <div className="flex items-center gap-3">
            <div className="text-right text-sm leading-tight">
              <div className="font-semibold text-[hsl(330,45%,22%)]">
                Mitchell Admin
              </div>
              <div className="text-xs text-[hsl(330,30%,40%)]">
                Administrator
              </div>
            </div>

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                bg-[hsl(270,70%,60%)]
                text-white
                shadow-sm
              "
            >
              MA
            </div>
          </div>
        </div>
      </header>

      {/* ======================================================
          MAIN CONTENT AREA
          - Adds padding so cards float on page
          - Cards themselves will have shadows
      ====================================================== */}
      <main
        className="
          px-8
          py-8
        "
      >
        {children}
      </main>
    </div>
  )
}
