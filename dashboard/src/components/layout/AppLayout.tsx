import React from 'react';
import { Menu, Search, Bell, Grid, Globe, Database, Folder, MoreHorizontal } from 'lucide-react';

/**
 * AppLayout Component
 * Wraps the main dashboard content with the top header and mobile bottom navigation.
 */
export const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-sls-bg flex flex-col relative pb-20">
      
      {/* Top Header */}
      <header className="sticky top-0 z-50 bg-sls-bg/80 backdrop-blur-md border-b border-sls-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button className="p-1 text-sls-muted hover:text-white transition-colors">
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            {/* Mock Logo placeholder matching the green mountain icon */}
            <div className="w-8 h-8 rounded-full bg-sls-green/20 border border-sls-green/50 flex items-center justify-center text-sls-green font-bold text-xs">
              SLS
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide">SIERRA LEONE SERVER</span>
              <div className="flex items-center gap-1 text-xs text-sls-muted">
                <span>SLS</span>
                <div className="w-2 h-2 rounded-full bg-sls-green shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="text-sls-muted hover:text-white"><Search size={20} /></button>
          <div className="relative">
            <button className="text-sls-muted hover:text-white"><Bell size={20} /></button>
            <span className="absolute -top-1 -right-1 bg-sls-purple text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
          </div>
          <div className="relative">
            <img src="https://ui-avatars.com/api/?name=John+Fatoma&background=2d3748&color=fff" alt="User" className="w-8 h-8 rounded-full border border-sls-border" />
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-sls-green border-2 border-sls-bg"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 w-full bg-sls-bg/95 backdrop-blur border-t border-sls-border px-6 py-3 flex justify-between items-center z-50">
        <NavItem icon={<Grid size={24} />} label="Dashboard" active />
        <NavItem icon={<Globe size={24} />} label="Websites" />
        <NavItem icon={<Database size={24} />} label="Databases" />
        <NavItem icon={<Folder size={24} />} label="Files" />
        <NavItem icon={<MoreHorizontal size={24} />} label="More" />
      </nav>
    </div>
  );
};

/**
 * Helper component for bottom navigation items.
 */
const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex flex-col items-center gap-1 ${active ? 'text-sls-purple' : 'text-sls-muted hover:text-white'}`}>
    {icon}
    <span className="text-[10px] font-medium">{label}</span>
    {active && <div className="w-4 h-1 rounded-full bg-sls-purple mt-0.5"></div>}
  </button>
);
