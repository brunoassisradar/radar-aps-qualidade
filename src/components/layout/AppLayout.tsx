import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { AppHeader } from './AppHeader';
import { useIsMobile } from '@/hooks/use-mobile';

export const AppLayout: React.FC = () => {
  const isMobile = useIsMobile();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Auto-collapse sidebar on smaller screens
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
      setMobileSidebarOpen(false);
    }
  }, [isMobile]);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      setSidebarCollapsed(!sidebarCollapsed);
    }
  };

  const handleCloseMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };
  
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background">
      <AppHeader onToggleSidebar={handleToggleSidebar} />
      <div className="flex flex-1 overflow-hidden relative">
        {/* Mobile overlay */}
        {isMobile && mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={handleCloseMobileSidebar}
          />
        )}
        
        {/* Sidebar - hidden on mobile unless open */}
        <div className={`
          ${isMobile 
            ? `fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full'}` 
            : ''
          }
        `}>
          <AppSidebar 
            collapsed={isMobile ? false : sidebarCollapsed} 
            onCollapse={setSidebarCollapsed}
            onCloseMobile={handleCloseMobileSidebar}
            isMobile={isMobile}
          />
        </div>
        
        <main className="flex-1 overflow-auto p-3 sm:p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
