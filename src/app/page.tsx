import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-6 px-4">
      <h1 className="text-3xl font-bold">歡迎使用記帳小工具</h1>
      <Link
        href="/accounting"
        className="rounded bg-zinc-900 px-6 py-3 text-white hover:bg-zinc-700"
      >
        開始記帳
      </Link>
    </main>
  );
}
