import { motion } from 'framer-motion';
import { 
  Cpu, 
  GitBranch, 
  TestTube, 
  Rocket,
  CheckCircle2,
  Clock,
  BarChart3
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { countries } from '@/data/rolloutData';

const automationPipelines = [
  {
    name: 'CI/CD Pipeline',
    description: 'Automated build, test, and deployment',
    status: 'active',
    successRate: 98.5,
    runsToday: 47,
    icon: GitBranch,
  },
  {
    name: 'Automated Testing',
    description: 'E2E, integration, and unit tests',
    status: 'active',
    successRate: 96.2,
    runsToday: 312,
    icon: TestTube,
  },
  {
    name: 'Deployment Automation',
    description: 'Zero-downtime deployments',
    status: 'active',
    successRate: 99.1,
    runsToday: 23,
    icon: Rocket,
  },
  {
    name: 'Monitoring & Alerts',
    description: 'Real-time performance tracking',
    status: 'active',
    successRate: 100,
    runsToday: 1842,
    icon: BarChart3,
  },
];

export function AutomationSection() {
  const averageAutomation = Math.round(
    countries.reduce((sum, c) => sum + c.automationLevel, 0) / countries.length
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Automation Dashboard</h1>
        <p className="text-muted-foreground">
          Automation priority initiative — streamlining deployment across all markets
        </p>
      </motion.div>

      {/* Global Automation Score */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="metric-card bg-gradient-to-r from-primary/5 to-primary/10"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-primary text-primary-foreground">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">Global Automation Score</h2>
              <p className="text-sm text-muted-foreground">Average across all 13 markets</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-4xl font-bold text-primary">{averageAutomation}%</p>
            <p className="text-xs text-muted-foreground">Target: 85%</p>
          </div>
        </div>
        <Progress value={averageAutomation} className="h-3" />
      </motion.div>

      {/* Automation Pipelines */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {automationPipelines.map((pipeline, index) => (
          <motion.div
            key={pipeline.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 + index * 0.1 }}
            className="metric-card"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-success/10">
                <pipeline.icon className="w-6 h-6 text-success" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-foreground">{pipeline.name}</h3>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                    <CheckCircle2 className="w-3 h-3" />
                    Active
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{pipeline.description}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Success Rate</p>
                    <span className="text-lg font-bold text-foreground">{pipeline.successRate}%</span>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Runs Today</p>
                    <span className="text-lg font-bold text-foreground">{pipeline.runsToday}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Per-Country Automation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="metric-card"
      >
        <h2 className="text-lg font-semibold text-foreground mb-4">Automation by Market</h2>
        <div className="space-y-3">
          {countries
            .sort((a, b) => b.automationLevel - a.automationLevel)
            .map((country, index) => (
              <div key={country.code} className="flex items-center gap-4">
                <span className="text-xl w-8">{getFlagEmoji(country.code)}</span>
                <span className="w-28 font-medium text-sm">{country.name}</span>
                <div className="flex-1">
                  <Progress value={country.automationLevel} className="h-2" />
                </div>
                <span className="w-12 text-right text-sm font-medium">{country.automationLevel}%</span>
              </div>
            ))}
        </div>
      </motion.div>
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
