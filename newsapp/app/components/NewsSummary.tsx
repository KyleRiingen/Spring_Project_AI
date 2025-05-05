"use client";
import { useSummary } from "../hooks/useSummary";
import { useState } from "react";

export default function NewsSummary() {
  const [selectedDays, setSelectedDays] = useState(1);
  const { summary, loading, cached, error } = useSummary(selectedDays);

  return (
    <div className="bg-[#F5F6F8] p-6 rounded-xl border border-[#D0D3D8] mb-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
        <h2 className="text-xl font-bold text-[#1F2A44]">📰 Top News Summary</h2>
        <select
          value={selectedDays}
          onChange={(e) => setSelectedDays(Number(e.target.value))}
          className="border border-[#D0D3D8] px-3 py-2 rounded-md text-sm mt-2 sm:mt-0"
        >
          <option value={1}>Past 1 Day</option>
          <option value={3}>Past 3 Days</option>
          <option value={7}>Past 7 Days</option>
        </select>
      </div>

      <div className="text-sm text-[#1F2A44]">
        {loading ? (
          <p>Loading summary...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : (
          <>
            <p>{summary}</p>
            {cached && (
              <p className="text-gray-500 text-xs mt-2">🗂️ Cached summary</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
