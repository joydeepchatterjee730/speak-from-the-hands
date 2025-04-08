
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Mic, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

const TextToSignDemo = () => {
  const [inputText, setInputText] = useState("");
  const [isAnimating, setIsAnimating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsAnimating(true);
    }, 1500);
  };

  const resetDemo = () => {
    setInputText("");
    setIsAnimating(false);
  };

  return (
    <section id="text-to-sign" className="py-20 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Text to Sign Language</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Input text or speak, and our AI will generate realistic sign language animations through an avatar.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <Card className="glass-card h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="font-medium text-gray-500 mb-4">Enter text to convert to sign language:</h3>
                
                <Textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message here..."
                  className="resize-none min-h-[120px] bg-white"
                  disabled={isAnimating || isProcessing}
                />
              </div>
              
              <div className="p-6 border-t border-gray-100">
                <div className="flex gap-3">
                  {!isAnimating && !isProcessing ? (
                    <>
                      <Button 
                        className="btn-primary flex-grow" 
                        onClick={handleTextSubmit}
                        disabled={!inputText.trim()}
                      >
                        <Send size={18} className="mr-2" />
                        <span>Translate to Sign</span>
                      </Button>
                      <Button variant="outline" className="btn-secondary">
                        <Mic size={18} />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="outline" 
                      className="btn-secondary flex-grow"
                      onClick={resetDemo}
                      disabled={isProcessing}
                    >
                      <RefreshCw size={18} className="mr-2" />
                      <span>Try Another</span>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          </div>
          
          <div>
            <Card className="glass-card overflow-hidden h-full">
              <div className="aspect-[4/3] bg-gradient-to-r from-gray-100 to-gray-200 relative">
                {isProcessing && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <RefreshCw size={48} className="text-sign-blue mb-3 animate-spin" />
                    <p className="text-gray-700">Generating sign language...</p>
                  </div>
                )}
                
                {!isProcessing && !isAnimating && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="text-7xl mb-4">🧍</div>
                    <p className="text-gray-500">Enter text to see sign language animation</p>
                  </div>
                )}
                
                {isAnimating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-8xl md:text-9xl animate-hand-wave inline-block">👋</div>
                      <div className="text-8xl md:text-9xl inline-block ml-6">🙂</div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                {isAnimating && (
                  <div className="text-center">
                    <p className="text-gray-700 font-medium">
                      {inputText}
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextToSignDemo;
