import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { firebaseErrorMessage, getDb } from "@/lib/firebase";

export type RecordType = "income" | "expense";

export interface AccountRecord {
  id: string;
  type: RecordType;
  amount: number;
  description: string;
}

function recordsCollection(uid: string) {
  return collection(getDb(), "wehelpAccounting", uid, "records");
}

export function useRecords(uid: string | null) {
  const [records, setRecords] = useState<AccountRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedUid, setLoadedUid] = useState<string | null>(null);

  if (uid !== loadedUid) {
    setLoadedUid(uid);
    setRecords([]);
    setLoading(Boolean(uid));
    setError(null);
  }

  useEffect(() => {
    if (!uid) return;

    let cancelled = false;

    getDocs(query(recordsCollection(uid), orderBy("createdAt", "desc")))
      .then((snapshot) => {
        if (cancelled) return;
        setRecords(
          snapshot.docs.map((item) => {
            const data = item.data();
            return {
              id: item.id,
              type: data.type === "expense" ? "expense" : "income",
              amount: Number(data.amount),
              description: String(data.description ?? ""),
            };
          }),
        );
      })
      .catch((caught) => {
        if (cancelled) return;
        setError(firebaseErrorMessage(caught, "讀取紀錄失敗，請稍後再試。"));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [uid]);

  const addRecord = async (record: Omit<AccountRecord, "id">) => {
    if (!uid) {
      setError("請先登入。");
      return false;
    }

    setError(null);
    try {
      const ref = await addDoc(recordsCollection(uid), {
        type: record.type,
        amount: record.amount,
        description: record.description,
        createdAt: serverTimestamp(),
      });
      setRecords((prev) => [{ ...record, id: ref.id }, ...prev]);
      return true;
    } catch (caught) {
      setError(firebaseErrorMessage(caught, "新增失敗，請稍後再試。"));
      return false;
    }
  };

  const removeRecord = async (id: string) => {
    if (!uid) {
      setError("請先登入。");
      return;
    }

    setError(null);
    try {
      await deleteDoc(doc(recordsCollection(uid), id));
      setRecords((prev) => prev.filter((record) => record.id !== id));
    } catch (caught) {
      setError(firebaseErrorMessage(caught, "刪除失敗，請稍後再試。"));
    }
  };

  const total = records.reduce(
    (sum, record) =>
      record.type === "income" ? sum + record.amount : sum - record.amount,
    0,
  );

  return { records, loading, error, addRecord, removeRecord, total };
}
