"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPanel() {
  const { user, loading, error, signIn, signUp, logOut } = useAuth();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [submitting, setSubmitting] = useState<"login" | "signUp" | null>(null);
  const [failedForm, setFailedForm] = useState<"login" | "signUp" | null>(null);

  if (loading) {
    return <p className="py-10 text-center text-zinc-500">載入中…</p>;
  }

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col items-center gap-12 px-4 py-10">
      {user ? (
        <div className="flex flex-col items-center gap-3">
          <p>您已經使用 {user.email} 登入</p>
          <div className="flex gap-2">
            <Link
              href="/accounting"
              className="rounded-sm border border-zinc-300 bg-zinc-100 px-3 py-1 hover:bg-zinc-200"
            >
              立刻開始
            </Link>
            <button
              type="button"
              onClick={() => void logOut()}
              className="rounded-sm border border-zinc-300 bg-zinc-100 px-3 py-1 hover:bg-zinc-200"
            >
              登出
            </button>
          </div>
        </div>
      ) : (
        <form
          className="flex flex-col items-center gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitting("login");
            setFailedForm(null);
            void signIn(loginEmail.trim(), loginPassword).then((ok) => {
              setSubmitting(null);
              if (!ok) setFailedForm("login");
            });
          }}
        >
          <p className="mb-2">登入系統</p>
          <label className="flex items-center gap-3">
            <span className="w-10 text-right">電郵</span>
            <input
              type="email"
              value={loginEmail}
              onChange={(event) => setLoginEmail(event.target.value)}
              autoComplete="email"
              required
              aria-label="登入電郵"
              className="w-56 rounded-sm border border-zinc-400 px-2 py-1"
            />
          </label>
          <label className="flex items-center gap-3">
            <span className="w-10 text-right">密碼</span>
            <input
              type="password"
              value={loginPassword}
              onChange={(event) => setLoginPassword(event.target.value)}
              autoComplete="current-password"
              minLength={6}
              required
              aria-label="登入密碼"
              className="w-56 rounded-sm border border-zinc-400 px-2 py-1"
            />
          </label>
          {failedForm === "login" && error ? (
            <p className="text-sm text-[#7b2d26]">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting !== null}
            className="mt-1 rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-1 hover:bg-zinc-200 disabled:opacity-60"
          >
            {submitting === "login" ? "處理中…" : "登入"}
          </button>
        </form>
      )}

      <form
        className="flex flex-col items-center gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitting("signUp");
          setFailedForm(null);
          void signUp(signUpEmail.trim(), signUpPassword).then((ok) => {
            setSubmitting(null);
            if (!ok) {
              setFailedForm("signUp");
              return;
            }
            setSignUpEmail("");
            setSignUpPassword("");
          });
        }}
      >
        <p className="mb-2">註冊帳戶</p>
        <label className="flex items-center gap-3">
          <span className="w-10 text-right">電郵</span>
          <input
            type="email"
            value={signUpEmail}
            onChange={(event) => setSignUpEmail(event.target.value)}
            autoComplete="email"
            required
            aria-label="註冊電郵"
            className="w-56 rounded-sm border border-zinc-400 px-2 py-1"
          />
        </label>
        <label className="flex items-center gap-3">
          <span className="w-10 text-right">密碼</span>
          <input
            type="password"
            value={signUpPassword}
            onChange={(event) => setSignUpPassword(event.target.value)}
            autoComplete="new-password"
            minLength={6}
            required
            aria-label="註冊密碼"
            className="w-56 rounded-sm border border-zinc-400 px-2 py-1"
          />
        </label>
        {failedForm === "signUp" && error ? (
          <p className="text-sm text-[#7b2d26]">{error}</p>
        ) : null}
        <button
          type="submit"
          disabled={submitting !== null}
          className="mt-1 rounded-sm border border-zinc-300 bg-zinc-100 px-4 py-1 hover:bg-zinc-200 disabled:opacity-60"
        >
          {submitting === "signUp" ? "處理中…" : "註冊"}
        </button>
      </form>
    </div>
  );
}
