import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Search, MessageSquare, DollarSign,
  AlertTriangle, PanelLeftClose, PanelLeft, PanelRight, Bell, User,
  LogOut, Settings, HelpCircle
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';


const searchItems = [
  { label: 'Dashboard', path: '/dashboard', type: 'Page' },
  { label: 'Invoices', path: '/invoices', type: 'Page' },
  { label: 'Vendors', path: '/vendors', type: 'Page' },
  { label: 'Bills', path: '/bills', type: 'Page' },
  { label: 'AI Chat', path: '/chat', type: 'Page' },
  { label: 'Agents', path: '/agents', type: 'Page' },
  { label: 'Approvals', path: '/approvals', type: 'Page' },
  { label: 'Ravi Dairy Distributors', path: '/customers', type: 'Customer' },
  { label: 'Metro Milk Mart', path: '/customers', type: 'Customer' },
  { label: 'Ramesh Kumar (Farmer)', path: '/vendors', type: 'Vendor' },
  { label: 'INV-2024-001', path: '/invoices', type: 'Invoice' },
  { label: 'INV-2024-010', path: '/invoices', type: 'Invoice' },
  { label: 'Risk: Metro Milk Mart Overdue', path: '/risks', type: 'Risk' },
  { label: 'Audit Log', path: '/audit', type: 'Page' },
  { label: 'Expenses', path: '/expenses', type: 'Page' },
  { label: 'Banking', path: '/banking', type: 'Page' },
  { label: 'Reports', path: '/reports', type: 'Page' },
];

const notifications = [
  { id: 1, title: 'Payment Overdue', message: 'Metro Milk Mart payment is 5 days overdue', time: '2 hours ago', unread: true },
  { id: 2, title: 'Invoice Approved', message: 'INV-2024-045 has been approved', time: '4 hours ago', unread: true },
  { id: 3, title: 'New Vendor Added', message: 'Ramesh Kumar has been added to vendors', time: '1 day ago', unread: false },
  { id: 4, title: 'AI Alert', message: 'Cash flow prediction shows potential shortage next week', time: '2 days ago', unread: true },
  { id: 5, title: 'Report Ready', message: 'Monthly P&L report is ready for review', time: '3 days ago', unread: false },
];

interface TopBarProps {
  onToggleSidebar: () => void;
  onToggleActivity: () => void;
  sidebarCollapsed: boolean;
}

export default function TopBar({ onToggleSidebar, onToggleActivity, sidebarCollapsed }: TopBarProps) {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const filteredSearch = searchItems.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const location = useLocation();

  const getSearchPlaceholder = () => {
    const path = location.pathname;
    if (path.includes('/invoices')) return 'Search invoices #, customer, amount...';
    if (path.includes('/customers')) return 'Search customer name, email, phone...';
    if (path.includes('/agents')) return 'Search agents, roles, status...';
    if (path.includes('/chat')) return 'Ask AI specific financial questions...';
    if (path.includes('/reports')) return 'Search reports, profit & loss, tax...';
    if (path.includes('/audit')) return 'Search audit logs, actions, users...';
    return 'Search customers, tickets, activities...';
  };

  return (
    <>
      <header className="h-14 border-b border-border bg-background flex items-center pl-3 pr-3 gap-2 sm:gap-4 shrink-0 z-20 sticky top-0 overflow-hidden">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground shrink-0"
        >
          {sidebarCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
        </button>

        {/* CFO Branding - Hidden on small screens */}
        <div className="flex items-center gap-2 shrink-0 hidden md:flex">
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-foreground">CFO</span>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-medium">
            AI
          </span>
        </div>

        {/* Search Bar - Flexible width with min-w-0 for proper shrinking */}
        <div className="flex-1 max-w-xl mx-1 sm:mx-4 min-w-0">
          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/30 text-sm text-muted-foreground hover:bg-secondary/50 transition-colors"
          >
            <Search className="h-4 w-4 shrink-0 opacity-50" />
            <span className="flex-1 text-left truncate">{getSearchPlaceholder()}</span>
          </button>
        </div>

        {/* Right side items - Fixed width, no shrink */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <button
            onClick={onToggleActivity}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground shrink-0"
            title="Toggle Activity Feed"
          >
            <PanelRight className="h-4 w-4" />
          </button>

          {/* Chat */}
          <button
            onClick={() => navigate('/chat')}
            className="p-2 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
          >
            <MessageSquare className="h-4 w-4" />
          </button>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground shrink-0">
                <Bell className="h-4 w-4" />
                {notifications.filter(n => n.unread).length > 0 && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive border border-background" />
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>Notifications</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {notifications.filter(n => n.unread).length} unread
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 cursor-pointer">
                    <div className="flex items-start justify-between w-full gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{notification.title}</p>
                          {notification.unread && (
                            <span className="h-2 w-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center text-sm text-primary cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-0.5 rounded-full hover:ring-2 hover:ring-primary/20 transition-all shrink-0">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">Admin User</span>
                  <span className="text-xs text-muted-foreground">admin@dairycfo.com</span>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/settings')} className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help & Support</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Global Search Dialog */}
      <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogContent className="sm:max-w-lg p-0 gap-0 bg-popover">
          <div className="flex items-center border-b border-border px-3">
            <Search className="h-4 w-4 text-muted-foreground shrink-0" />
            <Input
              placeholder="Search invoices, vendors, payments, reports..."
              className="border-0 shadow-none focus-visible:ring-0 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
          <div className="max-h-80 overflow-y-auto p-2">
            {filteredSearch.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No results found</p>
            ) : (
              filteredSearch.map((item, i) => (
                <button
                  key={i}
                  onClick={() => { navigate(item.path); setSearchOpen(false); setSearchQuery(''); }}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                >
                  <span className="text-foreground">{item.label}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{item.type}</span>
                </button>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}