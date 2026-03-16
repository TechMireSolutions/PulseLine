import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  FileText,
  MessageSquare,
  LayoutDashboard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export default function PatientView() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [selectedDate, setSelectedDate] = useState(14);
  const [showSlotsMsg, setShowSlotsMsg] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleCheckIn = () => {
    setIsCheckedIn(true);
  };

  const handleBookAppointment = () => {
    setShowSlotsMsg(true);
    setTimeout(() => setShowSlotsMsg(false), 3000);
  };

  return (
    <div className="flex w-full h-full bg-[#F9FAFB]">
      {/* Standard Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 py-6 px-4 flex flex-col gap-6 flex-shrink-0">
        <div className="px-3">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
            Patient
          </p>
          <p className="font-bold text-gray-900">Sarah Jenkins</p>
        </div>

        <nav className="flex flex-col gap-1">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`flex items-center w-full gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === "dashboard"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <LayoutDashboard
              size={18}
              className={
                activeTab === "dashboard" ? "text-blue-600" : "text-gray-400"
              }
            />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("records")}
            className={`flex items-center w-full gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === "records"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <FileText
              size={18}
              className={
                activeTab === "records" ? "text-blue-600" : "text-gray-400"
              }
            />
            My Records
          </button>
          <button
            onClick={() => setActiveTab("messages")}
            className={`flex items-center w-full gap-3 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
              activeTab === "messages"
                ? "bg-blue-50 text-blue-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <MessageSquare
              size={18}
              className={
                activeTab === "messages" ? "text-blue-600" : "text-gray-400"
              }
            />
            Messages
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">
              2
            </span>
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {activeTab === "dashboard" && (
          <div className="p-8 max-w-6xl mx-auto">
            <header className="mb-8 border-b border-gray-200 pb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Dashboard Overview
              </h2>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Next Visit Card - Functional Style */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50 flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900">
                      Upcoming Visit
                    </h3>
                    <span className="text-sm font-medium text-gray-600 flex items-center gap-1.5">
                      <Clock size={16} className="text-gray-400" /> Today, 2:30
                      PM
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xl border border-blue-200">
                          EC
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 font-medium mb-0.5">
                            Primary Care Physician
                          </p>
                          <h4 className="text-lg font-bold text-gray-900">
                            Dr. Emily Chen
                          </h4>
                          <p className="text-sm text-gray-600 mt-1 flex items-center gap-1.5">
                            <MapPin size={14} className="text-gray-400" /> Room
                            302, Main Clinic
                          </p>
                        </div>
                      </div>

                      <div className="w-full sm:w-auto">
                        <button
                          onClick={handleCheckIn}
                          disabled={isCheckedIn}
                          className={`w-full sm:w-auto px-6 py-2.5 rounded-md font-medium text-sm transition-colors flex items-center justify-center gap-2 ${
                            isCheckedIn
                              ? "bg-green-50 text-green-700 border border-green-200 cursor-default"
                              : "bg-blue-600 hover:bg-blue-700 text-white border border-transparent shadow-sm"
                          }`}
                        >
                          {isCheckedIn ? (
                            <>
                              <CheckCircle2 size={18} /> Checked In
                            </>
                          ) : (
                            "Complete Check-in"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Functional Appointment Widget */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50/50">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      <Calendar size={18} className="text-gray-500" /> Schedule
                    </h3>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-4">
                      <button className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                        <ChevronLeft size={16} />
                      </button>
                      <span className="font-medium text-sm text-gray-900">
                        March 2026
                      </span>
                      <button className="p-1 rounded text-gray-400 hover:text-gray-600 hover:bg-gray-100">
                        <ChevronRight size={16} />
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-y-2 mb-2 text-xs text-gray-500 font-medium text-center">
                      <div>Su</div>
                      <div>Mo</div>
                      <div>Tu</div>
                      <div>We</div>
                      <div>Th</div>
                      <div>Fr</div>
                      <div>Sa</div>
                    </div>
                    <div className="grid grid-cols-7 gap-y-1 gap-x-1 text-sm text-center mb-6">
                      <div className="py-1.5"></div>
                      <div className="py-1.5"></div>
                      {[...Array(28)].map((_, i) => {
                        const date = i + 1;
                        const isSelected = selectedDate === date;
                        const isPast = date < 12;
                        return (
                          <div
                            key={i}
                            onClick={() => !isPast && setSelectedDate(date)}
                            className={`py-1.5 rounded cursor-pointer ${
                              isSelected
                                ? "bg-blue-600 text-white font-medium"
                                : isPast
                                  ? "text-gray-300 cursor-not-allowed"
                                  : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {date}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-auto relative">
                      {showSlotsMsg && (
                        <div className="absolute bottom-full mb-2 left-0 right-0 bg-gray-800 text-white text-xs py-2 px-3 rounded shadow-lg text-center">
                          Searching slots for March {selectedDate}...
                        </div>
                      )}
                      <button
                        onClick={handleBookAppointment}
                        disabled={showSlotsMsg}
                        className="w-full py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium text-sm rounded-md transition-colors shadow-sm"
                      >
                        Find Availability
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Basic Empty States */}
        {activeTab === "records" && (
          <div className="p-8 max-w-6xl mx-auto h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-4 border border-gray-200">
              <FileText size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Medical Records
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
              Your laboratory results, clinical notes, and active prescriptions
              will populate here after they have been processed by the care
              team.
            </p>
            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium shadow-sm transition-colors">
              Request Document Upload
            </button>
          </div>
        )}

        {activeTab === "messages" && (
          <div className="p-8 max-w-6xl mx-auto h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 mb-4 border border-gray-200">
              <MessageSquare size={32} />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Secure Inbox
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6 text-sm">
              Direct, secure communication channel with your clinical providers
              and administrative staff.
            </p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium shadow-sm transition-colors border border-transparent">
              Compose Message
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
