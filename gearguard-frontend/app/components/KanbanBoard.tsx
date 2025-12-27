'use client'

import React from 'react'

/* =========================================================
   Types
========================================================= */
type KanbanColumn = {
  title: string
  tasks: string[]
}

/* =========================================================
   Kanban Board Component
========================================================= */
export default function KanbanBoard() {

  /* ===================== DATA ===================== */
  const columns: KanbanColumn[] = [
    {
      title: 'To Do',
      tasks: [
        'Inspect Conveyor Belt',
        'Lubrication Check',
      ],
    },
    {
      title: 'In Progress',
      tasks: [
        'Motor Alignment',
      ],
    },
    {
      title: 'Review',
      tasks: [
        'Safety Audit',
      ],
    },
    {
      title: 'Completed',
      tasks: [
        'Bearing Replacement',
      ],
    },
  ]

  /* ===================== UI ===================== */
  return (
    <div
      className="
        grid
        grid-cols-1
        md:grid-cols-4
        gap-8
      "
    >
      {columns.map((column, index) => (
        <div
          key={index}
          className="
            flex
            flex-col

            /* Card look */
            bg-white
            rounded-xl
            border
            border-[hsl(330,25%,80%)]

            /* Elevation */
            shadow-[0_4px_14px_rgba(120,60,100,0.15)]

            /* Spacing */
            p-5
          "
        >

          {/* ================= COLUMN HEADER ================= */}
          <div
            className="
              mb-4
              pb-2
              border-b
              border-[hsl(330,25%,85%)]
            "
          >
            <h3
              className="
                text-lg
                font-bold
                tracking-wide
                text-[hsl(330,35%,22%)]
              "
            >
              {column.title}
            </h3>
          </div>

          {/* ================= TASK LIST ================= */}
          <div className="space-y-4">
            {column.tasks.map((task, taskIndex) => (
              <div
                key={taskIndex}
                className="
                  /* Task Card */
                  bg-[hsl(330,25%,96%)]
                  border
                  border-[hsl(330,25%,82%)]
                  rounded-lg

                  /* Elevation */
                  shadow-[0_2px_6px_rgba(120,60,100,0.12)]

                  /* Spacing */
                  px-4
                  py-3

                  /* Typography */
                  text-base
                  font-medium
                  text-[hsl(330,30%,24%)]

                  /* Interaction */
                  transition
                  hover:shadow-[0_4px_10px_rgba(120,60,100,0.18)]
                  hover:bg-[hsl(330,25%,94%)]
                "
              >
                {task}
              </div>
            ))}
          </div>

        </div>
      ))}
    </div>
  )
}
