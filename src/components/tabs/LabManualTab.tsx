import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Brain, 
  Search, 
  Beaker, 
  Calculator,
  Microscope,
  ClipboardList,
  AlertCircle,
  CheckCircle,
  Lightbulb
} from "lucide-react";

interface ManualSection {
  id: string;
  title: string;
  category: string;
  content: string;
  procedures?: string[];
  formulas?: string[];
  tips?: string[];
}

const manualSections: ManualSection[] = [
  {
    id: "cement-hydration",
    title: "Cement Hydration Chemistry",
    category: "Chemistry",
    content: "Cement hydration is the chemical reaction between cement and water. The main compounds in Portland cement (C₃S, C₂S, C₃A, C₄AF) react with water to form calcium silicate hydrate (C-S-H) gel and calcium hydroxide.",
    formulas: [
      "C₃S + H₂O → C-S-H + Ca(OH)₂",
      "C₂S + H₂O → C-S-H + Ca(OH)₂",
      "C₃A + H₂O → C₄AH₁₉ + C₂AH₈"
    ],
    tips: [
      "Higher C₃S content provides early strength",
      "C₂S contributes to long-term strength",
      "C₃A affects setting time and heat of hydration"
    ]
  },
  {
    id: "slump-test",
    title: "Slump Test Procedure",
    category: "Testing",
    content: "The slump test measures the workability and consistency of fresh concrete. It's a simple and widely used test to control concrete quality.",
    procedures: [
      "Clean and wet the slump cone",
      "Fill cone in three equal layers",
      "Rod each layer 25 times with 16mm rod",
      "Level off the top surface",
      "Remove cone vertically in 2-3 seconds",
      "Measure slump immediately"
    ],
    tips: [
      "Test within 5 minutes of sampling",
      "Normal slump range: 25-100mm",
      "Zero slump indicates very dry mix"
    ]
  },
  {
    id: "compressive-strength",
    title: "Compressive Strength Testing",
    category: "Testing",
    content: "Compressive strength is the most important property of concrete. Standard test uses 150mm cubes or 100mm x 200mm cylinders.",
    procedures: [
      "Prepare specimens in standard molds",
      "Compact using vibration or rodding",
      "Cure in water at 20±2°C",
      "Test at 7, 28 days minimum",
      "Apply load continuously at 0.6±0.4 MPa/s",
      "Record maximum load at failure"
    ],
    formulas: [
      "Compressive Strength = Maximum Load / Cross-sectional Area",
      "Characteristic Strength = Mean - 1.65 × Standard Deviation"
    ],
    tips: [
      "Minimum 3 specimens per test age",
      "Ensure perpendicular loading",
      "Report results to nearest 0.5 MPa"
    ]
  },
  {
    id: "water-cement-ratio",
    title: "Water-Cement Ratio Design",
    category: "Mix Design",
    content: "The water-cement ratio is the most critical factor affecting concrete strength and durability. Lower w/c ratios generally produce stronger, more durable concrete.",
    formulas: [
      "W/C Ratio = Weight of Water / Weight of Cement",
      "Abrams' Law: Strength ∝ 1/(W/C)²"
    ],
    tips: [
      "Typical range: 0.35-0.65 for structural concrete",
      "Lower w/c ratios require superplasticizers",
      "Consider workability vs strength trade-off"
    ]
  },
  {
    id: "admixture-effects",
    title: "Chemical Admixtures",
    category: "Chemistry",
    content: "Chemical admixtures modify concrete properties. Common types include plasticizers, superplasticizers, accelerators, retarders, and air-entraining agents.",
    tips: [
      "Superplasticizers: Reduce water content by 12-25%",
      "Air entrainers: Improve freeze-thaw resistance",
      "Retarders: Extend setting time in hot weather",
      "Accelerators: Speed up early strength gain"
    ]
  }
];

const LabManualTab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuery, setAiQuery] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "Chemistry", "Testing", "Mix Design"];
  
  const filteredSections = manualSections.filter(section => {
    const matchesSearch = searchQuery === "" || 
      section.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      section.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "all" || section.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleAiQuery = async () => {
    if (!aiQuery.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing with domain-specific responses
    setTimeout(() => {
      const query = aiQuery.toLowerCase();
      let response = "";
      
      if (query.includes("water") && query.includes("cement")) {
        response = "The water-cement ratio is crucial for concrete properties. For structural concrete, use 0.35-0.55 w/c. Lower ratios increase strength but reduce workability. Use superplasticizers to maintain workability with low w/c ratios.";
      } else if (query.includes("slump")) {
        response = "Slump test measures workability. Normal ranges: 25-50mm (low), 50-100mm (medium), 100-150mm (high). Higher slump increases workability but may reduce strength. Adjust with water or superplasticizers.";
      } else if (query.includes("strength") || query.includes("compressive")) {
        response = "Compressive strength depends on w/c ratio, cement type, age, and curing. Test at 7, 28 days minimum. Typical values: 20-40 MPa (normal), 40-60 MPa (high-strength). Use cube or cylinder specimens.";
      } else if (query.includes("additive") || query.includes("admixture")) {
        response = "Key admixtures: Superplasticizers (reduce water 12-25%), Air entrainers (freeze-thaw protection), Retarders (hot weather), Accelerators (cold weather). Follow manufacturer dosage recommendations.";
      } else if (query.includes("curing")) {
        response = "Proper curing is essential for strength development. Keep concrete moist and at proper temperature (20±2°C). Methods: water curing, wet covering, curing compounds. Cure minimum 7 days for most applications.";
      } else {
        response = "I can help with cement chemistry, testing procedures, mix design, and concrete properties. Ask about specific topics like w/c ratios, slump tests, compressive strength, admixtures, or curing methods.";
      }
      
      setAiResponse(response);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-warning rounded-lg flex items-center justify-center">
          <BookOpen className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">AI Lab Manual</h2>
          <p className="text-muted-foreground">Interactive documentation with intelligent support</p>
        </div>
      </div>

      {/* AI Assistant */}
      <Card className="bg-gradient-to-r from-warning/5 to-primary/5 border-warning/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-warning" />
            <span>AI Lab Assistant</span>
          </CardTitle>
          <CardDescription>
            Ask questions about procedures, formulations, or testing methods
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about cement chemistry, testing procedures, mix design..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAiQuery()}
            />
            <Button 
              onClick={handleAiQuery}
              disabled={isProcessing || !aiQuery.trim()}
              className="lab-button"
            >
              {isProcessing ? (
                <Brain className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
            </Button>
          </div>
          
          {aiResponse && (
            <div className="p-4 bg-white/70 rounded-lg border border-warning/20">
              <div className="flex items-start space-x-3">
                <Brain className="h-5 w-5 text-warning mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-foreground mb-2">AI Response</h4>
                  <p className="text-sm text-foreground leading-relaxed">{aiResponse}</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Quick Questions */}
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setAiQuery("What is the optimal water-cement ratio?");
                handleAiQuery();
              }}
              className="text-xs"
            >
              W/C Ratio Guidelines
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setAiQuery("How to perform slump test correctly?");
                handleAiQuery();
              }}
              className="text-xs"
            >
              Slump Test Procedure
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                setAiQuery("What admixtures improve workability?");
                handleAiQuery();
              }}
              className="text-xs"
            >
              Workability Admixtures
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Search and Categories */}
      <Card className="card-gradient">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search manual sections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex space-x-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Manual Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Accordion type="single" collapsible className="space-y-4">
            {filteredSections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <Card className="card-gradient shadow-elegant">
                  <AccordionTrigger className="px-6 py-4 hover:no-underline">
                    <div className="flex items-center space-x-3 text-left">
                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        {section.category === 'Chemistry' && <Microscope className="h-4 w-4 text-primary" />}
                        {section.category === 'Testing' && <Beaker className="h-4 w-4 text-primary" />}
                        {section.category === 'Mix Design' && <Calculator className="h-4 w-4 text-primary" />}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{section.title}</h3>
                        <Badge variant="outline" className="mt-1">{section.category}</Badge>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="space-y-4">
                      <p className="text-muted-foreground leading-relaxed">{section.content}</p>
                      
                      {section.procedures && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                            <ClipboardList className="h-4 w-4" />
                            <span>Procedure</span>
                          </h4>
                          <ol className="space-y-1">
                            {section.procedures.map((step, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm">
                                <span className="flex-shrink-0 w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center text-xs font-medium">
                                  {index + 1}
                                </span>
                                <span className="text-muted-foreground">{step}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                      
                      {section.formulas && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                            <Calculator className="h-4 w-4" />
                            <span>Key Formulas</span>
                          </h4>
                          <ul className="space-y-1">
                            {section.formulas.map((formula, index) => (
                              <li key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-success flex-shrink-0" />
                                <code className="bg-muted px-2 py-1 rounded text-foreground">{formula}</code>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {section.tips && (
                        <div>
                          <h4 className="font-medium text-foreground mb-2 flex items-center space-x-2">
                            <Lightbulb className="h-4 w-4" />
                            <span>Important Tips</span>
                          </h4>
                          <ul className="space-y-1">
                            {section.tips.map((tip, index) => (
                              <li key={index} className="flex items-start space-x-2 text-sm">
                                <AlertCircle className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
                                <span className="text-muted-foreground">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </Card>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Quick Reference Sidebar */}
        <div className="space-y-4">
          <Card className="card-gradient">
            <CardHeader>
              <CardTitle className="text-lg">Quick Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Standard Test Ages</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• 7 days: Early strength</li>
                  <li>• 28 days: Standard strength</li>
                  <li>• 56/91 days: Long-term</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Typical W/C Ratios</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Normal: 0.45-0.60</li>
                  <li>• High-strength: 0.35-0.45</li>
                  <li>• Mass concrete: 0.50-0.70</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Slump Classifications</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Very low: 0-25mm</li>
                  <li>• Low: 25-50mm</li>
                  <li>• Medium: 50-100mm</li>
                  <li>• High: 100-150mm</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-primary/5 border-success/20">
            <CardContent className="pt-6">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
                <h4 className="font-semibold text-foreground mb-2">Best Practices</h4>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li>• Always follow standard procedures</li>
                  <li>• Document all test conditions</li>
                  <li>• Verify equipment calibration</li>
                  <li>• Report results promptly</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LabManualTab;