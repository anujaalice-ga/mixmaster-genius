import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Beaker, Database, Brain, Shield, Sparkles, Target } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import patternBg from "@/assets/pattern-bg.jpg";

interface HomePageProps {
  onEnterApp: () => void;
}

const HomePage = ({ onEnterApp }: HomePageProps) => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        >
          <div className="absolute inset-0 hero-gradient opacity-90"></div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-20 animate-float">
          <div className="w-16 h-16 bg-white/20 rounded-xl backdrop-blur-sm animate-glow"></div>
        </div>
        <div className="absolute bottom-32 right-32 animate-float" style={{ animationDelay: '2s' }}>
          <div className="w-12 h-12 bg-accent/30 rounded-full backdrop-blur-sm"></div>
        </div>
        <div className="absolute top-1/2 right-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="w-20 h-20 bg-primary/20 rounded-2xl backdrop-blur-sm"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <div className="animate-slide-up">
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">AI-Powered</span>
              <span className="block text-primary-glow">Cement Mix Advisor</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              Revolutionize your cement laboratory with intelligent mix optimization, 
              automated testing workflows, and AI-driven quality control.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                className="lab-button text-white text-lg px-8 py-4 h-auto"
                onClick={onEnterApp}
              >
                Launch Application
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white backdrop-blur-sm hover:bg-white/20 text-lg px-8 py-4 h-auto"
              >
                View Demo
                <Sparkles className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-glow mb-2">98%</div>
              <div className="text-white/80">Accuracy Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-glow mb-2">45%</div>
              <div className="text-white/80">Time Saved</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary-glow mb-2">24/7</div>
              <div className="text-white/80">AI Assistance</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 relative">
        <div 
          className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `url(${patternBg})` }}
        ></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Intelligent Lab Management
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Streamline your cement testing workflow with advanced AI capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mix Testing */}
            <Card className="p-8 interactive-card border-0 card-gradient">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center mb-6">
                <Beaker className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Smart Mix Testing</h3>
              <p className="text-muted-foreground mb-4">
                AI agent identifies tested mixes, validates new formulations, and automates lab workflows.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Duplicate detection</li>
                <li>• Automated validation</li>
                <li>• Workflow optimization</li>
              </ul>
            </Card>

            {/* Results Management */}
            <Card className="p-8 interactive-card border-0 card-gradient">
              <div className="w-16 h-16 bg-success rounded-xl flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Results Intelligence</h3>
              <p className="text-muted-foreground mb-4">
                AI filters good and bad results automatically, streamlining production decisions.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Automated filtering</li>
                <li>• Quality scoring</li>
                <li>• Production routing</li>
              </ul>
            </Card>

            {/* Database */}
            <Card className="p-8 interactive-card border-0 card-gradient">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6">
                <Database className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Smart Database</h3>
              <p className="text-muted-foreground mb-4">
                Comprehensive test history with intelligent search and AI-powered insights.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Historical analysis</li>
                <li>• Pattern recognition</li>
                <li>• Quick search</li>
              </ul>
            </Card>

            {/* Lab Manual */}
            <Card className="p-8 interactive-card border-0 card-gradient">
              <div className="w-16 h-16 bg-warning rounded-xl flex items-center justify-center mb-6">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">AI Lab Manual</h3>
              <p className="text-muted-foreground mb-4">
                Interactive documentation with instant AI support for procedures and formulations.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Interactive guides</li>
                <li>• Instant queries</li>
                <li>• Best practices</li>
              </ul>
            </Card>

            {/* Quality Control */}
            <Card className="p-8 interactive-card border-0 card-gradient">
              <div className="w-16 h-16 bg-destructive rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Quality Assurance</h3>
              <p className="text-muted-foreground mb-4">
                Human-in-the-loop approvals ensure precision and reproducibility at every step.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Approval workflows</li>
                <li>• Quality gates</li>
                <li>• Compliance tracking</li>
              </ul>
            </Card>

            {/* Integration */}
            <Card className="p-8 interactive-card border-0 card-gradient">
              <div className="w-16 h-16 bg-primary-glow rounded-xl flex items-center justify-center mb-6">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-card-foreground">Seamless Integration</h3>
              <p className="text-muted-foreground mb-4">
                Connect with existing systems and automate requests to production departments.
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• System integration</li>
                <li>• Automated requests</li>
                <li>• Workflow automation</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 hero-gradient">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Lab?
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Join the future of cement testing with AI-powered precision and efficiency.
          </p>
          <Button 
            className="lab-button text-white text-lg px-8 py-4 h-auto"
            onClick={onEnterApp}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;