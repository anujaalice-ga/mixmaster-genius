import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import MixTestingTab from "./tabs/MixTestingTab";
import ResultsTab from "./tabs/ResultsTab";
import DatabaseTab from "./tabs/DatabaseTab";
import LabManualTab from "./tabs/LabManualTab";

interface MainAppProps {
  onGoHome: () => void;
}

const MainApp = ({ onGoHome }: MainAppProps) => {
  const [activeTab, setActiveTab] = useState("testing");

  return (
    <div className="min-h-screen surface-gradient">
      {/* Header */}
      <header className="bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onGoHome}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-border"></div>
              <h1 className="text-2xl font-bold text-gradient">
                Cement Mix Advisor
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-success/10 text-success rounded-full text-sm font-medium">
                AI Assistant Active
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
            <TabsTrigger value="testing" className="text-sm">
              Mix Testing
            </TabsTrigger>
            <TabsTrigger value="results" className="text-sm">
              Results Inbox
            </TabsTrigger>
            <TabsTrigger value="database" className="text-sm">
              Database
            </TabsTrigger>
            <TabsTrigger value="manual" className="text-sm">
              Lab Manual
            </TabsTrigger>
          </TabsList>

          <TabsContent value="testing" className="space-y-6">
            <MixTestingTab />
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
            <ResultsTab />
          </TabsContent>

          <TabsContent value="database" className="space-y-6">
            <DatabaseTab />
          </TabsContent>

          <TabsContent value="manual" className="space-y-6">
            <LabManualTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default MainApp;