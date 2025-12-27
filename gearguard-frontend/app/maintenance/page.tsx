"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRequests, MaintenanceRequest } from "@/lib/requests";
import { format } from "date-fns";
import DashboardLayout from "@/components/DashboardLayout";
import { Plus } from "lucide-react";

const STAGES = [
  { id: "new", label: "New Request", color: "bg-blue-500" },
  { id: "in_progress", label: "In Progress", color: "bg-yellow-500" },
  { id: "repaired", label: "Repaired", color: "bg-green-500" },
  { id: "scrap", label: "Scrap", color: "bg-gray-500" },
];

export default function MaintenancePage() {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getRequests()
      .then(setRequests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <DashboardLayout>
      <div className="h-full flex flex-col space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Maintenance Requests</h1>
            <p className="text-gray-500">Kanban Overview</p>
          </div>
          <Link
            href="/maintenance/create"
            className="bg-[hsl(270,70%,60%)] text-white px-4 py-2 rounded-lg hover:bg-[hsl(270,70%,50%)] transition font-medium shadow-sm flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> New Request
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg border border-red-100">
            Error: {error}
          </div>
        )}

        {/* Kanban Board */}
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading board...</div>
        ) : (
          <div className="flex-1 overflow-x-auto min-h-[500px]">
            <div className="flex gap-6 h-full min-w-[1000px]">
              {STAGES.map((stage) => {
                const stageRequests = requests.filter((r) => r.stage === stage.id);

                return (
                  <div key={stage.id} className="flex-1 flex flex-col bg-gray-50/50 rounded-xl border border-gray-200 h-full">
                    {/* Column Header */}
                    <div className="p-4 border-b bg-white rounded-t-xl flex items-center justify-between sticky top-0">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="font-semibold text-gray-700">{stage.label}</span>
                      </div>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600 font-medium">
                        {stageRequests.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="p-3 space-y-3 overflow-y-auto flex-1">
                      {stageRequests.map((req) => (
                        <div
                          key={req.id}
                          className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition cursor-pointer group"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-xs font-mono text-[hsl(270,70%,60%)] bg-[hsl(270,70%,96%)] px-1.5 py-0.5 rounded">
                              {req.request_number}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider ${req.priority === '2' ? 'bg-red-50 text-red-600' :
                                req.priority === '1' ? 'bg-amber-50 text-amber-600' :
                                  'bg-blue-50 text-blue-600'
                              }`}>
                              {req.priority === '2' ? 'High' : req.priority === '1' ? 'Med' : 'Low'}
                            </span>
                          </div>

                          <h3 className="font-medium text-gray-900 mb-1 group-hover:text-[hsl(270,70%,60%)] transition-colors">
                            {req.subject}
                          </h3>

                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <span className="capitalize">{req.maintenance_type}</span>
                            <span>•</span>
                            <span>{req.created_by || "Unassigned"}</span>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t mt-3">
                            <div className="text-xs text-gray-400">
                              {req.created_at ? format(new Date(req.created_at), "MMM d") : ""}
                            </div>
                            {/* Placeholder for assignee avatar */}
                            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                              MA
                            </div>
                          </div>
                        </div>
                      ))}
                      {stageRequests.length === 0 && (
                        <div className="text-center py-8 text-xs text-gray-400 border-2 border-dashed border-gray-100 rounded-lg">
                          No requests
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
