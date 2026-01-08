import { motion } from 'framer-motion';
import { CountryCard } from './CountryCard';
import { countries } from '@/data/rolloutData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function CountriesSection() {
  const liveCountries = countries.filter(c => c.status === 'live');
  const inProgressCountries = countries.filter(c => c.status === 'in-progress');
  const plannedCountries = countries.filter(c => c.status === 'planned');
  const blockedCountries = countries.filter(c => c.status === 'blocked');

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-2">Country Rollout Status</h1>
        <p className="text-muted-foreground">
          Track the Shopify platform transition across all 13 international markets
        </p>
      </motion.div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">All Markets ({countries.length})</TabsTrigger>
          <TabsTrigger value="live">Live ({liveCountries.length})</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress ({inProgressCountries.length})</TabsTrigger>
          <TabsTrigger value="planned">Planned ({plannedCountries.length})</TabsTrigger>
          <TabsTrigger value="blocked">Blocked ({blockedCountries.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country, index) => (
              <CountryCard key={country.code} country={country} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {liveCountries.map((country, index) => (
              <CountryCard key={country.code} country={country} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {inProgressCountries.map((country, index) => (
              <CountryCard key={country.code} country={country} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="planned" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plannedCountries.map((country, index) => (
              <CountryCard key={country.code} country={country} index={index} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="blocked" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {blockedCountries.map((country, index) => (
              <CountryCard key={country.code} country={country} index={index} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
