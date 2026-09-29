import { useState } from "react";

export type RecordType = "income" | "expense";

export interface AccountRecord {
  id: string;
  type: RecordType;
  amount: number;
  description: string;
}

export function useRecords() {
  const [records, setRecords] = useState<AccountRecord[]>([]);

  const addRecord = (record: Omit<AccountRecord, "id">) => {
    setRecords((prev) => [{ ...record, id: crypto.randomUUID() }, ...prev]);
  };

  const removeRecord = (id: string) => {
    setRecords((prev) => prev.filter((record) => record.id !== id));
  };

  const total = records.reduce(
    (sum, record) =>
      record.type === "income" ? sum + record.amount : sum - record.amount,
    0,
  );

  return { records, addRecord, removeRecord, total };
}
