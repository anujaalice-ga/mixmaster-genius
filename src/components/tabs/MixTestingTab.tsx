import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { 
  Beaker, 
  Search, 
  Send, 
  CheckCircle, 
  AlertTriangle, 
  Brain,
  Clock,
  FlaskConical
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MixFormulation {
  cement: number;
  water: number;
  sand: number;
  aggregate: number;
  additives: string;
}

const MixTestingTab = () => {
  const { toast } = useToast();
  const [mixFormulation, setMixFormulation] = useState<MixFormulation>({
    cement: 400,
    water: 180,
    sand: 650,
    aggregate: 1200,
    additives: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAnalyzeMix = async () => {
    setIsAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const isAlreadyTested = Math.random() > 0.7;
      
      setAnalysisResult({
        isAlreadyTested,
        confidence: 95,
        recommendations: isAlreadyTested 
          ? ["This mix was tested on 2024-01-15", "Previous results: 28-day strength 42.5 MPa", "Status: Approved for production"]
          : ["Mix composition appears valid", "Water-cement ratio: 0.45 (Good)", "Recommend proceeding with lab testing"],
        riskLevel: isAlreadyTested ? "low" : "medium",
        previousTests: isAlreadyTested ? 3 : 0
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const handleSubmitForTesting = async () => {
    setIsSubmitting(true);
    
    setTimeout(() => {
      toast({
        title: "Mix Submitted for Testing",
        description: "Your mix has been sent to the lab for testing. Test ID: CMT-2024-001",
      });
      setIsSubmitting(false);
      setAnalysisResult(null);
      setMixFormulation({
        cement: 400,
        water: 180,
        sand: 650,
        aggregate: 1200,
        additives: ""
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Beaker className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">Mix Testing Laboratory</h2>
          <p className="text-muted-foreground">AI-powered mix validation and testing workflow</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mix Formulation Input */}
        <Card className="card-gradient shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FlaskConical className="h-5 w-5 text-primary" />
              <span>Mix Formulation</span>
            </CardTitle>
            <CardDescription>
              Enter your cement mix composition for AI analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="cement">Cement (kg/m³)</Label>
                <Input
                  id="cement"
                  type="number"
                  value={mixFormulation.cement}
                  onChange={(e) => setMixFormulation({
                    ...mixFormulation,
                    cement: Number(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="water">Water (kg/m³)</Label>
                <Input
                  id="water"
                  type="number"
                  value={mixFormulation.water}
                  onChange={(e) => setMixFormulation({
                    ...mixFormulation,
                    water: Number(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sand">Fine Aggregate (kg/m³)</Label>
                <Input
                  id="sand"
                  type="number"
                  value={mixFormulation.sand}
                  onChange={(e) => setMixFormulation({
                    ...mixFormulation,
                    sand: Number(e.target.value)
                  })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="aggregate">Coarse Aggregate (kg/m³)</Label>
                <Input
                  id="aggregate"
                  type="number"
                  value={mixFormulation.aggregate}
                  onChange={(e) => setMixFormulation({
                    ...mixFormulation,
                    aggregate: Number(e.target.value)
                  })}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additives">Additives & Admixtures</Label>
              <Textarea
                id="additives"
                placeholder="List any additives, superplasticizers, or other admixtures..."
                value={mixFormulation.additives}
                onChange={(e) => setMixFormulation({
                  ...mixFormulation,
                  additives: e.target.value
                })}
              />
            </div>

            <Separator />

            <Button 
              onClick={handleAnalyzeMix}
              disabled={isAnalyzing}
              className="w-full lab-button"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-spin" />
                  AI Analyzing Mix...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Analyze with AI
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Analysis Results */}
        <Card className="card-gradient shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-accent" />
              <span>AI Analysis Results</span>
            </CardTitle>
            <CardDescription>
              Intelligent mix validation and recommendations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!analysisResult ? (
              <div className="text-center py-12 text-muted-foreground">
                <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Submit your mix formulation for AI analysis</p>
                <p className="text-sm">The AI will check for duplicates and validate composition</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Status Banner */}
                <Alert className={analysisResult.isAlreadyTested ? "bg-yellow-50 border-yellow-200" : "bg-green-50 border-green-200"}>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    {analysisResult.isAlreadyTested 
                      ? "This mix has been previously tested" 
                      : "New mix formulation - ready for testing"
                    }
                  </AlertDescription>
                </Alert>

                {/* Confidence Score */}
                <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <span className="font-medium">AI Confidence</span>
                  <Badge variant="secondary" className="bg-primary text-white">
                    {analysisResult.confidence}%
                  </Badge>
                </div>

                {/* Previous Tests */}
                {analysisResult.previousTests > 0 && (
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <span className="font-medium">Previous Tests</span>
                    <Badge variant="outline">
                      {analysisResult.previousTests} found
                    </Badge>
                  </div>
                )}

                {/* Recommendations */}
                <div className="space-y-2">
                  <h4 className="font-medium text-foreground">Recommendations:</h4>
                  <ul className="space-y-1">
                    {analysisResult.recommendations.map((rec: string, index: number) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Button */}
                {!analysisResult.isAlreadyTested && (
                  <Button 
                    onClick={handleSubmitForTesting}
                    disabled={isSubmitting}
                    className="w-full lab-button"
                  >
                    {isSubmitting ? (
                      <>
                        <Clock className="mr-2 h-4 w-4 animate-spin" />
                        Submitting for Testing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send for Lab Testing
                      </>
                    )}
                  </Button>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="bg-gradient-to-r from-accent/5 to-primary/5 border-accent/20">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Brain className="h-4 w-4 text-accent" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-2">AI Assistant Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• The AI checks against 10,000+ previous mix formulations</li>
                <li>• Water-cement ratio recommendations based on strength requirements</li>
                <li>• Automatic validation of mix proportions and feasibility</li>
                <li>• Integration with lab scheduling for optimal testing workflow</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MixTestingTab;