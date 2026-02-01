import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home,
  LayoutDashboard,
  Users,
  FileText,
  Heart,
  Wallet,
  ClipboardList,
  AlertCircle,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppSidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
  onCloseMobile?: () => void;
  isMobile?: boolean;
}

interface TertiaryMenuItem {
  label: string;
  path: string;
}

interface SecondaryMenuItem {
  label: string;
  path: string;
  hasActiveState?: boolean;
  tabKey?: string;
  isNavigableWithChildren?: boolean;
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
    icon: Wallet,
    path: '/financiamento-aps',
    children: [
      { label: 'Resumo', path: '#', hasActiveState: false },
      { 
        label: 'Vínculo e Acompanhamento', 
        path: '/financiamento-aps/qualidade-esf-eap?tab=vinculo',
        hasActiveState: true,
        tabKey: 'vinculo',
        isNavigableWithChildren: true,
        children: [
          { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=vinculo' },
          { label: 'Busca ativa', path: '/financiamento-aps/qualidade-esf-eap/individualizado?tab=vinculo' },
        ]
      },
      { 
        label: 'Qualidade eSF/eAP', 
        path: '/financiamento-aps/qualidade-esf-eap?tab=qualidade',
        hasActiveState: true,
        tabKey: 'qualidade',
        isNavigableWithChildren: true,
        children: [
          { label: 'Relatório', path: '/financiamento-aps/qualidade-esf-eap/relatorio?tab=qualidade' },
          { label: 'Busca ativa', path: '/financiamento-aps/qualidade-esf-eap/individualizado?tab=qualidade' },
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

export const AppSidebar: React.FC<AppSidebarProps> = ({ 
  collapsed,
  onCloseMobile,
  isMobile = false,
}) => {
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

  const searchParams = new URLSearchParams(location.search);
  const currentTab = searchParams.get('tab') || 'qualidade';

  const isInQualidadeSection = location.pathname.startsWith('/financiamento-aps/qualidade-esf-eap');

  const isSecondaryActive = (item: SecondaryMenuItem) => {
    if (!item.hasActiveState) return false;
    if (item.path === '#') return false;
    
    if (item.tabKey && isInQualidadeSection) {
      return currentTab === item.tabKey;
    }
    
    if (!item.tabKey && item.path !== '#') {
      const itemBasePath = item.path.split('?')[0];
      return location.pathname.startsWith(itemBasePath);
    }
    
    return false;
  };

  const isTertiaryActive = (path: string, parentTabKey?: string) => {
    const [basePath, queryString] = path.split('?');
    const pathParams = new URLSearchParams(queryString);
    const pathTab = pathParams.get('tab');
    
    if (location.pathname !== basePath) return false;
    if (pathTab && pathTab !== currentTab) return false;
    if (parentTabKey && parentTabKey !== currentTab) return false;
    
    return true;
  };

  const isInFinanciamentoSection = location.pathname.startsWith('/financiamento-aps');

  const isParentActive = (item: MenuItem) => {
    if (!item.children) return false;
    if (item.label === 'Financiamento APS' && isInFinanciamentoSection) {
      return true;
    }
    return item.children.some((child) => isSecondaryActive(child));
  };

  const handleNavClick = () => {
    if (isMobile && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300 h-full',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      {/* Mobile close button */}
      {isMobile && (
        <div className="flex items-center justify-between p-3 border-b border-sidebar-border">
          <span className="font-semibold text-sidebar-foreground">Menu</span>
          <button
            onClick={onCloseMobile}
            className="p-2 rounded-md hover:bg-sidebar-accent text-sidebar-foreground"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
            <li key={item.label}>
              {item.children ? (
                <div>
                  <NavLink
                    to={item.path || '#'}
                    onClick={(e) => {
                      toggleExpanded(item.label);
                      if (!item.path || item.path === '#') {
                        e.preventDefault();
                      }
                    }}
                    className={cn(
                      'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium transition-colors',
                      isParentActive(item)
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
                  </NavLink>
                  {!collapsed && expandedItems.includes(item.label) && (
                    <ul className="ml-8 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <li key={child.label}>
                          {child.children && child.isNavigableWithChildren ? (
                            <div>
                              <NavLink
                                to={child.path}
                                onClick={(e) => {
                                  const isAlreadyExpanded = expandedSecondary.includes(child.label);
                                  const isCurrentlyActive = isSecondaryActive(child);
                                  
                                  if (isCurrentlyActive && isAlreadyExpanded) {
                                    e.preventDefault();
                                    setExpandedSecondary(expandedSecondary.filter(l => l !== child.label));
                                  } else {
                                    if (!isAlreadyExpanded) {
                                      setExpandedSecondary([...expandedSecondary, child.label]);
                                    }
                                    handleNavClick();
                                  }
                                }}
                                className={cn(
                                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-left transition-colors',
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
                              </NavLink>
                              {expandedSecondary.includes(child.label) && (
                                <ul className="ml-4 mt-1 space-y-1 border-l border-border pl-3">
                                  {child.children.map((tertiary) => (
                                    <li key={tertiary.label}>
                                      <NavLink
                                        to={tertiary.path}
                                        onClick={handleNavClick}
                                        className={cn(
                                          'block rounded-md px-2 py-1.5 text-xs transition-colors',
                                          isTertiaryActive(tertiary.path, child.tabKey)
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
                          ) : child.children ? (
                            <div>
                              <button
                                onClick={() => toggleSecondaryExpanded(child.label)}
                                className={cn(
                                  'flex w-full items-center justify-between rounded-md px-3 py-2 text-sm text-left transition-colors',
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
                                        onClick={handleNavClick}
                                        className={cn(
                                          'block rounded-md px-2 py-1.5 text-xs transition-colors',
                                          isTertiaryActive(tertiary.path, child.tabKey)
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
                            <NavLink
                              to={child.path}
                              onClick={handleNavClick}
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
                  onClick={handleNavClick}
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
