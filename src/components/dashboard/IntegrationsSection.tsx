import { motion } from 'framer-motion';
import { 
  Zap, 
  Server, 
  ShoppingCart, 
  CreditCard, 
  Package,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

const integrations = [
  {
    name: 'Shopify Admin API',
    description: 'Product, order, and inventory management',
    status: 'connected',
    uptime: 99.9,
    requests: '2.4M',
    icon: Server,
  },
  {
    name: 'Shopify Hydrogen',
    description: 'Headless storefront framework',
    status: 'deployed',
    uptime: 99.8,
    requests: '8.2M',
    icon: Zap,
  },
  {
    name: 'Storefront API',
    description: 'Customer-facing data access',
    status: 'connected',
    uptime: 99.95,
    requests: '15.7M',
    icon: ShoppingCart,
  },
  {
    name: 'Checkout API',
    description: 'Secure payment processing',
    status: 'testing',
    uptime: 98.5,
    requests: '890K',
    icon: CreditCard,
  },
  {
    name: 'Fulfillment API',
    description: 'Order fulfillment & logistics',
    status: 'pending',
    uptime: 0,
    requests: '-',
    icon: Package,
  },
];

const statusConfig = {
  connected: { icon: CheckCircle2, label: 'Connected', className: 'text-success bg-success/10' },
  deployed: { icon: CheckCircle2, label: 'Deployed', className: 'text-success bg-success/10' },
  testing: { icon: Clock, label: 'Testing', className: 'text-warning bg-warning/10' },
  pending: { icon: AlertCircle, label: 'Pending', className: 'text-muted-foreground bg-muted' },
};

export function IntegrationsSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Shopify Integrations</h1>
        <p className="text-muted-foreground">
          API connections and Hydrogen deployment status
        </p>
      </motion.div>

      {/* Integration Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {integrations.map((integration, index) => {
          const status = statusConfig[integration.status as keyof typeof statusConfig];
          const StatusIcon = status.icon;
          
          return (
            <motion.div
              key={integration.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="metric-card"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10">
                  <integration.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-foreground">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                    <span className={cn(
                      'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium',
                      status.className
                    )}>
                      <StatusIcon className="w-3 h-3" />
                      {status.label}
                    </span>
                  </div>
                  
                  {integration.uptime > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Uptime</p>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold text-foreground">{integration.uptime}%</span>
                          <Progress value={integration.uptime} className="h-1.5 flex-1" />
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Requests</p>
                        <span className="text-lg font-bold text-foreground">{integration.requests}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hydrogen Architecture */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="metric-card"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Hydrogen Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
            <h3 className="font-medium text-foreground mb-2">Edge Rendering</h3>
            <p className="text-sm text-muted-foreground">
              Server-side rendering at the edge for optimal performance globally
            </p>
          </div>
          <div className="p-4 rounded-xl bg-success/5 border border-success/20">
            <h3 className="font-medium text-foreground mb-2">React Server Components</h3>
            <p className="text-sm text-muted-foreground">
              Modern React patterns for faster page loads and better SEO
            </p>
          </div>
          <div className="p-4 rounded-xl bg-info/5 border border-info/20">
            <h3 className="font-medium text-foreground mb-2">Oxygen Hosting</h3>
            <p className="text-sm text-muted-foreground">
              Shopify's global CDN for sub-100ms response times
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
