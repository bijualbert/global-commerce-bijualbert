import { 
  LayoutDashboard, 
  Globe, 
  Zap, 
  Users, 
  ShoppingBag, 
  Settings,
  TrendingUp,
  Cpu
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navItems = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'countries', label: 'Country Rollout', icon: Globe },
  { id: 'integrations', label: 'Integrations', icon: Zap },
  { id: 'automation', label: 'Automation', icon: Cpu },
  { id: 'partner', label: 'Partner Hub', icon: Users },
  { id: 'products', label: 'Product Catalog', icon: ShoppingBag },
];

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  return (
    <aside className="w-64 min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">GM Commerce</h1>
            <p className="text-xs text-sidebar-foreground/60">Shopify Platform</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={cn(
              'sidebar-nav-item w-full',
              activeTab === item.id && 'sidebar-nav-item-active'
            )}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="sidebar-nav-item w-full">
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </button>
        <div className="mt-4 px-3 py-2 rounded-lg bg-sidebar-accent">
          <p className="text-xs text-sidebar-foreground/60">Powered by</p>
          <p className="text-sm font-semibold text-sidebar-foreground">Shopify + Hydrogen</p>
        </div>
      </div>
    </aside>
  );
}
