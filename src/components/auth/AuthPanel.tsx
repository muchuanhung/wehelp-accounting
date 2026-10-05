"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPanel() {
  const { user, loading, error, signIn, signUp, logOut } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signUp">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (loading) {
    return <p className="mt-12 text-center text-zinc-500">載入中…</p>;
  }

  if (user) {
    return (
      <div className="mt-12 flex flex-col items-center gap-3 px-4">
        <p className="text-zinc-700">{user.email}</p>
        <Link
          href="/accounting"
          className="rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 hover:bg-zinc-200"
        >
          點此開始
        </Link>
        <button
          type="button"
          onClick={() => void logOut()}
          className="rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 hover:bg-zinc-200"
        >
          登出
        </button>
      </div>
    );
  }

  return (
    <form
      className="mx-auto mt-12 flex w-full max-w-sm flex-col gap-3 px-4"
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitting(true);
        const action = mode === "signUp" ? signUp : signIn;
        void action(email.trim(), password).then((ok) => {
          setSubmitting(false);
          if (ok) router.push("/accounting");
        });
      }}
    >
      <div className="flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`rounded-sm border border-zinc-300 px-4 py-2 hover:bg-zinc-200 ${
            mode === "login" ? "bg-zinc-200" : "bg-zinc-100"
          }`}
        >
          登入
        </button>
        <button
          type="button"
          onClick={() => setMode("signUp")}
          className={`rounded-sm border border-zinc-300 px-4 py-2 hover:bg-zinc-200 ${
            mode === "signUp" ? "bg-zinc-200" : "bg-zinc-100"
          }`}
        >
          註冊
        </button>
      </div>
      <input
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="Email"
        autoComplete="email"
        required
        aria-label="Email"
        className="rounded border border-zinc-400 px-3 py-2"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="密碼"
        autoComplete={mode === "signUp" ? "new-password" : "current-password"}
        minLength={6}
        required
        aria-label="密碼"
        className="rounded border border-zinc-400 px-3 py-2"
      />
      {error ? <p className="text-center text-sm text-[#7b2d26]">{error}</p> : null}
      <button
        type="submit"
        disabled={submitting}
        className="rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-2 hover:bg-zinc-200 disabled:opacity-60"
      >
        {submitting ? "處理中…" : mode === "signUp" ? "建立帳號" : "登入"}
      </button>
    </form>
  );
}
