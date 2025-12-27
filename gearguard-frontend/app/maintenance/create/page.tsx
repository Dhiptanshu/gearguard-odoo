"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getEquipment, Equipment } from "@/lib/equipment";
import { getCategories, Category } from "@/lib/categories";
import { getTeams, Team } from "@/lib/teams";
import { createRequest } from "@/lib/requests";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/components/DashboardLayout";
import {
    Check,
    Circle,
    Sparkles,
    Calendar as CalendarIcon,
    Clock,
    Star,
    Wrench,
    FileText,
    ArrowLeft
} from "lucide-react";
import { cn } from "@/lib/utils";

const stages = [
    { name: "New Request", value: "new", icon: FileText },
    { name: "In Progress", value: "in_progress", icon: Wrench },
    { name: "Repaired", value: "repaired", icon: Check },
    { name: "Scrap", value: "scrap", icon: Circle },
];

export default function CreateMaintenanceRequestPage() {
    const router = useRouter();

    // Data State
    const [equipmentList, setEquipmentList] = useState<Equipment[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form State
    const [title, setTitle] = useState("");
    const [selectedEquipmentId, setSelectedEquipmentId] = useState<string>("");
    const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");
    const [selectedTeamId, setSelectedTeamId] = useState<string>("");
    const [currentStage, setCurrentStage] = useState(0); // Default to 'New Request'
    const [maintenanceType, setMaintenanceType] = useState<"corrective" | "preventive">("corrective");
    const [priority, setPriority] = useState(1); // 0=Low, 1=Med, 2=High
    const [scheduledDate, setScheduledDate] = useState("");
    const [duration, setDuration] = useState(2.0);
    const [notes, setNotes] = useState("");

    // Load Dependencies
    useEffect(() => {
        Promise.all([getEquipment(), getCategories(), getTeams()])
            .then(([eq, cat, tms]) => {
                setEquipmentList(eq);
                setCategories(cat);
                setTeams(tms);
            })
            .catch((err) => setError("Failed to load data: " + err.message));
    }, []);

    // Derived State
    const selectedEquipment = equipmentList.find(e => e.id.toString() === selectedEquipmentId);
    // Auto-fill category if needed (logic placeholder)
    const categoryName = selectedEquipment ? "Auto-detected" : "Select Equipment first";

    const handleSubmit = async () => {
        if (!title || !selectedEquipmentId || !selectedCategoryId) {
            setError("Title, Equipment, and Category are required.");
            return;
        }

        try {
            setLoading(true);
            await createRequest({
                title,
                equipment_id: Number(selectedEquipmentId),
                category_id: Number(selectedCategoryId),
                maintenance_type: maintenanceType,
                assigned_team_id: selectedTeamId ? Number(selectedTeamId) : undefined,
                scheduled_date: scheduledDate || undefined,
                estimated_duration_hours: duration,
                priority: priority.toString()
            });
            router.push("/maintenance");
        } catch (err: any) {
            setError(err.message || "Failed to create request");
            setLoading(false);
        }
    };

    return (
        <DashboardLayout>
            <div className="mx-auto max-w-6xl space-y-6">

                {/* Top Actions */}
                <div className="flex items-center justify-between">
                    <Link href="/maintenance" className="flex items-center text-gray-500 hover:text-gray-900 transition">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                    {error && <span className="text-red-600 font-medium">{error}</span>}
                </div>

                {/* Header with Input */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                            <Input
                                placeholder="e.g. Broken Conveyor Belt..."
                                className="h-12 text-2xl font-bold border-none bg-transparent px-0 placeholder:text-muted-foreground/50 focus-visible:ring-0 shadow-none"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={() => router.push("/maintenance")}>
                                Discard
                            </Button>
                            <Button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="bg-[hsl(270,70%,60%)] hover:bg-[hsl(270,70%,50%)] text-white"
                            >
                                {loading ? "Creating..." : "Create Request"}
                            </Button>
                        </div>
                    </div>

                    {/* Pipeline Status Bar (Visual Only for Create) */}
                    <Card className="overflow-hidden border-gray-200 shadow-sm">
                        <div className="flex items-center">
                            {stages.map((stage, index) => {
                                const Icon = stage.icon;
                                const isActive = index === currentStage;
                                const isCompleted = index < currentStage;

                                return (
                                    <React.Fragment key={stage.value}>
                                        <div
                                            className={cn(
                                                "flex flex-1 items-center gap-3 px-6 py-4",
                                                isActive && "bg-blue-50/50"
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    "flex h-8 w-8 items-center justify-center rounded-full border-2",
                                                    isActive
                                                        ? "border-blue-500 bg-blue-500 text-white"
                                                        : isCompleted
                                                            ? "border-green-500 bg-green-500 text-white"
                                                            : "border-gray-200 text-gray-400"
                                                )}
                                            >
                                                {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                                            </div>
                                            <span
                                                className={cn(
                                                    "text-sm font-medium",
                                                    isActive ? "text-blue-600" : "text-gray-500"
                                                )}
                                            >
                                                {stage.name}
                                            </span>
                                        </div>
                                        {index < stages.length - 1 && (
                                            <div className="h-[1px] w-8 bg-gray-200" />
                                        )}
                                    </React.Fragment>
                                );
                            })}
                        </div>
                    </Card>
                </div>

                {/* Main Content Grid */}
                <div className="grid gap-6 md:grid-cols-2">

                    {/* LEFT COLUMN */}
                    <div className="space-y-6">
                        <Card className="shadow-sm border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg text-gray-800">Request Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">

                                {/* Equipment */}
                                <div className="space-y-2">
                                    <Label>Equipment</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        value={selectedEquipmentId}
                                        onChange={(e) => setSelectedEquipmentId(e.target.value)}
                                    >
                                        <option value="">Select Equipment...</option>
                                        {equipmentList.map((eq) => (
                                            <option key={eq.id} value={eq.id}>
                                                {eq.name} {eq.serial_number ? `(${eq.serial_number})` : ""}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Category */}
                                <div className="space-y-2">
                                    <Label>Category</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        value={selectedCategoryId}
                                        onChange={(e) => setSelectedCategoryId(e.target.value)}
                                    >
                                        <option value="">Select Category...</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>
                                                {cat.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Type */}
                                <div className="space-y-2">
                                    <Label>Maintenance Type</Label>
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => setMaintenanceType("corrective")}
                                            className={cn(
                                                "flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all",
                                                maintenanceType === "corrective"
                                                    ? "border-red-500 bg-red-50 text-red-600"
                                                    : "border-gray-200 hover:bg-gray-50"
                                            )}
                                        >
                                            <Wrench className="h-4 w-4" />
                                            <span className="font-medium">Corrective</span>
                                        </button>
                                        <button
                                            onClick={() => setMaintenanceType("preventive")}
                                            className={cn(
                                                "flex flex-1 items-center justify-center gap-2 rounded-lg border-2 p-3 transition-all",
                                                maintenanceType === "preventive"
                                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                                    : "border-gray-200 hover:bg-gray-50"
                                            )}
                                        >
                                            <Sparkles className="h-4 w-4" />
                                            <span className="font-medium">Preventive</span>
                                        </button>
                                    </div>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT COLUMN */}
                    <div className="space-y-6">
                        <Card className="shadow-sm border-gray-200">
                            <CardHeader>
                                <CardTitle className="text-lg text-gray-800">Scheduling & Priority</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {/* Team */}
                                <div className="space-y-2">
                                    <Label>Assigned Team</Label>
                                    <select
                                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                        value={selectedTeamId}
                                        onChange={(e) => setSelectedTeamId(e.target.value)}
                                    >
                                        <option value="">Select Team...</option>
                                        {teams.map((t) => (
                                            <option key={t.id} value={t.id}>
                                                {t.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Scheduled Date</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="datetime-local"
                                            className="pl-10"
                                            value={scheduledDate}
                                            onChange={(e) => setScheduledDate(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Duration */}
                                <div className="space-y-2">
                                    <Label>Est. Duration (Hours)</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                                        <Input
                                            type="number"
                                            className="pl-10"
                                            min="0"
                                            step="0.5"
                                            value={duration}
                                            onChange={(e) => setDuration(parseFloat(e.target.value))}
                                        />
                                    </div>
                                </div>

                                {/* Priority */}
                                <div className="space-y-2">
                                    <Label>Priority</Label>
                                    <div className="flex gap-2">
                                        {[0, 1, 2].map((i) => (
                                            <button
                                                key={i}
                                                onClick={() => setPriority(i)}
                                                className="group rounded-lg border-2 border-gray-200 p-4 transition-all hover:border-amber-400"
                                            >
                                                <Star
                                                    className={cn(
                                                        "h-5 w-5 transition-colors",
                                                        i <= priority ? "fill-amber-400 text-amber-400" : "text-gray-300 group-hover:text-amber-300"
                                                    )}
                                                />
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {priority === 0 ? "Low" : priority === 1 ? "Medium" : "High"} Priority
                                    </p>
                                </div>

                            </CardContent>
                        </Card>
                    </div>

                </div>

                {/* Tabbed Notes Section */}
                <Card className="shadow-sm border-gray-200">
                    <Tabs defaultValue="notes" className="w-full">
                        <CardHeader className="pb-3 border-b bg-gray-50/50 rounded-t-xl">
                            <TabsList className="bg-transparent p-0">
                                <TabsTrigger value="notes" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    <FileText className="w-4 h-4 mr-2" /> Notes
                                </TabsTrigger>
                                <TabsTrigger value="instructions" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                                    <Wrench className="w-4 h-4 mr-2" /> Instructions
                                </TabsTrigger>
                            </TabsList>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <TabsContent value="notes" className="mt-0">
                                <Textarea
                                    placeholder="Add internal notes..."
                                    className="min-h-[120px]"
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                />
                            </TabsContent>
                            <TabsContent value="instructions" className="mt-0">
                                <div className="text-sm text-gray-500 italic">No instructions defined for this category.</div>
                            </TabsContent>
                        </CardContent>
                    </Tabs>
                </Card>

            </div>
        </DashboardLayout>
    );
}
