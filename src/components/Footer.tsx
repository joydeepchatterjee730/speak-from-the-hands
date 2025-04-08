
import React from "react";
import { Heart, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="relative h-8 w-8 mr-2">
                <span className="absolute inset-0 flex items-center justify-center text-2xl">👋</span>
              </div>
              <h2 className="text-xl font-bold gradient-text">Speak from the Hands</h2>
            </div>
            <p className="text-gray-600 mb-6 max-w-md">
              Breaking communication barriers between deaf and hearing individuals through AI-powered sign language translation.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart size={16} className="text-red-500 fill-red-500" />
              <span>for accessibility</span>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-3">
              <li><a href="#sign-to-text" className="text-gray-600 hover:text-sign-blue transition-colors">Sign to Text</a></li>
              <li><a href="#text-to-sign" className="text-gray-600 hover:text-sign-blue transition-colors">Text to Sign</a></li>
              <li><a href="#video-call" className="text-gray-600 hover:text-sign-blue transition-colors">Video Calls</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sign-blue transition-colors">Custom Signs</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sign-blue transition-colors">Sign Language Library</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-600 hover:text-sign-blue transition-colors flex items-center gap-2">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sign-blue transition-colors flex items-center gap-2">
                  <Twitter size={16} />
                  <span>Twitter</span>
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-600 hover:text-sign-blue transition-colors flex items-center gap-2">
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
              </li>
              <li><a href="#" className="text-gray-600 hover:text-sign-blue transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-sign-blue transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 text-sm text-gray-500">
          <p>© 2025 Speak from the Hands. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
