import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Database, 
  Search, 
  Brain, 
  Calendar,
  TrendingUp,
  Eye,
  Download,
  Filter
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface DatabaseRecord {
  id: string;
  mixId: string;
  testDate: string;
  cement: number;
  water: number;
  sand: number;
  aggregate: number;
  additives: string;
  strength28Day: number;
  slump: number;
  density: number;
  status: 'approved' | 'rejected' | 'testing';
  engineer: string;
  notes: string;
}

const mockDatabase: DatabaseRecord[] = [
  {
    id: "CMT-2024-001",
    mixId: "MX-400-180-A",
    testDate: "2024-01-20",
    cement: 400,
    water: 180,
    sand: 650,
    aggregate: 1200,
    additives: "Superplasticizer 1.2%",
    strength28Day: 45.2,
    slump: 75,
    density: 2.35,
    status: "approved",
    engineer: "Dr. Sarah Chen",
    notes: "Excellent performance, approved for high-rise construction"
  },
  {
    id: "CMT-2024-002",
    mixId: "MX-350-165-B", 
    testDate: "2024-01-19",
    cement: 350,
    water: 165,
    sand: 700,
    aggregate: 1150,
    additives: "Air entrainer 0.8%",
    strength28Day: 32.1,
    slump: 45,
    density: 2.28,
    status: "approved",
    engineer: "Dr. Michael Rodriguez",
    notes: "Good for standard applications"
  },
  {
    id: "CMT-2024-003",
    mixId: "MX-450-200-C",
    testDate: "2024-01-18", 
    cement: 450,
    water: 200,
    sand: 600,
    aggregate: 1100,
    additives: "Retarder 0.5%",
    strength28Day: 28.5,
    slump: 95,
    density: 2.15,
    status: "rejected",
    engineer: "Dr. Lisa Wang",
    notes: "Below strength requirements, high water content"
  },
  {
    id: "CMT-2024-004",
    mixId: "MX-380-170-D",
    testDate: "2024-01-17",
    cement: 380,
    water: 170,
    sand: 680,
    aggregate: 1180,
    additives: "Fly ash 15%",
    strength28Day: 38.7,
    slump: 65,
    density: 2.32,
    status: "approved",
    engineer: "Dr. James Park",
    notes: "Sustainable mix with good performance"
  },
  {
    id: "CMT-2024-005",
    mixId: "MX-420-185-E",
    testDate: "2024-01-16",
    cement: 420,
    water: 185,
    sand: 630,
    aggregate: 1220,
    additives: "Silica fume 8%",
    strength28Day: 52.3,
    slump: 80,
    density: 2.38,
    status: "approved", 
    engineer: "Dr. Sarah Chen",
    notes: "High-performance mix for critical applications"
  }
];

const DatabaseTab = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<DatabaseRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'rejected' | 'testing'>('all');

  const filteredRecords = mockDatabase.filter(record => {
    const matchesSearch = searchQuery === "" || 
      record.mixId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.engineer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.additives.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || record.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setIsSearching(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const responses = [
        `Based on the database analysis, I found ${mockDatabase.length} mix records. ${aiQuery.toLowerCase().includes('strength') ? 'Average 28-day strength across all approved mixes is 42.1 MPa.' : ''}`,
        `${aiQuery.toLowerCase().includes('water') ? 'Water-cement ratios range from 0.38 to 0.47. Optimal ratio appears to be around 0.42-0.45 for balanced performance.' : ''}`,
        `${aiQuery.toLowerCase().includes('additive') ? 'Most successful mixes use superplasticizers (40%) or fly ash (25%) as primary additives.' : ''}`,
        `The database shows a 78% approval rate for tested mixes. Common rejection reasons include high water content and insufficient strength development.`
      ].filter(r => r.trim()).join(' ');
      
      setAiResponse(responses || "I've analyzed the database. Could you be more specific about what you'd like to know?");
      setIsSearching(false);
    }, 1500);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-white">Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-destructive text-white">Rejected</Badge>;
      case 'testing':
        return <Badge className="bg-warning text-white">Testing</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  const approvedCount = mockDatabase.filter(r => r.status === 'approved').length;
  const rejectedCount = mockDatabase.filter(r => r.status === 'rejected').length;
  const testingCount = mockDatabase.filter(r => r.status === 'testing').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Database className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Test Results Database</h2>
          <p className="text-muted-foreground">Comprehensive history with AI-powered insights</p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-foreground">{mockDatabase.length}</div>
                <div className="text-sm text-muted-foreground">Total Tests</div>
              </div>
              <Database className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-success">{approvedCount}</div>
                <div className="text-sm text-muted-foreground">Approved</div>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-destructive">{rejectedCount}</div>
                <div className="text-sm text-muted-foreground">Rejected</div>
              </div>
              <Filter className="h-8 w-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-gradient">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-primary">{Math.round((approvedCount / mockDatabase.length) * 100)}%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
              <Calendar className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* AI Assistant */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <span>AI Database Assistant</span>
          </CardTitle>
          <CardDescription>
            Ask questions about the test database and get intelligent insights
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about mix patterns, strength trends, optimal ratios..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
            />
            <Button 
              onClick={handleAiQuery}
              disabled={isSearching || !aiQuery.trim()}
              className="lab-button"
            >
              {isSearching ? (
                <Brain className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {aiResponse && (
            <div className="p-4 bg-white/50 rounded-lg border border-primary/20">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{aiResponse}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="card-gradient">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search by Mix ID, Test ID, Engineer, or Additives..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                variant={statusFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('all')}
              >
                All
              </Button>
              <Button
                variant={statusFilter === 'approved' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('approved')}
                className="text-success border-success hover:bg-success hover:text-white"
              >
                Approved
              </Button>
              <Button
                variant={statusFilter === 'rejected' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter('rejected')}
                className="text-destructive border-destructive hover:bg-destructive hover:text-white"
              >
                Rejected
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-primary border-primary hover:bg-primary hover:text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Database Table */}
      <Card className="card-gradient shadow-elegant">
        <CardHeader>
          <CardTitle>Test Records ({filteredRecords.length})</CardTitle>
          <CardDescription>
            Complete history of cement mix tests and results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Test ID</TableHead>
                <TableHead>Mix ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Strength (MPa)</TableHead>
                <TableHead>W/C Ratio</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Engineer</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRecords.map((record) => (
                <TableRow key={record.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">{record.id}</TableCell>
                  <TableCell>{record.mixId}</TableCell>
                  <TableCell>{record.testDate}</TableCell>
                  <TableCell className="font-semibold">
                    {record.status !== 'testing' ? record.strength28Day : '-'}
                  </TableCell>
                  <TableCell>{(record.water / record.cement).toFixed(2)}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{record.engineer}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedRecord(record)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Test Record Details - {record.id}</DialogTitle>
                        </DialogHeader>
                        {selectedRecord && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <h4 className="font-semibold mb-2">Mix Composition</h4>
                                <div className="space-y-1 text-sm">
                                  <div>Cement: {selectedRecord.cement} kg/m³</div>
                                  <div>Water: {selectedRecord.water} kg/m³</div>
                                  <div>Sand: {selectedRecord.sand} kg/m³</div>
                                  <div>Aggregate: {selectedRecord.aggregate} kg/m³</div>
                                  <div>Additives: {selectedRecord.additives}</div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Test Results</h4>
                                <div className="space-y-1 text-sm">
                                  <div>28-Day Strength: {selectedRecord.strength28Day} MPa</div>
                                  <div>Slump: {selectedRecord.slump} mm</div>
                                  <div>Density: {selectedRecord.density} g/cm³</div>
                                  <div>W/C Ratio: {(selectedRecord.water / selectedRecord.cement).toFixed(2)}</div>
                                  <div>Status: {getStatusBadge(selectedRecord.status)}</div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-2">Engineer Notes</h4>
                              <p className="text-sm text-muted-foreground">{selectedRecord.notes}</p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DatabaseTab;