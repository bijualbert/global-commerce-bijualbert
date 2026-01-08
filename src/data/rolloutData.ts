export interface Country {
  code: string;
  name: string;
  region: string;
  status: 'live' | 'in-progress' | 'planned' | 'blocked';
  progress: number;
  launchDate: string;
  automationLevel: number;
  integrationStatus: {
    api: 'connected' | 'testing' | 'pending';
    hydrogen: 'deployed' | 'staging' | 'development';
    checkout: 'live' | 'testing' | 'pending';
  };
}

export const countries: Country[] = [
  {
    code: 'US',
    name: 'United States',
    region: 'North America',
    status: 'live',
    progress: 100,
    launchDate: '2024-11-01',
    automationLevel: 95,
    integrationStatus: { api: 'connected', hydrogen: 'deployed', checkout: 'live' }
  },
  {
    code: 'CA',
    name: 'Canada',
    region: 'North America',
    status: 'live',
    progress: 100,
    launchDate: '2024-12-01',
    automationLevel: 92,
    integrationStatus: { api: 'connected', hydrogen: 'deployed', checkout: 'live' }
  },
  {
    code: 'MX',
    name: 'Mexico',
    region: 'North America',
    status: 'in-progress',
    progress: 75,
    launchDate: '2025-02-15',
    automationLevel: 78,
    integrationStatus: { api: 'connected', hydrogen: 'staging', checkout: 'testing' }
  },
  {
    code: 'UK',
    name: 'United Kingdom',
    region: 'Europe',
    status: 'in-progress',
    progress: 85,
    launchDate: '2025-01-15',
    automationLevel: 88,
    integrationStatus: { api: 'connected', hydrogen: 'staging', checkout: 'testing' }
  },
  {
    code: 'DE',
    name: 'Germany',
    region: 'Europe',
    status: 'in-progress',
    progress: 60,
    launchDate: '2025-03-01',
    automationLevel: 72,
    integrationStatus: { api: 'testing', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'FR',
    name: 'France',
    region: 'Europe',
    status: 'planned',
    progress: 35,
    launchDate: '2025-04-15',
    automationLevel: 45,
    integrationStatus: { api: 'testing', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'IT',
    name: 'Italy',
    region: 'Europe',
    status: 'planned',
    progress: 25,
    launchDate: '2025-05-01',
    automationLevel: 38,
    integrationStatus: { api: 'pending', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'ES',
    name: 'Spain',
    region: 'Europe',
    status: 'planned',
    progress: 20,
    launchDate: '2025-05-15',
    automationLevel: 32,
    integrationStatus: { api: 'pending', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'BR',
    name: 'Brazil',
    region: 'South America',
    status: 'in-progress',
    progress: 55,
    launchDate: '2025-03-15',
    automationLevel: 65,
    integrationStatus: { api: 'testing', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'AU',
    name: 'Australia',
    region: 'Asia Pacific',
    status: 'in-progress',
    progress: 70,
    launchDate: '2025-02-01',
    automationLevel: 80,
    integrationStatus: { api: 'connected', hydrogen: 'staging', checkout: 'testing' }
  },
  {
    code: 'JP',
    name: 'Japan',
    region: 'Asia Pacific',
    status: 'planned',
    progress: 15,
    launchDate: '2025-06-01',
    automationLevel: 28,
    integrationStatus: { api: 'pending', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'KR',
    name: 'South Korea',
    region: 'Asia Pacific',
    status: 'planned',
    progress: 10,
    launchDate: '2025-07-01',
    automationLevel: 22,
    integrationStatus: { api: 'pending', hydrogen: 'development', checkout: 'pending' }
  },
  {
    code: 'CN',
    name: 'China',
    region: 'Asia Pacific',
    status: 'blocked',
    progress: 5,
    launchDate: 'TBD',
    automationLevel: 10,
    integrationStatus: { api: 'pending', hydrogen: 'development', checkout: 'pending' }
  },
];

export const metrics = {
  totalCountries: 13,
  liveCountries: 2,
  inProgressCountries: 5,
  plannedCountries: 5,
  blockedCountries: 1,
  overallProgress: 52,
  automationAverage: 57,
  apiIntegrations: 6,
  hydrogenDeployments: 2,
};

export const partnerData = {
  name: 'Publicis Sapient',
  role: 'Strategic Partner',
  engagementType: 'Solution-Oriented',
  services: [
    { name: 'Product Management', status: 'active', lead: 'Sarah Chen' },
    { name: 'Architecture Design', status: 'active', lead: 'Michael Torres' },
    { name: 'Quality Assurance', status: 'active', lead: 'Emma Williams' },
    { name: 'DevOps & Automation', status: 'active', lead: 'James Park' },
  ],
  milestones: [
    { name: 'Phase 1: North America', date: '2024-12-31', status: 'completed' },
    { name: 'Phase 2: Europe Core', date: '2025-03-31', status: 'in-progress' },
    { name: 'Phase 3: APAC Launch', date: '2025-06-30', status: 'planned' },
    { name: 'Phase 4: Full Rollout', date: '2025-09-30', status: 'planned' },
  ]
};
