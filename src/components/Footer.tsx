
import React from "react";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-card py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative h-8 w-8 mr-2">
                <span className="absolute inset-0 flex items-center justify-center text-2xl">🧏</span>
              </div>
              <h2 className="text-xl font-bold gradient-text">DeafEars</h2>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Breaking communication barriers between deaf and hearing individuals through AI-powered sign language translation.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>for accessibility</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-foreground">Features</h3>
            <ul className="space-y-3">
              <li><Link to="/#sign-to-text" className="text-muted-foreground hover:text-primary transition-colors">Sign to Text</Link></li>
              <li><Link to="/#text-to-sign" className="text-muted-foreground hover:text-primary transition-colors">Text to Sign</Link></li>
              <li><Link to="/#video-call" className="text-muted-foreground hover:text-primary transition-colors">Video Calls</Link></li>
              <li><Link to="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">Custom Signs</Link></li>
              <li><Link to="/how-it-works" className="text-muted-foreground hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-12 pt-6 text-sm text-muted-foreground">
          <p>© 2025 DeafEars. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
