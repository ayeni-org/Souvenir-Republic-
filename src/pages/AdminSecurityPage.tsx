import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Shield, Lock, Key, Eye, 
  EyeOff, Smartphone, Mail, Globe,
  History, AlertTriangle, CheckCircle, Save,
  UserCheck, Terminal, Plus
} from 'lucide-react';
import { useAdmin } from '../AdminContext';

export const AdminSecurityPage: React.FC = () => {
  const { admin, activities } = useAdmin();
  const [mfaEnabled, setMfaEnabled] = useState(admin?.mfaEnabled || false);

  const securityLogs = [
    { id: '1', event: 'Failed Login Attempt', ip: '192.168.1.45', location: 'Lagos, NG', time: '2026-02-19 02:15:22', status: 'Blocked' },
    { id: '2', event: 'Password Changed', ip: '102.89.34.12', location: 'Ibadan, NG', time: '2026-02-18 14:30:05', status: 'Success' },
    { id: '3', event: 'New Admin Added', ip: '102.89.34.12', location: 'Ibadan, NG', time: '2026-02-17 09:12:44', status: 'Success' },
    { id: '4', event: 'MFA Disabled', ip: '197.210.44.8', location: 'Abuja, NG', time: '2026-02-15 18:22:10', status: 'Warning' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 uppercase tracking-tight">Security & Access</h1>
          <p className="text-gray-500 text-sm font-medium">Manage administrative access, MFA, and security audit logs.</p>
        </div>
        <button className="bg-black text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-gold transition-all shadow-lg shadow-black/10 flex items-center gap-2">
          <Save size={18} /> Update Security
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Security Settings */}
        <div className="lg:col-span-2 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <Lock size={20} className="text-gold" /> Authentication Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-gold shadow-sm">
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-gray-900 uppercase tracking-tight text-sm">Two-Factor Authentication (MFA)</h4>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Secure your account with a secondary code</p>
                  </div>
                </div>
                <button 
                  onClick={() => setMfaEnabled(!mfaEnabled)}
                  className={`w-14 h-7 rounded-full transition-all relative ${mfaEnabled ? 'bg-gold' : 'bg-gray-200'}`}
                >
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${mfaEnabled ? 'left-8' : 'left-1'}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Session Timeout</label>
                  <select className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-4 px-6 font-bold">
                    <option>30 Minutes</option>
                    <option>1 Hour</option>
                    <option>4 Hours</option>
                    <option>24 Hours</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-4">Password Expiry</label>
                  <select className="w-full bg-gray-50 border-none focus:ring-2 focus:ring-gold rounded-xl py-4 px-6 font-bold">
                    <option>Never</option>
                    <option>30 Days</option>
                    <option>90 Days</option>
                    <option>180 Days</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <History size={20} className="text-gold" /> Security Audit Log
            </h3>
            <div className="overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Event</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">IP Address</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest">Time</th>
                    <th className="pb-4 text-[10px] font-black text-gray-400 uppercase tracking-widest text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {securityLogs.map((log) => (
                    <tr key={log.id} className="group">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            log.status === 'Blocked' ? 'bg-red-500' :
                            log.status === 'Warning' ? 'bg-gold' : 'bg-emerald-500'
                          }`}></div>
                          <span className="text-xs font-black text-gray-900 uppercase tracking-tight">{log.event}</span>
                        </div>
                      </td>
                      <td className="py-4">
                        <p className="text-xs font-bold text-gray-500 font-mono">{log.ip}</p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.location}</p>
                      </td>
                      <td className="py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">{log.time}</td>
                      <td className="py-4 text-right">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${
                          log.status === 'Blocked' ? 'text-red-500' :
                          log.status === 'Warning' ? 'text-gold' : 'text-emerald-500'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Admin Access Control */}
        <div className="lg:col-span-1 space-y-8">
          <section className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
            <h3 className="text-lg font-black text-gray-900 mb-6 uppercase tracking-tight flex items-center gap-3">
              <UserCheck size={20} className="text-gold" /> Admin Access
            </h3>
            <div className="space-y-4">
              {[
                { name: 'Super Admin', role: 'Owner', lastSeen: 'Active Now' },
                { name: 'Content Manager', role: 'Editor', lastSeen: '2h ago' },
                { name: 'Support Lead', role: 'Moderator', lastSeen: '5h ago' },
              ].map((adm, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-gray-400 font-black border border-gray-100">
                      {adm.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-gray-900 uppercase tracking-tight">{adm.name}</h4>
                      <p className="text-[10px] font-bold text-gold uppercase tracking-widest">{adm.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{adm.lastSeen}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-4 border-2 border-dashed border-gray-100 rounded-2xl text-xs font-black text-gray-400 uppercase tracking-widest hover:border-gold hover:text-gold transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Invite Admin
              </button>
            </div>
          </section>

          <section className="bg-black text-white p-8 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-black mb-4 uppercase tracking-tight flex items-center gap-3">
                <Terminal size={20} className="text-gold" /> IP Whitelisting
              </h3>
              <p className="text-gray-400 text-xs font-medium leading-relaxed mb-6">
                Restrict Admin Panel access to specific IP addresses for maximum security.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10">
                  <span className="text-xs font-mono text-gray-300">102.89.34.12</span>
                  <span className="text-[10px] font-black text-gold uppercase tracking-widest">Office</span>
                </div>
              </div>
              <button className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
                Add IP Address
              </button>
            </div>
            <Shield className="absolute -right-10 -bottom-10 w-48 h-48 text-white/5 rotate-12" />
          </section>
        </div>
      </div>
    </div>
  );
};
