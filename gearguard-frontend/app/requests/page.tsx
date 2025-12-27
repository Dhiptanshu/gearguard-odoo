"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRequests, MaintenanceRequest } from "@/lib/requests";
import { format } from "date-fns";

export default function RequestsPage() {
    const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getRequests()
            .then(setRequests)
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <div className="p-6">Loading requests...</div>;
    if (error) return <div className="p-6 text-red-500">Error: {error}</div>;

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Maintenance Requests</h1>
                <Link
                    href="/requests/create"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                    New Request
                </Link>
            </div>

            <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-100 border-b">
                        <tr>
                            <th className="p-3 font-medium">Number</th>
                            <th className="p-3 font-medium">Subject</th>
                            <th className="p-3 font-medium">Type</th>
                            <th className="p-3 font-medium">Stage</th>
                            <th className="p-3 font-medium">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-4 text-center text-gray-500">
                                    No requests found.
                                </td>
                            </tr>
                        ) : (
                            requests.map((req) => (
                                <tr key={req.id} className="border-b last:border-0 hover:bg-gray-50">
                                    <td className="p-3 font-mono text-gray-600">
                                        {req.request_number}
                                    </td>
                                    <td className="p-3 font-medium">{req.title}</td>
                                    <td className="p-3 capitalize">{req.maintenance_type}</td>
                                    <td className="p-3">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${req.stage === "new"
                                                ? "bg-blue-100 text-blue-700"
                                                : req.stage === "in_progress"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : req.stage === "repaired"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-gray-100 text-gray-700"
                                                }`}
                                        >
                                            {req.stage.replace("_", " ")}
                                        </span>
                                    </td>
                                    <td className="p-3 text-gray-500">
                                        {req.created_at
                                            ? format(new Date(req.created_at), "MMM d, yyyy")
                                            : "-"}
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
