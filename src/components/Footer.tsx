
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-12">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="font-bold text-xl text-white">HabitFlow</span>
            </div>
            <p className="text-gray-400 mb-4">Consistency is key to transforming your daily actions into lasting habits.</p>
            
            <div className="flex space-x-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5 hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {[
                { to: "/features", label: "Features" },
                { to: "/pricing", label: "Pricing" },
                { to: "/#testimonials", label: "Testimonials" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { to: "/blog", label: "Blog" },
                { to: "/guides", label: "Guides" },
                { to: "/support", label: "Support" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { to: "/about", label: "About Us" },
                { to: "/privacy", label: "Privacy Policy" },
                { to: "/terms", label: "Terms of Service" },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-purple-500 transition-all group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-6 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} HabitFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
