"use client";
import { useSummary } from "../hooks/useSummary";
import { useState } from "react";

export default function NewsSummary() {
  const [selectedDays, setSelectedDays] = useState(1);
  const { summary, loading, cached, error } = useSummary(selectedDays);

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">Top News Summary</h2>
        <select
          value={selectedDays}
          onChange={(e) => setSelectedDays(Number(e.target.value))}
          className="border px-2 py-1 rounded text-sm"
        >
          <option value={1}>Past 1 Day</option>
          <option value={3}>Past 3 Days</option>
          <option value={7}>Past 7 Days</option>
        </select>
      </div>

      <div className="bg-gray-100 p-4 rounded-md text-sm">
        {loading ? (
          <p>Loading summary...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <p>{summary}</p>
            {cached && <p className="text-gray-500 text-xs mt-2">🗂️ Cached summary</p>}
          </>
        )}
      </div>
    </div>
  );
}