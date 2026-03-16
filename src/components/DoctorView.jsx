import React, { useState } from 'react';
import { 
  Users, 
  FileText, 
  Search, 
  X, 
  User,
  Clock,
  CheckCircle2,
  CalendarDays,
  MoreVertical
} from 'lucide-react';

const INITIAL_QUEUE_DATA = [
  { id: '4091', name: 'Jenkins, Sarah', time: '09:00 AM', type: 'Annual Check-up', status: 'In Progress' },
  { id: '4092', name: 'Chang, Michael', time: '09:30 AM', type: 'Consultation', status: 'Waiting' },
  { id: '4093', name: 'Watson, Emma', time: '10:00 AM', type: 'Follow-up', status: 'Waiting' },
  { id: '4094', name: 'Rodriguez, James', time: '10:30 AM', type: 'Lab Results', status: 'Scheduled' },
  { id: '4095', name: 'Brown, Olivia', time: '11:00 AM', type: 'Check-up', status: 'Scheduled' },
];

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'In Progress':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Waiting':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Scheduled':
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export default function DoctorView() {
  const [patients, setPatients] = useState(INITIAL_QUEUE_DATA);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.id.includes(searchQuery)
  );

  const totalQueue = patients.length;
  const waitingCount = patients.filter(p => p.status === 'Waiting').length;
  const readyLabs = 5; 

  const updatePatientStatus = (id, newStatus) => {
    setPatients(patients.map(p => 
      p.id === id ? { ...p, status: newStatus } : p
    ));
    setSelectedPatient(prev => ({ ...prev, status: newStatus }));
  };

  return (
    <div className="flex-1 overflow-y-auto w-full bg-[#F9FAFB]">
      <div className="p-8 max-w-7xl mx-auto space-y-6">
        
        {/* Standard Utility Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-gray-200 pb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Dr. Emily Chen</h2>
            <p className="text-sm text-gray-500 mt-1">Provider ID: 884-219 | Department: Internal Medicine</p>
          </div>
          <div className="text-sm font-medium text-gray-600 bg-white px-3 py-1.5 rounded-md border border-gray-200 mt-4 sm:mt-0">
            March 12, 2026
          </div>
        </div>

        {/* Functional KPI Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center shadow-sm">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-md border border-blue-100 mr-4">
              <Users size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Daily Roster</p>
              <p className="text-2xl font-bold text-gray-900">{totalQueue}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center shadow-sm">
            <div className="p-3 bg-yellow-50 text-yellow-600 rounded-md border border-yellow-100 mr-4">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Currently Waiting</p>
              <p className="text-2xl font-bold text-gray-900">{waitingCount}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg p-5 border border-gray-200 flex items-center shadow-sm">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-md border border-indigo-100 mr-4">
              <FileText size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Lab Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{readyLabs}</p>
            </div>
          </div>
        </div>

        {/* Standard Data Table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="px-5 py-4 border-b border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/50">
            <h3 className="text-lg font-bold text-gray-900">Appointments Schedule</h3>
            <div className="relative w-full sm:w-72">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Find patient (Name or ID)" 
                className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                />
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse whitespace-nowrap">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs font-semibold uppercase tracking-wider border-b border-gray-200">
                  <th className="px-5 py-3">MRN / Patient Name</th>
                  <th className="px-5 py-3">Time</th>
                  <th className="px-5 py-3">Encounter Type</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredPatients.length > 0 ? (
                  filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-blue-50/30">
                      <td className="px-5 py-3">
                        <div className="font-medium text-gray-900 text-sm">{patient.name}</div>
                        <div className="text-xs text-gray-500 mt-0.5 font-mono">{patient.id}</div>
                      </td>
                      <td className="px-5 py-3 text-sm text-gray-700">{patient.time}</td>
                      <td className="px-5 py-3 text-sm text-gray-700">{patient.type}</td>
                      <td className="px-5 py-3">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getStatusBadgeClass(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <button 
                          onClick={() => setSelectedPatient(patient)}
                          className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-white hover:bg-blue-50 border border-blue-200 rounded transition-colors"
                        >
                          Open Chart
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-5 py-8 text-center text-gray-500 text-sm">
                      No results for "{searchQuery}"
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Standard Modal Overlay */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-gray-900/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-xl flex flex-col max-h-[90vh]">
            
            <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50 rounded-t-lg">
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded flex items-center justify-center border border-gray-300">
                   <User size={20} />
                 </div>
                 <div>
                   <h3 className="font-bold text-gray-900">{selectedPatient.name}</h3>
                   <div className="text-xs text-gray-500 font-mono mt-0.5">MRN: {selectedPatient.id}</div>
                 </div>
               </div>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                  <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Scheduled Time</p>
                  <p className="font-bold text-gray-900 text-sm">{selectedPatient.time}</p>
                </div>
                <div className="p-3 bg-white border border-gray-200 rounded-md shadow-sm">
                  <p className="text-xs text-gray-500 font-medium mb-1 uppercase tracking-wider">Current Status</p>
                  <span className={`px-2 py-0.5 inline-flex rounded text-xs font-medium border ${getStatusBadgeClass(selectedPatient.status)}`}>
                    {selectedPatient.status}
                  </span>
                </div>
              </div>

              <div className="border border-gray-200 rounded-md overflow-hidden">
                <div className="bg-gray-50 px-4 py-2 border-b border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700">Encounter Management</h4>
                </div>
                <div className="p-4 grid gap-2">
                  <button 
                    onClick={() => updatePatientStatus(selectedPatient.id, 'In Progress')}
                    disabled={selectedPatient.status === 'In Progress'}
                    className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded border w-full text-left transition-colors ${
                      selectedPatient.status === 'In Progress' 
                        ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                    }`}
                  >
                    <CheckCircle2 size={16} className={selectedPatient.status === 'In Progress' ? 'text-gray-400' : 'text-green-600'} />
                    Begin Documentation (In Progress)
                   </button>
                   <button 
                     onClick={() => updatePatientStatus(selectedPatient.id, 'Waiting')}
                     disabled={selectedPatient.status === 'Waiting'}
                     className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded border w-full text-left transition-colors ${
                       selectedPatient.status === 'Waiting' 
                         ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                         : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                     }`}
                   >
                     <Clock size={16} className={selectedPatient.status === 'Waiting' ? 'text-gray-400' : 'text-yellow-600'} />
                     Return to Waiting Room
                   </button>
                   <button 
                     onClick={() => updatePatientStatus(selectedPatient.id, 'Scheduled')}
                     disabled={selectedPatient.status === 'Scheduled'}
                     className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded border w-full text-left transition-colors ${
                       selectedPatient.status === 'Scheduled' 
                         ? 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                         : 'bg-white text-gray-700 hover:bg-gray-50 border-gray-300'
                     }`}
                   >
                     <CalendarDays size={16} className={selectedPatient.status === 'Scheduled' ? 'text-gray-400' : 'text-gray-600'} />
                     Mark as Pending/Scheduled
                   </button>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3 rounded-b-lg">
               <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-medium text-sm rounded hover:bg-gray-50 transition-colors">
                 Clinical Notes
               </button>
               <button 
                 onClick={() => setSelectedPatient(null)}
                 className="px-4 py-2 bg-blue-600 border border-transparent text-white font-medium text-sm rounded hover:bg-blue-700 shadow-sm transition-colors"
               >
                 Close Chart
               </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
