'use client'

import React from 'react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  AlertTriangle,
  Users,
  ClipboardList,
} from 'lucide-react'

import KanbanBoard from '@/app/components/KanbanBoard'

export default function DashboardPage() {
  return (
    <div
      className="
        min-h-screen
        space-y-12
        bg-background
        p-8
      "
    >

      {/* ================= PAGE HEADER ================= */}
      <div>
        <h1
          className="
            text-3xl
            font-bold
            text-[hsl(330,45%,25%)]
          "
        >
          Dashboard
        </h1>

        <p
          className="
            mt-1
            text-[hsl(330,25%,45%)]
          "
        >
          Overview of your maintenance operations
        </p>
      </div>

      {/* ================= SUMMARY CARDS ================= */}
      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
        "
      >

        {/* ---------- Critical Equipment ---------- */}
        <Card>
          <CardHeader
            className="
              flex
              flex-row
              items-center
              justify-between
            "
          >
            <CardTitle
              className="
                text-sm
                text-[hsl(330,35%,25%)]
              "
            >
              Critical Equipment
            </CardTitle>

            <AlertTriangle
              className="
                h-5
                w-5
                text-red-500
              "
            />
          </CardHeader>

          <CardContent>
            <div
              className="
                text-3xl
                font-bold
                text-red-500
              "
            >
              5 Units
            </div>

            <p
              className="
                mt-2
                text-xs
                text-muted-foreground
              "
            >
              Health &lt; 30%
            </p>

            <div
              className="
                mt-4
                rounded-md
                bg-red-100
                p-2
                text-xs
                text-red-700
              "
            >
              Needs immediate attention
            </div>
          </CardContent>
        </Card>

        {/* ---------- Technician Load ---------- */}
        <Card>
          <CardHeader
            className="
              flex
              flex-row
              items-center
              justify-between
            "
          >
            <CardTitle
              className="
                text-sm
                text-[hsl(330,35%,25%)]
              "
            >
              Technician Load
            </CardTitle>

            <Users
              className="
                h-5
                w-5
                text-blue-600
              "
            />
          </CardHeader>

          <CardContent>
            <div
              className="
                text-3xl
                font-bold
                text-blue-600
              "
            >
              85%
            </div>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              Utilized
            </p>

            <div className="mt-4">
              <div
                className="
                  mb-1
                  flex
                  justify-between
                  text-xs
                "
              >
                <span className="text-muted-foreground">
                  Capacity
                </span>
                <span>85 / 100</span>
              </div>

              <div
                className="
                  h-2
                  rounded-full
                  bg-secondary
                "
              >
                <div
                  className="
                    h-full
                    w-[85%]
                    rounded-full
                    bg-blue-600
                  "
                />
              </div>

              <p
                className="
                  mt-2
                  text-xs
                  text-blue-600
                "
              >
                Assign carefully
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ---------- Open Requests ---------- */}
        <Card>
          <CardHeader
            className="
              flex
              flex-row
              items-center
              justify-between
            "
          >
            <CardTitle
              className="
                text-sm
                text-[hsl(330,35%,25%)]
              "
            >
              Open Requests
            </CardTitle>

            <ClipboardList
              className="
                h-5
                w-5
                text-emerald-600
              "
            />
          </CardHeader>

          <CardContent>
            <div
              className="
                text-3xl
                font-bold
                text-emerald-600
              "
            >
              12
            </div>

            <p
              className="
                mt-1
                text-xs
                text-muted-foreground
              "
            >
              Pending
            </p>

            <div
              className="
                mt-4
                flex
                gap-4
                text-xs
              "
            >
              <span className="text-emerald-600">
                ● 12 Pending
              </span>

              <span className="text-red-600">
                ● 3 Overdue
              </span>
            </div>
          </CardContent>
        </Card>

      </div>

      {/* ================= KANBAN ================= */}
      <section className="space-y-6">
        <div
          className="
            flex
            items-center
            justify-between
          "
        >
          <h2
            className="
              text-2xl
              font-bold
              text-[hsl(330,45%,25%)]
            "
          >
            Kanban Board
          </h2>

          <Button>
            + Create Task
          </Button>
        </div>

        <KanbanBoard />
      </section>

      {/* ================= RECENT ACTIVITY ================= */}
      <Card>
        <CardHeader>
          <CardTitle
            className="
              text-[hsl(330,45%,25%)]
            "
          >
            Recent Activity
          </CardTitle>

          <CardDescription>
            Latest maintenance requests and updates
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="text-sm text-muted-foreground">
            Activity table goes here
          </div>
        </CardContent>
      </Card>

    </div>
  )
}
