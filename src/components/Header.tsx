
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Settings, Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-white/80 backdrop-blur-md z-50 fixed top-0 left-0 right-0 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <span className="absolute inset-0 flex items-center justify-center text-3xl animate-hand-wave">👋</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold gradient-text">Speak from the Hands</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#sign-to-text" className="text-gray-700 hover:text-sign-blue transition-colors">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <span>Sign to Text</span>
            </div>
          </a>
          <a href="#text-to-sign" className="text-gray-700 hover:text-sign-blue transition-colors">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="transform rotate-180" />
              <span>Text to Sign</span>
            </div>
          </a>
          <a href="#video-call" className="text-gray-700 hover:text-sign-blue transition-colors">
            <div className="flex items-center gap-2">
              <Video size={18} />
              <span>Video Call</span>
            </div>
          </a>
          <Button className="btn-primary">
            <Settings size={18} className="mr-2" />
            <span>Try Now</span>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-700 hover:text-sign-blue p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md py-4 px-6 flex flex-col space-y-4">
          <a 
            href="#sign-to-text" 
            className="text-gray-700 hover:text-sign-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <span>Sign to Text</span>
            </div>
          </a>
          <a 
            href="#text-to-sign" 
            className="text-gray-700 hover:text-sign-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="transform rotate-180" />
              <span>Text to Sign</span>
            </div>
          </a>
          <a 
            href="#video-call" 
            className="text-gray-700 hover:text-sign-blue transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <Video size={18} />
              <span>Video Call</span>
            </div>
          </a>
          <Button className="btn-primary w-full justify-center">
            <Settings size={18} className="mr-2" />
            <span>Try Now</span>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
