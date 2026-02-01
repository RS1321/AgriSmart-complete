import { Leaf, Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card py-16 border-t border-border">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-serif text-xl font-semibold text-foreground">
                AgriSmart <span className="text-accent">AI</span>
              </span>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Empowering farmers with data-driven insights and AI-powered recommendations
              for sustainable agriculture and maximum crop yield.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2">
              <li>
                <a href="#predict" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Crop Prediction
                </a>
              </li>
              <li>
                <a href="#ai-assistant" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  AI Agronomist
                </a>
              </li>
              <li>
                <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Statistics
                </a>
              </li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Technology</h4>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">React.js</li>
              <li className="text-sm text-muted-foreground">Python Flask</li>
              <li className="text-sm text-muted-foreground">Random Forest ML</li>
              <li className="text-sm text-muted-foreground">Google Gemini API</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            Made with 💚 by <span className="font-medium text-foreground">Rahul Sudarshan</span>
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/RS1321"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
