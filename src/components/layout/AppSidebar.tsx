import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home, Package, DollarSign, ShoppingCart, Landmark, BookOpen,
  BarChart3, FolderOpen, Bot, Settings, ChevronDown, ChevronRight,
  FileText, Users, Truck, CreditCard, Receipt, Calculator,
  PiggyBank, Shield, Zap, Target, AlertTriangle, Scale
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  {
    label: 'Home', icon: Home, children: [
      { label: 'Dashboard', path: '/dashboard' },
    ]
  },
  {
    label: 'Items', icon: Package, children: [
      { label: 'All Items', path: '/items' },
      { label: 'Milk Products', path: '/items?type=milk' },
      { label: 'Curd Products', path: '/items?type=curd' },
      { label: 'Price Lists', path: '/items?view=prices' },
    ]
  },
  {
    label: 'Sales', icon: DollarSign, children: [
      { label: 'Customers', path: '/customers' },
      { label: 'Invoices', path: '/invoices' },
      { label: 'Payments Received', path: '/payments?type=received' },
      { label: 'Credit Notes', path: '/credit-notes' },
    ]
  },
  {
    label: 'Purchases', icon: ShoppingCart, children: [
      { label: 'Vendors', path: '/vendors' },
      { label: 'Bills', path: '/bills' },
      { label: 'Expenses', path: '/expenses' },
      { label: 'Payments Made', path: '/payments?type=made' },
    ]
  },
  {
    label: 'Banking', icon: Landmark, children: [
      { label: 'Bank Accounts', path: '/banking' },
      { label: 'Reconciliation', path: '/banking?view=reconcile' },
    ]
  },
  {
    label: 'Accountant', icon: BookOpen, children: [
      { label: 'Manual Journals', path: '/journals' },
      { label: 'Chart of Accounts', path: '/chart-of-accounts' },
      { label: 'Budgets', path: '/budgets' },
    ]
  },
  {
    label: 'Reports', icon: BarChart3, children: [
      { label: 'Profit & Loss', path: '/reports?type=pnl' },
      { label: 'Balance Sheet', path: '/reports?type=balance' },
      { label: 'Cash Flow', path: '/reports?type=cashflow' },
      { label: 'Tax Reports', path: '/reports?type=tax' },
    ]
  },
  {
    label: 'Documents', icon: FolderOpen, children: [
      { label: 'All Documents', path: '/documents' },
    ]
  },
  {
    label: 'AI CFO', icon: Bot, children: [
      { label: 'Command Room', path: '/chat' },
      { label: 'Agents', path: '/agents' },
      { label: 'Approvals', path: '/approvals' },
      { label: 'Risk Center', path: '/risks' },
      { label: 'Audit Log', path: '/audit' },
    ]
  },
  {
    label: 'Settings', icon: Settings, children: [
      { label: 'Company Profile', path: '/settings' },
      { label: 'Users & Roles', path: '/settings?tab=users' },
      { label: 'Preferences', path: '/settings?tab=preferences' },
    ]
  },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  onNavigate?: () => void;
}

export default function AppSidebar({ collapsed, onToggle, onNavigate }: AppSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<string[]>(['Items']);

  const toggleSection = (label: string) => {
    setOpenSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    );
  };

  const isActivePath = (path: string) => {
    const [pathBase, queryString] = path.split('?');
    const currentPath = location.pathname;

    // First check if base paths match
    if (currentPath !== pathBase) return false;

    // If menu item has no query params
    if (!queryString) {
      return !location.search;
    }

    // Compare query parameters using URLSearchParams for accurate matching
    const menuParams = new URLSearchParams(queryString);
    const currentParams = new URLSearchParams(location.search);

    // Check if all menu params exist in current URL with same values
    for (const [key, value] of menuParams.entries()) {
      if (currentParams.get(key) !== value) {
        return false;
      }
    }

    // Check if current URL has the same number of params (no extra params)
    return Array.from(currentParams.keys()).length === Array.from(menuParams.keys()).length;
  };

  if (collapsed) {
    return (
      <aside className="w-14 border-r border-border bg-sidebar flex flex-col items-center py-2 shrink-0">
        {navItems.map(item => (
          <button
            key={item.label}
            onClick={() => {
              if (item.children?.[0]) {
                navigate(item.children[0].path);
                onNavigate?.();
              }
            }}
            className={cn(
              "w-10 h-10 rounded-md flex items-center justify-center mb-1 transition-colors",
              item.children?.some(c => isActivePath(c.path))
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            title={item.label}
          >
            <item.icon className="h-4 w-4" />
          </button>
        ))}
      </aside>
    );
  }

  return (
    <aside className="w-64 border-r border-border bg-sidebar flex flex-col shrink-0 overflow-y-auto scrollbar-thin">
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Bot className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-sm font-semibold text-foreground">Dairy AI CFO</h1>
            <p className="text-[10px] text-muted-foreground">Enterprise ERP</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-2">
        {navItems.map(item => {
          const isOpen = openSections.includes(item.label);
          const isActive = item.children?.some(c => isActivePath(c.path));

          return (
            <div key={item.label} className="mb-0.5">
              <button
                onClick={() => toggleSection(item.label)}
                className={cn(
                  "w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors",
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />}
              </button>

              {isOpen && item.children && (
                <div className="ml-4 pl-3 border-l border-border mt-0.5 mb-1">
                  {item.children.map(child => (
                    <button
                      key={child.path}
                      onClick={() => {
                        navigate(child.path);
                        onNavigate?.();
                      }}
                      className={cn(
                        "w-full text-left px-3 py-1.5 rounded-md text-sm transition-colors",
                        isActivePath(child.path)
                          ? "bg-accent text-accent-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      )}
                    >
                      {child.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
