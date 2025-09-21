import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  Inbox, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Send, 
  Filter,
  TrendingUp,
  TrendingDown,
  Brain,
  Package
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TestResult {
  id: string;
  mixId: string;
  testDate: string;
  strength28Day: number;
  slump: number;
  density: number;
  workability: string;
  overallScore: number;
  status: 'good' | 'bad' | 'pending';
  aiAnalysis: string;
}

const mockResults: TestResult[] = [
  {
    id: "CMT-2024-001",
    mixId: "MX-400-180-A",
    testDate: "2024-01-20",
    strength28Day: 45.2,
    slump: 75,
    density: 2.35,
    workability: "Excellent",
    overallScore: 92,
    status: "good",
    aiAnalysis: "Exceptional performance across all parameters. Recommended for high-strength applications."
  },
  {
    id: "CMT-2024-002", 
    mixId: "MX-350-165-B",
    testDate: "2024-01-19",
    strength28Day: 32.1,
    slump: 45,
    density: 2.28,
    workability: "Good",
    overallScore: 78,
    status: "good",
    aiAnalysis: "Solid performance, suitable for standard construction applications."
  },
  {
    id: "CMT-2024-003",
    mixId: "MX-450-200-C", 
    testDate: "2024-01-18",
    strength28Day: 28.5,
    slump: 95,
    density: 2.15,
    workability: "Poor",
    overallScore: 45,
    status: "bad",
    aiAnalysis: "Below specifications. High water content affecting strength and durability."
  },
  {
    id: "CMT-2024-004",
    mixId: "MX-380-170-D",
    testDate: "2024-01-17", 
    strength28Day: 0,
    slump: 0,
    density: 0,
    workability: "Testing",
    overallScore: 0,
    status: "pending",
    aiAnalysis: "Test in progress. Results expected in 24-48 hours."
  }
];

const ResultsTab = () => {
  const { toast } = useToast();
  const [results] = useState<TestResult[]>(mockResults);
  const [selectedResults, setSelectedResults] = useState<string[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'good' | 'bad' | 'pending'>('all');

  const filteredResults = results.filter(result => 
    filterStatus === 'all' || result.status === filterStatus
  );

  const goodResults = results.filter(r => r.status === 'good');
  const badResults = results.filter(r => r.status === 'bad');
  const pendingResults = results.filter(r => r.status === 'pending');

  const handleSelectResult = (resultId: string) => {
    setSelectedResults(prev => 
      prev.includes(resultId) 
        ? prev.filter(id => id !== resultId)
        : [...prev, resultId]
    );
  };

  const handleSendToProduction = async () => {
    const selectedGoodResults = results.filter(r => 
      selectedResults.includes(r.id) && r.status === 'good'
    );

    if (selectedGoodResults.length === 0) {
      toast({
        title: "No Valid Results Selected",
        description: "Please select results with 'good' status for production.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Production Request Sent",
      description: `${selectedGoodResults.length} mix(es) sent to Raw Material Department for production approval.`,
    });

    setSelectedResults([]);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'bad':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'good':
        return <Badge className="bg-success text-white">Approved</Badge>;
      case 'bad':
        return <Badge className="bg-destructive text-white">Rejected</Badge>;
      case 'pending':
        return <Badge className="bg-warning text-white">Testing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-success rounded-lg flex items-center justify-center">
            <Inbox className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Results Inbox</h2>
            <p className="text-muted-foreground">AI-filtered test results and production routing</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('all')}
          >
            All ({results.length})
          </Button>
          <Button
            variant={filterStatus === 'good' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('good')}
            className="text-success border-success hover:bg-success hover:text-white"
          >
            Good ({goodResults.length})
          </Button>
          <Button
            variant={filterStatus === 'bad' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('bad')}
            className="text-destructive border-destructive hover:bg-destructive hover:text-white"
          >
            Bad ({badResults.length})
          </Button>
          <Button
            variant={filterStatus === 'pending' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilterStatus('pending')}
            className="text-warning border-warning hover:bg-warning hover:text-white"
          >
            Pending ({pendingResults.length})
          </Button>
        </div>
      </div>

      {/* AI Summary */}
      <Alert className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <Brain className="h-4 w-4" />
        <AlertDescription>
          <strong>AI Summary:</strong> {goodResults.length} mixes meet production standards, 
          {badResults.length} require reformulation, {pendingResults.length} awaiting results.
          Average success rate: {Math.round((goodResults.length / (results.length - pendingResults.length)) * 100)}%
        </AlertDescription>
      </Alert>

      {/* Action Bar */}
      {selectedResults.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-primary" />
                <span className="font-medium">{selectedResults.length} result(s) selected</span>
              </div>
              <Button onClick={handleSendToProduction} className="lab-button">
                <Send className="mr-2 h-4 w-4" />
                Send to Production
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results List */}
      <div className="grid gap-4">
        {filteredResults.map((result) => (
          <Card 
            key={result.id} 
            className={`card-gradient shadow-elegant transition-all duration-200 cursor-pointer hover:shadow-lg ${
              selectedResults.includes(result.id) ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => handleSelectResult(result.id)}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <CardTitle className="text-lg">{result.id}</CardTitle>
                    <CardDescription>Mix: {result.mixId} • Tested: {result.testDate}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {result.status !== 'pending' && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-foreground">{result.overallScore}</div>
                      <div className="text-sm text-muted-foreground">Score</div>
                    </div>
                  )}
                  {getStatusBadge(result.status)}
                </div>
              </div>
            </CardHeader>
            
            {result.status !== 'pending' && (
              <CardContent className="space-y-4">
                {/* Test Parameters */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold flex items-center justify-center space-x-1">
                      <span>{result.strength28Day}</span>
                      {result.strength28Day >= 40 ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                    <div className="text-sm text-muted-foreground">28-Day Strength (MPa)</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">{result.slump}mm</div>
                    <div className="text-sm text-muted-foreground">Slump</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">{result.density}</div>
                    <div className="text-sm text-muted-foreground">Density (g/cm³)</div>
                  </div>
                  
                  <div className="text-center p-3 bg-muted/50 rounded-lg">
                    <div className="text-lg font-semibold">{result.workability}</div>
                    <div className="text-sm text-muted-foreground">Workability</div>
                  </div>
                </div>

                <Separator />

                {/* AI Analysis */}
                <div className="flex items-start space-x-3 p-4 bg-accent/5 rounded-lg">
                  <Brain className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground mb-1">AI Analysis</h4>
                    <p className="text-sm text-muted-foreground">{result.aiAnalysis}</p>
                  </div>
                  {result.status === 'good' && (
                    <Button 
                      size="sm" 
                      className="lab-button ml-4"
                      onClick={(e) => {
                        e.stopPropagation();
                        toast({
                          title: "Production Request Sent",
                          description: `Mix ${result.mixId} sent to Raw Material Department for production approval.`,
                        });
                      }}
                    >
                      <Package className="mr-2 h-4 w-4" />
                      Send for Production
                    </Button>
                  )}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="text-center py-12 text-muted-foreground">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No results found for the selected filter</p>
              <p className="text-sm">Try adjusting your filter criteria</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResultsTab;