"use client"

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";
import { Select } from "@/components/ui/select";

interface SortProps {
  sortByOptions: { label: string; value: 'asc' | 'desc' }[];
}

const Sort: React.FC<SortProps> = ({ sortByOptions }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState<'asc' | 'desc'>('asc');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSortBy = e.target.value as 'asc' | 'desc';
    setSortBy(newSortBy);

    const currentParams = qs.parse(searchParams.toString());
    const newParams = { ...currentParams, sortBy: newSortBy };
    const newQueryString = qs.stringify(newParams);

    router.push(`${window.location.pathname}?${newQueryString}`);
  };

  return (
    <div>
      <select value={sortBy} onChange={handleSortChange}>
        {sortByOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sort;
