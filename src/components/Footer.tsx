
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/50 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl text-foreground">HabitFlow</span>
            </div>
            <p className="text-muted-foreground mb-4">Consistency is key to transforming your daily actions into lasting habits.</p>
            
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Features
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Pricing
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Testimonials
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Blog
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Guides
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Support
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  About Us
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Privacy Policy
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground transition-colors relative group">
                  Terms of Service
                  <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
