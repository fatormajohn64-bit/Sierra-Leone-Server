import React from 'react';
import { 
  CheckCircle2, Globe, Database, Brain, Users, Activity, 
  ChevronRight, ChevronDown, Zap, HardDrive, Upload, 
  History, Terminal, List
} from 'lucide-react';
import { AppLayout } from '../components/layout/AppLayout';

/**
 * Dashboard Page
 * Renders the main interface matching the SLS UI specifications.
 */
export const Dashboard = () => {
  return (
    <AppLayout>
      <div className="p-4 space-y-4">
        
        {/* Status Card */}
        <div className="bg-gradient-to-r from-sls-green/10 to-sls-card border border-sls-green/20 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:border-sls-green/40 transition-colors">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-sls-green flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.4)]">
              <CheckCircle2 size={28} className="text-white" />
            </div>
            <div>
              <p className="text-sm text-sls-muted">Server Status</p>
              <h2 className="text-2xl font-bold text-sls-green">ONLINE</h2>
              <p className="text-xs text-sls-muted mt-0.5">Everything is running smoothly! 🚀</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Mock Sparkline */}
            <div className="hidden sm:flex items-center gap-0.5 opacity-70">
               {[4,8,12,6,16,10,14,8,12].map((h, i) => (
                 <div key={i} className="w-1 bg-sls-green rounded-full" style={{ height: `${h}px` }}></div>
               ))}
            </div>
            <ChevronRight className="text-sls-muted" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard icon={<Globe className="text-sls-blue" />} title="Websites" value="12" sub="Active" bg="bg-sls-blue/10" />
          <StatCard icon={<Database className="text-sls-purple" />} title="Databases" value="8" sub="Active" bg="bg-sls-purple/10" />
          <StatCard icon={<Brain className="text-sls-red" />} title="AI Services" value="3" sub="Running" bg="bg-sls-red/10" />
          <StatCard icon={<Users className="text-sls-green" />} title="Users" value="5" sub="Accounts" bg="bg-sls-green/10" />
        </div>

        {/* Resource Usage */}
        <div className="bg-sls-card border border-sls-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Activity className="text-sls-muted" size={20} />
              <h3 className="font-medium">Resource Usage</h3>
            </div>
            <button className="flex items-center gap-1 text-xs text-sls-muted bg-sls-bg px-2 py-1 rounded-md border border-sls-border">
              This Month <ChevronDown size={14} />
            </button>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <ResourceRing percent={23} color="#10B981" label="CPU" subLabel="4 Cores" />
            <ResourceRing percent={61} color="#3B82F6" label="RAM" subLabel="3.8 / 6 GB" />
            <ResourceRing percent={45} color="#8B5CF6" label="Storage" subLabel="32 / 70 GB" />
            <ResourceRing percent={18} color="#F59E0B" label="Bandwidth" subLabel="178 GB / 1 TB" />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-sls-card border border-sls-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Zap className="text-sls-muted" size={20} />
              <h3 className="font-medium">Quick Actions</h3>
            </div>
            <button className="text-sm text-sls-purple hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <ActionBtn icon={<Globe className="text-sls-green" size={18} />} label="Create Website" />
            <ActionBtn icon={<Database className="text-sls-blue" size={18} />} label="New Database" />
            <ActionBtn icon={<Upload className="text-sls-purple" size={18} />} label="Upload File" />
            <ActionBtn icon={<History className="text-sls-yellow" size={18} />} label="Backup Now" />
            <ActionBtn icon={<Brain className="text-sls-red" size={18} />} label="AI Model" />
            <ActionBtn icon={<Terminal className="text-sls-green" size={18} />} label="Terminal" />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-sls-card border border-sls-border rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <List className="text-sls-muted" size={20} />
              <h3 className="font-medium">Recent Activity</h3>
            </div>
            <button className="text-sm text-sls-purple hover:text-white transition-colors">View All</button>
          </div>
          
          <div className="space-y-4">
            <ActivityRow dot="bg-sls-green" text="Server started successfully" time="2m ago" />
            <ActivityRow dot="bg-sls-blue" text="New user login: johnfatoma" time="10m ago" />
            <ActivityRow dot="bg-sls-purple" text="Database backup completed" time="1h ago" />
            <ActivityRow dot="bg-sls-red" text="AI model loaded: Sierra-LLM" time="2h ago" />
            <ActivityRow dot="bg-sls-yellow" text="Failed login attempt detected" time="3h ago" />
          </div>
        </div>

      </div>
    </AppLayout>
  );
};

/* --- Sub-Components --- */

const StatCard = ({ icon, title, value, sub, bg }: any) => (
  <div className="bg-sls-card border border-sls-border rounded-xl p-4 flex flex-col items-center justify-center text-center">
    <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center mb-2`}>
      {icon}
    </div>
    <p className="text-xs text-sls-muted mb-1">{title}</p>
    <h4 className="text-xl font-bold">{value}</h4>
    <p className="text-[10px] text-sls-muted mt-1">{sub}</p>
  </div>
);

/**
 * Calculates SVG stroke dash offset to create a circular progress bar.
 */
const ResourceRing = ({ percent, color, label, subLabel }: any) => {
  const radius = 32;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24 flex items-center justify-center mb-2">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background Track */}
          <circle cx="48" cy="48" r={radius} fill="transparent" stroke="#1D2432" strokeWidth="8" />
          {/* Progress Ring */}
          <circle 
            cx="48" cy="48" r={radius} fill="transparent" 
            stroke={color} strokeWidth="8" strokeLinecap="round"
            style={{ strokeDasharray: circumference, strokeDashoffset }}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <span className="absolute text-lg font-bold">{percent}%</span>
      </div>
      <span className="text-sm font-medium">{label}</span>
      <span className="text-xs text-sls-muted">{subLabel}</span>
    </div>
  );
};

const ActionBtn = ({ icon, label }: any) => (
  <button className="flex items-center gap-3 bg-sls-bg border border-sls-border p-3 rounded-xl hover:bg-sls-border/50 transition-colors text-left">
    {icon}
    <span className="text-sm">{label}</span>
  </button>
);

const ActivityRow = ({ dot, text, time }: any) => (
  <div className="flex items-center justify-between group cursor-pointer">
    <div className="flex items-center gap-3">
      <div className={`w-2 h-2 rounded-full ${dot} shadow-[0_0_5px_rgba(255,255,255,0.2)]`}></div>
      <span className="text-sm text-gray-200">{text}</span>
    </div>
    <div className="flex items-center gap-2">
      <span className="text-xs text-sls-muted">{time}</span>
      <ChevronRight size={14} className="text-sls-muted opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);
              
