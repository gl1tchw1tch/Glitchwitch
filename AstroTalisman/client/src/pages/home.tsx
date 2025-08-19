import { useState } from "react";
import NatalChartForm from "../components/natal-chart-form";
import SpiritDatabase from "../components/spirit-database";
import ElectionTiming from "../components/election-timing";
import TalismanDesigner from "../components/talisman-designer";
import TransitWatcher from "../components/transit-watcher";
import { Button } from "@/components/ui/button";

type TabType = "chart" | "spirits" | "election" | "designer" | "transits";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("chart");

  const tabs = [
    { id: "chart", label: "Natal Chart", icon: "fas fa-chart-pie" },
    { id: "spirits", label: "Spirit Database", icon: "fas fa-database" },
    { id: "election", label: "Election Timing", icon: "fas fa-calendar-alt" },
    { id: "designer", label: "Talisman Designer", icon: "fas fa-drafting-compass" },
    { id: "transits", label: "Transit Watcher", icon: "fas fa-satellite-dish" },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "chart":
        return <NatalChartForm />;
      case "spirits":
        return <SpiritDatabase />;
      case "election":
        return <ElectionTiming />;
      case "designer":
        return <TalismanDesigner />;
      case "transits":
        return <TransitWatcher />;
      default:
        return <NatalChartForm />;
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter text-gray-900">
      {/* Header */}
      <header className="bg-surface shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <i className="fas fa-star text-white text-sm"></i>
              </div>
              <h1 className="text-xl font-semibold text-gray-900">AstroTalisman</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <i className="fas fa-cog"></i>
              </button>
              <Button className="bg-primary text-white hover:bg-blue-700 transition-colors text-sm font-medium">
                <i className="fas fa-download mr-2"></i>
                Export Blueprint
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-surface border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`border-b-2 py-4 px-1 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "border-primary text-primary"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderTabContent()}
      </main>
    </div>
  );
}
