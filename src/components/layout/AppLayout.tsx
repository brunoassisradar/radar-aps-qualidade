import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar collapsed={sidebarCollapsed} onCollapse={setSidebarCollapsed} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <main className="flex-1 overflow-auto p-6 border-[#f1f3f8]">
          <Outlet />
        </main>
      </div>
    </div>;
};