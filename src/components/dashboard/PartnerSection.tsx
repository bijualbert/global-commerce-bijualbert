import { motion } from 'framer-motion';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  Target,
  Briefcase,
  Award
} from 'lucide-react';
import { partnerData } from '@/data/rolloutData';
import { cn } from '@/lib/utils';

const milestoneStatusConfig = {
  completed: { icon: CheckCircle2, className: 'bg-success/10 text-success border-success/20' },
  'in-progress': { icon: Clock, className: 'bg-warning/10 text-warning border-warning/20' },
  planned: { icon: Target, className: 'bg-muted text-muted-foreground border-border' },
};

export function PartnerSection() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Partner Hub</h1>
        <p className="text-muted-foreground">
          Strategic partnership with Publicis Sapient for solution-oriented delivery
        </p>
      </motion.div>

      {/* Partner Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="metric-card bg-gradient-to-r from-primary/5 to-transparent"
      >
        <div className="flex items-start gap-6">
          <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground">
            <Award className="w-10 h-10" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{partnerData.name}</h2>
                <p className="text-muted-foreground">{partnerData.role}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                {partnerData.engagementType}
              </span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">Active Workstreams</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-foreground">13</p>
                <p className="text-xs text-muted-foreground">Markets Covered</p>
              </div>
              <div className="p-3 rounded-lg bg-card border border-border">
                <p className="text-2xl font-bold text-foreground">24/7</p>
                <p className="text-xs text-muted-foreground">Support Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {partnerData.services.map((service, index) => (
          <motion.div
            key={service.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="metric-card"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Briefcase className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{service.name}</h3>
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>Lead: {service.lead}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Milestones */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="metric-card"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Project Milestones</h2>
        <div className="space-y-4">
          {partnerData.milestones.map((milestone, index) => {
            const status = milestoneStatusConfig[milestone.status as keyof typeof milestoneStatusConfig];
            const StatusIcon = status.icon;
            
            return (
              <div
                key={milestone.name}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border',
                  status.className
                )}
              >
                <div className="flex items-center gap-4 flex-1">
                  <StatusIcon className="w-5 h-5" />
                  <div>
                    <h3 className="font-medium">{milestone.name}</h3>
                    <p className="text-sm opacity-80">Target: {milestone.date}</p>
                  </div>
                </div>
                <span className="text-sm font-medium capitalize">{milestone.status.replace('-', ' ')}</span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
