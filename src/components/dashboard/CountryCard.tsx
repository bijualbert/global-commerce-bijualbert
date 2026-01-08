import { motion } from 'framer-motion';
import { CheckCircle2, Clock, AlertCircle, XCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { Country } from '@/data/rolloutData';

interface CountryCardProps {
  country: Country;
  index: number;
}

const statusConfig = {
  'live': { 
    icon: CheckCircle2, 
    label: 'Live', 
    className: 'status-badge-success' 
  },
  'in-progress': { 
    icon: Clock, 
    label: 'In Progress', 
    className: 'status-badge-warning' 
  },
  'planned': { 
    icon: Clock, 
    label: 'Planned', 
    className: 'status-badge-info' 
  },
  'blocked': { 
    icon: XCircle, 
    label: 'Blocked', 
    className: 'status-badge-destructive' 
  },
};

const integrationStatusColors = {
  'connected': 'bg-success',
  'deployed': 'bg-success',
  'live': 'bg-success',
  'testing': 'bg-warning',
  'staging': 'bg-warning',
  'pending': 'bg-muted-foreground/30',
  'development': 'bg-info',
};

export function CountryCard({ country, index }: CountryCardProps) {
  const statusInfo = statusConfig[country.status];
  const StatusIcon = statusInfo.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="metric-card hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getFlagEmoji(country.code)}</div>
          <div>
            <h3 className="font-semibold text-foreground">{country.name}</h3>
            <p className="text-xs text-muted-foreground">{country.region}</p>
          </div>
        </div>
        <span className={cn('status-badge', statusInfo.className)}>
          <StatusIcon className="w-3 h-3" />
          {statusInfo.label}
        </span>
      </div>

      <div className="space-y-4">
        {/* Progress */}
        <div>
          <div className="flex justify-between text-sm mb-1.5">
            <span className="text-muted-foreground">Rollout Progress</span>
            <span className="font-medium">{country.progress}%</span>
          </div>
          <Progress value={country.progress} className="h-2" />
        </div>

        {/* Integration Status */}
        <div className="grid grid-cols-3 gap-2">
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className={cn(
              'w-2 h-2 rounded-full mx-auto mb-1',
              integrationStatusColors[country.integrationStatus.api]
            )} />
            <p className="text-xs text-muted-foreground">API</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className={cn(
              'w-2 h-2 rounded-full mx-auto mb-1',
              integrationStatusColors[country.integrationStatus.hydrogen]
            )} />
            <p className="text-xs text-muted-foreground">Hydrogen</p>
          </div>
          <div className="text-center p-2 rounded-lg bg-muted/50">
            <div className={cn(
              'w-2 h-2 rounded-full mx-auto mb-1',
              integrationStatusColors[country.integrationStatus.checkout]
            )} />
            <p className="text-xs text-muted-foreground">Checkout</p>
          </div>
        </div>

        {/* Automation & Launch */}
        <div className="flex justify-between text-sm pt-2 border-t border-border">
          <div>
            <span className="text-muted-foreground">Automation: </span>
            <span className="font-medium">{country.automationLevel}%</span>
          </div>
          <div>
            <span className="text-muted-foreground">Launch: </span>
            <span className="font-medium">{country.launchDate}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
