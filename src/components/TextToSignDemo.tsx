
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Send, Mic, RefreshCw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import VideoAvatar from "./VideoAvatar";

const TextToSignDemo = () => {
  const [inputText, setInputText] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [signLanguageType, setSignLanguageType] = useState("American Sign Language (ASL)");

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setDisplayText(inputText);
    }, 1500);
  };

  const handleVoiceInput = () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("Your browser doesn't support microphone access");
      return;
    }
    
    setIsProcessing(true);
    
    // Request microphone access
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(() => {
        // Simulate speech recognition
        setTimeout(() => {
          const demoTexts = [
            "Hello, how are you today?",
            "Thank you for using DeafEars",
            "Can you help me with directions?",
            "It's nice to meet you"
          ];
          const randomText = demoTexts[Math.floor(Math.random() * demoTexts.length)];
          setInputText(randomText);
          setDisplayText(randomText);
          setIsProcessing(false);
        }, 2000);
      })
      .catch(err => {
        console.error("Error accessing microphone:", err);
        setIsProcessing(false);
        alert("Could not access your microphone. Please check permissions.");
      });
  };

  const resetDemo = () => {
    setInputText("");
    setDisplayText("");
    setIsProcessing(false);
  };

  return (
    <section id="text-to-sign" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Text to Sign Language</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Input text or speak, and our AI will generate realistic sign language animations through an avatar.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <Card className="glass-card h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="font-medium text-muted-foreground mb-4">Enter text to convert to sign language:</h3>
                
                <Textarea 
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type your message here..."
                  className="resize-none min-h-[120px] bg-card"
                  disabled={isProcessing}
                />
              </div>
              
              <div className="p-6 border-t border-border">
                <div className="flex gap-3">
                  {!displayText ? (
                    <>
                      <Button 
                        className="btn-primary flex-grow" 
                        onClick={handleTextSubmit}
                        disabled={!inputText.trim() || isProcessing}
                      >
                        <Send size={18} className="mr-2" />
                        <span>Translate to Sign</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        className="btn-secondary"
                        onClick={handleVoiceInput}
                        disabled={isProcessing}
                      >
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
              <div className="p-4 h-full flex flex-col">
                <VideoAvatar 
                  text={displayText}
                  isProcessing={isProcessing}
                  signLanguageType={signLanguageType}
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextToSignDemo;
