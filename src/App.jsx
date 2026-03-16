import { useState } from "react";
import { User, Stethoscope } from "lucide-react";
import PatientView from "./components/PatientView";
import DoctorView from "./components/DoctorView";

export default function App() {
  const [view, setView] = useState("patient");

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-gray-900 font-sans flex flex-col">
      {/* Crisp White Top Navigation */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-blue-600 text-white flex items-center justify-center">
            <Stethoscope size={18} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-gray-900">
            PulseLine
          </h1>
        </div>

        {/* Simple Tab Toggle */}
        <div className="flex bg-gray-100 p-1 rounded-md">
          <button
            onClick={() => setView("patient")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              view === "patient"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <User size={16} />
            Patient View
          </button>
          <button
            onClick={() => setView("doctor")}
            className={`flex items-center gap-2 px-4 py-1.5 rounded text-sm font-medium transition-colors ${
              view === "doctor"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-900"
            }`}
          >
            <Stethoscope size={16} />
            Doctor View
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden flex">
        {view === "patient" ? <PatientView /> : <DoctorView />}
      </main>
    </div>
  );
}
