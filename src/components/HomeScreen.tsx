
import { ShakeDetector } from "@/components/ShakeDetector";
import { Beer } from "lucide-react";

export const HomeScreen = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <header className="p-4 flex items-center justify-center">
        <div className="flex items-center gap-2">
          <Beer className="w-6 h-6 text-beer-amber" />
          <h1 className="text-xl font-semibold">Shake-n-Brew</h1>
        </div>
      </header>
      
      <main className="container px-4 pb-12">
        <ShakeDetector />
      </main>
      
      <footer className="py-6 px-4 text-center text-sm text-gray-500">
        <p>© {new Date().getFullYear()} Shake-n-Brew. All rights reserved.</p>
      </footer>
    </div>
  );
};
