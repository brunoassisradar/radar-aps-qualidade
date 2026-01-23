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

interface TertiaryMenuItem {
  label: string;
  path: string;
}

interface SecondaryMenuItem {
  label: string;
  path: string;
  hasActiveState?: boolean;
  tabKey?: string; // The tab key to check for active state
  children?: TertiaryMenuItem[];
}

interface MenuItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  children?: SecondaryMenuItem[];
}

const menuItems: MenuItem[] = [
  { label: 'Sala de situação', icon: Home, path: '#' },
  { label: 'Dashboard', icon: LayoutDashboard, path: '#' },
  { label: 'Previne Brasil', icon: Users, path: '#' },
  {
    label: 'Financiamento APS',
    icon: FileText,
    children: [
      { label: 'Resumo', path: '/financiamento-aps', hasActiveState: false },
      { 
        label: 'Vínculo e Acompanhamento', 
        path: '/financiamento-aps/qualidade-esf-eap?tab=vinculo',
        hasActiveState: true,
        tabKey: 'vinculo'
      },
      { 
        label: 'Qualidade eSF/eAP', 
        path: '/financiamento-aps/qualidade-esf-eap?tab=qualidade',
        hasActiveState: true,
        tabKey: 'qualidade',
        children: [
          { label: 'Visão geral', path: '/financiamento-aps/qualidade-esf-eap?tab=qualidade' },
          { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade' },
          { label: 'Individualizado', path: '/financiamento-aps/qualidade-esf-eap/individualizado' },
        ]
      },
      { label: 'Qualidade eSB', path: '#', hasActiveState: true },
      { label: 'Qualidade eMulti', path: '#', hasActiveState: true },
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
  const [expandedSecondary, setExpandedSecondary] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  const toggleSecondaryExpanded = (label: string) => {
    setExpandedSecondary((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  // Get current tab from URL
  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'qualidade'; // default to qualidade if no tab

  const isInQualidadeSection = location.pathname.startsWith('/financiamento-aps/qualidade-esf-eap');

  const isSecondaryActive = (item: SecondaryMenuItem) => {
    if (!item.hasActiveState) return false;
    if (item.path === '#') return false;
    
    // If item has a tabKey, check if we're in the qualidade section AND the tab matches
    if (item.tabKey && isInQualidadeSection) {
      return currentTab === item.tabKey;
    }
    
    return false;
  };

  const isTertiaryActive = (path: string) => {
    const [basePath] = path.split('?');
    return location.pathname === basePath;
  };

  const isParentActive = (children?: SecondaryMenuItem[]) => {
    if (!children) return false;
    return children.some((child) => isSecondaryActive(child));
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}
    >

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
                          {child.children ? (
                            // Secondary item with tertiary menu
                            <div>
                              <button
                                onClick={() => toggleSecondaryExpanded(child.label)}
                                className={cn(
                                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm transition-colors',
                                  isSecondaryActive(child)
                                    ? 'font-medium text-sidebar-primary'
                                    : 'text-sidebar-foreground hover:text-sidebar-primary'
                                )}
                              >
                                <span>{child.label}</span>
                                {expandedSecondary.includes(child.label) ? (
                                  <ChevronDown className="h-3 w-3" />
                                ) : (
                                  <ChevronRight className="h-3 w-3" />
                                )}
                              </button>
                              {expandedSecondary.includes(child.label) && (
                                <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                                  {child.children.map((tertiary) => (
                                    <li key={tertiary.label}>
                                      <NavLink
                                        to={tertiary.path}
                                        className={cn(
                                          'block rounded-md px-2 py-1.5 text-xs transition-colors',
                                          isTertiaryActive(tertiary.path)
                                            ? 'font-medium text-sidebar-primary'
                                            : 'text-muted-foreground hover:text-sidebar-primary'
                                        )}
                                      >
                                        {tertiary.label}
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ) : (
                            // Simple secondary item
                            <NavLink
                              to={child.path}
                              className={cn(
                                'block rounded-md px-3 py-2 text-sm transition-colors',
                                isSecondaryActive(child)
                                  ? 'font-medium text-sidebar-primary'
                                  : 'text-sidebar-foreground hover:text-sidebar-primary'
                              )}
                            >
                              {child.label}
                            </NavLink>
                          )}
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
