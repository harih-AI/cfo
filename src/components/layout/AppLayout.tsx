import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import AppSidebar from './AppSidebar';
import ActivityFeed from './ActivityFeed';

export default function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(window.innerWidth < 768);
  const [activityVisible, setActivityVisible] = useState(window.innerWidth >= 1280); // Hide activity feed on mobile/tablet/laptop default

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
      if (window.innerWidth < 1280) {
        setActivityVisible(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">
      <TopBar
        onToggleSidebar={() => setSidebarCollapsed(p => !p)}
        onToggleActivity={() => setActivityVisible(p => !p)}
        sidebarCollapsed={sidebarCollapsed}
      />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(p => !p)}
          onNavigate={() => {
            if (window.innerWidth < 1024) {
              setSidebarCollapsed(true);
            }
          }}
        />
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <Outlet />
        </main>
        {activityVisible && <ActivityFeed onClose={() => setActivityVisible(false)} />}
      </div>
    </div>
  );
}
