
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, Video, Headphones, Menu, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="w-full py-4 px-4 md:px-8 bg-card/80 backdrop-blur-md z-50 fixed top-0 left-0 right-0 shadow-sm border-b border-border">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <div className="relative h-10 w-10 mr-2">
            <span className="absolute inset-0 flex items-center justify-center text-3xl animate-hand-wave">🧏</span>
          </div>
          <h1 className="text-xl md:text-2xl font-bold gradient-text">DeafEars</h1>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/#sign-to-text" className="text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <span>Sign to Text</span>
            </div>
          </Link>
          <Link to="/#text-to-sign" className="text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="transform rotate-180" />
              <span>Text to Sign</span>
            </div>
          </Link>
          <Link to="/#video-call" className="text-foreground hover:text-primary transition-colors">
            <div className="flex items-center gap-2">
              <Video size={18} />
              <span>Video Call</span>
            </div>
          </Link>
          <Button 
            className="btn-primary" 
            onClick={() => navigate("/dashboard")}
          >
            <Headphones size={18} className="mr-2" />
            <span>Try Now</span>
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground hover:text-primary p-2"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-card shadow-md py-4 px-6 flex flex-col space-y-4 border-b border-border">
          <Link 
            to="/#sign-to-text" 
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} />
              <span>Sign to Text</span>
            </div>
          </Link>
          <Link 
            to="/#text-to-sign" 
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <MessageSquare size={18} className="transform rotate-180" />
              <span>Text to Sign</span>
            </div>
          </Link>
          <Link 
            to="/#video-call" 
            className="text-foreground hover:text-primary transition-colors py-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center gap-2">
              <Video size={18} />
              <span>Video Call</span>
            </div>
          </Link>
          <Button 
            className="btn-primary w-full justify-center"
            onClick={() => {
              navigate("/dashboard");
              setIsMenuOpen(false);
            }}
          >
            <Headphones size={18} className="mr-2" />
            <span>Try Now</span>
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
