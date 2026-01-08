import { motion } from 'framer-motion';
import { Globe, Zap, CheckCircle2, AlertTriangle, Cpu, TrendingUp } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { Progress } from '@/components/ui/progress';
import { metrics, countries } from '@/data/rolloutData';

export function OverviewSection() {
  const liveCountries = countries.filter(c => c.status === 'live');
  const inProgressCountries = countries.filter(c => c.status === 'in-progress');

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">
          GM International Commerce Rollout
        </h1>
        <p className="text-muted-foreground">
          Shopify platform transition across 13 markets • Powered by Hydrogen
        </p>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Markets"
          value={metrics.totalCountries}
          subtitle="Countries in rollout plan"
          icon={Globe}
          variant="primary"
          delay={0.1}
        />
        <MetricCard
          title="Live Markets"
          value={metrics.liveCountries}
          subtitle="Fully operational"
          icon={CheckCircle2}
          trend={{ value: 100, isPositive: true }}
          variant="success"
          delay={0.2}
        />
        <MetricCard
          title="API Integrations"
          value={metrics.apiIntegrations}
          subtitle="Connected to Shopify"
          icon={Zap}
          delay={0.3}
        />
        <MetricCard
          title="Automation Level"
          value={`${metrics.automationAverage}%`}
          subtitle="Average across markets"
          icon={Cpu}
          trend={{ value: 12, isPositive: true }}
          variant="warning"
          delay={0.4}
        />
      </div>

      {/* Overall Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="metric-card"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Overall Rollout Progress</h2>
            <p className="text-sm text-muted-foreground">
              {metrics.liveCountries} live • {metrics.inProgressCountries} in progress • {metrics.plannedCountries} planned
            </p>
          </div>
          <div className="text-right">
            <p className="text-3xl font-bold text-primary">{metrics.overallProgress}%</p>
            <p className="text-xs text-muted-foreground">Complete</p>
          </div>
        </div>
        <Progress value={metrics.overallProgress} className="h-3" />
        
        {/* Status Breakdown */}
        <div className="grid grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-success" />
              <span className="text-2xl font-bold text-foreground">{metrics.liveCountries}</span>
            </div>
            <p className="text-xs text-muted-foreground">Live</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-warning" />
              <span className="text-2xl font-bold text-foreground">{metrics.inProgressCountries}</span>
            </div>
            <p className="text-xs text-muted-foreground">In Progress</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-info" />
              <span className="text-2xl font-bold text-foreground">{metrics.plannedCountries}</span>
            </div>
            <p className="text-xs text-muted-foreground">Planned</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center gap-2 mb-1">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <span className="text-2xl font-bold text-foreground">{metrics.blockedCountries}</span>
            </div>
            <p className="text-xs text-muted-foreground">Blocked</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Live Markets */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="metric-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <h3 className="font-semibold text-foreground">Live Markets</h3>
          </div>
          <div className="space-y-3">
            {liveCountries.map(country => (
              <div key={country.code} className="flex items-center justify-between p-3 rounded-lg bg-success/5 border border-success/20">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getFlagEmoji(country.code)}</span>
                  <span className="font-medium">{country.name}</span>
                </div>
                <span className="text-sm text-success font-medium">Operational</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* In Progress */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="metric-card"
        >
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-warning" />
            <h3 className="font-semibold text-foreground">In Progress</h3>
          </div>
          <div className="space-y-3">
            {inProgressCountries.slice(0, 4).map(country => (
              <div key={country.code} className="flex items-center justify-between p-3 rounded-lg bg-warning/5 border border-warning/20">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{getFlagEmoji(country.code)}</span>
                  <div>
                    <span className="font-medium">{country.name}</span>
                    <p className="text-xs text-muted-foreground">ETA: {country.launchDate}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{country.progress}%</span>
                  <Progress value={country.progress} className="h-1.5 w-16 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function getFlagEmoji(countryCode: string): string {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
