import AuthPanel from "@/components/auth/AuthPanel";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <header className="bg-[#263445] px-4 py-10 text-center sm:py-14">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">React 練習專案</h1>
      </header>
      <section className="flex h-64 items-center justify-center bg-[#d0dcec] px-4 sm:h-80">
        <p className="text-center text-2xl text-zinc-800 sm:text-3xl">歡迎光臨我的頁面</p>
      </section>
      <AuthPanel />
    </main>
  );
}
