import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Heart,
  ClipboardList,
  AlertCircle,
  CheckSquare,
  ChevronDown,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: { label: string; path: string }[];
}

const menuItems: MenuItem[] = [
  { label: 'Sala de situação', icon: Home, path: '#' },
  { label: 'Dashboard', icon: LayoutDashboard, path: '#' },
  { label: 'Previne Brasil', icon: Users, path: '#' },
  {
    label: 'Financiamento APS',
    icon: FileText,
    children: [
      { label: 'Resumo', path: '/financiamento-aps' },
      { label: 'Qualidade eSF/eAP', path: '/financiamento-aps/qualidade-esf-eap' },
      { label: 'Qualidade eSB', path: '#' },
      { label: 'Qualidade eMulti', path: '#' },
    ],
  },
  { label: 'Linhas de cuidado', icon: Heart, path: '#' },
  { label: 'Planejamento ass...', icon: ClipboardList, path: '#' },
  { label: 'Situação cadastral', icon: FileText, path: '#' },
  { label: 'Inconsistências', icon: AlertCircle, path: '#' },
  { label: 'Gestão de ações', icon: CheckSquare, path: '#' },
];

export const AppSidebar: React.FC<AppSidebarProps> = ({ collapsed }) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>(['Financiamento APS']);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (path?: string) => {
    if (!path || path === '#') return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isParentActive = (children?: { label: string; path: string }[]) => {
    if (!children) return false;
    return children.some((child) => isActive(child.path));
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex h-14 items-center border-b border-sidebar-border px-4">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-primary">Radar</span>
            <span className="text-lg">🎯</span>
            <span className="text-lg font-semibold text-primary">Saúde</span>
          </div>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleExpanded(item.label)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isParentActive(item.children)
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span>{item.label}</span>}
                    </div>
                    {!collapsed && (
                      expandedItems.includes(item.label) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )
                    )}
                  </button>
                  {!collapsed && expandedItems.includes(item.label) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <NavLink
                            to={child.path}
                            className={({ isActive: active }) =>
                              cn(
                                'block rounded-md px-3 py-2 text-sm transition-colors',
                                active || isActive(child.path)
                                  ? 'font-medium text-sidebar-primary'
                                  : 'text-sidebar-foreground hover:text-sidebar-primary'
                              )
                            }
                          >
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path || '#'}
                  className={({ isActive: active }) =>
                    cn(
                      'flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      active && item.path !== '#'
                        ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    )
                  }
                >
                  <item.icon className="h-5 w-5" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
