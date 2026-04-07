import { Sidebar } from "@/components/manage/sidebar";
import { Header } from "@/components/manage/header";

export default function ManageLayout({ children }: { children: React.ReactNode }) {
  return (
    // Page background: #F8F7FA per spec
    <div className="min-h-screen" style={{ background: "#F8F7FA" }}>
      <Sidebar />
      <Header />
      {/* pt-16 = 64px header height per spec */}
      <main className="pt-16 lg:pl-60 flex flex-col min-h-screen">
        {children}
      </main>
    </div>
  );
}
