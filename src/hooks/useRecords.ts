"use client";

import { useMemo, useState } from "react";
import type { AccountRecord } from "@/types/record";

export function useRecords() {
  const [records, setRecords] = useState<AccountRecord[]>([]);

  const addRecord = (record: Omit<AccountRecord, "id">) => {
    setRecords((prev) => [{ ...record, id: crypto.randomUUID() }, ...prev]);
  };

  const removeRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const total = useMemo(
    () =>
      records.reduce(
        (sum, record) =>
          record.type === "income" ? sum + record.amount : sum - record.amount,
        0,
      ),
    [records],
  );

  return { records, addRecord, removeRecord, total };
}
