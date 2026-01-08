import { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { OverviewSection } from '@/components/dashboard/OverviewSection';
import { CountriesSection } from '@/components/dashboard/CountriesSection';
import { IntegrationsSection } from '@/components/dashboard/IntegrationsSection';
import { AutomationSection } from '@/components/dashboard/AutomationSection';
import { PartnerSection } from '@/components/dashboard/PartnerSection';
import { ProductsSection } from '@/components/dashboard/ProductsSection';

const Index = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewSection />;
      case 'countries':
        return <CountriesSection />;
      case 'integrations':
        return <IntegrationsSection />;
      case 'automation':
        return <AutomationSection />;
      case 'partner':
        return <PartnerSection />;
      case 'products':
        return <ProductsSection />;
      default:
        return <OverviewSection />;
    }
  };

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 p-6 overflow-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Index;
