"use client";

import { useEffect, useState } from "react";

import { getEquipment, Equipment } from "@/lib/equipment";
import { getCategories, Category } from "@/lib/categories";
import { createRequest } from "@/lib/requests";

export default function CreateRequestPage() {
  // -----------------------------
  // STATE
  // -----------------------------
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [equipmentId, setEquipmentId] = useState<number | undefined>();
  const [categoryId, setCategoryId] = useState<number | undefined>();

  const [subject, setSubject] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // -----------------------------
  // LOAD DATA FROM BACKEND
  // -----------------------------
  useEffect(() => {
    getEquipment()
      .then(setEquipment)
      .catch(err => setError(err.message));

    getCategories()
      .then(setCategories)
      .catch(err => setError(err.message));
  }, []);

  // -----------------------------
  // SUBMIT HANDLER
  // -----------------------------
  async function submit() {
    setError("");

    if (!subject || !equipmentId || !categoryId) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await createRequest({
        subject,
        equipment_id: equipmentId,
        category_id: categoryId,
        maintenance_type: "corrective",
      });

      alert("Request created successfully");

      // Reset form
      setSubject("");
      setEquipmentId(undefined);
      setCategoryId(undefined);
    } catch (err: any) {
      setError(err.message || "Failed to create request");
    } finally {
      setLoading(false);
    }
  }

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="max-w-xl p-6">
      <h1 className="text-xl font-bold mb-4">
        Create Maintenance Request
      </h1>

      {error && (
        <p className="text-red-500 mb-3">{error}</p>
      )}

      {/* SUBJECT */}
      <input
        className="border p-2 w-full mb-3"
        placeholder="Issue description"
        value={subject}
        onChange={e => setSubject(e.target.value)}
      />

      {/* EQUIPMENT */}
      <select
        className="border p-2 w-full mb-3"
        value={equipmentId ?? ""}
        onChange={e => setEquipmentId(Number(e.target.value))}
      >
        <option value="">Select Equipment</option>
        {equipment.map(eq => (
          <option key={eq.id} value={eq.id}>
            {eq.name}
          </option>
        ))}
      </select>

      {/* CATEGORY */}
      <select
        className="border p-2 w-full mb-3"
        value={categoryId ?? ""}
        onChange={e => setCategoryId(Number(e.target.value))}
      >
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      {/* SUBMIT */}
      <button
        onClick={submit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? "Creating..." : "Create Request"}
      </button>
    </div>
  );
}
