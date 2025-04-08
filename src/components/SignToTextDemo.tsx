
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Play, RefreshCw, Volume2 } from "lucide-react";

const SignToTextDemo = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [loading, setLoading] = useState(false);

  const startRecording = () => {
    setIsRecording(true);
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setHasResult(true);
    }, 3000);
  };

  const resetDemo = () => {
    setIsRecording(false);
    setHasResult(false);
  };

  return (
    <section id="sign-to-text" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sign Language to Text & Speech</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our AI model recognizes sign language in real-time and converts it to text and speech, enabling seamless communication.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="glass-card overflow-hidden h-full">
              <div className="aspect-[4/3] bg-gradient-to-r from-gray-100 to-gray-200 relative">
                {isRecording && !hasResult && (
                  <div className="absolute top-4 left-4 glass-card px-3 py-2 text-sm flex items-center gap-2 animate-pulse">
                    <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                    <span>Recording...</span>
                  </div>
                )}
                
                {!isRecording && !hasResult && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera size={48} className="text-gray-400 mb-3" />
                    <p className="text-gray-500">Start recording to translate sign language</p>
                  </div>
                )}
                
                {isRecording && loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <RefreshCw size={48} className="text-sign-blue mb-3 animate-spin" />
                    <p className="text-gray-700">Processing sign language...</p>
                  </div>
                )}
                
                {hasResult && (
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-9xl md:text-[12rem] animate-hand-wave">👋</div>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex justify-center">
                {!isRecording && !hasResult ? (
                  <Button onClick={startRecording} className="btn-primary">
                    <Camera size={18} className="mr-2" />
                    Start Translating
                  </Button>
                ) : (
                  <Button onClick={resetDemo} variant="outline" className="btn-secondary">
                    <RefreshCw size={18} className="mr-2" />
                    Try Again
                  </Button>
                )}
              </div>
            </Card>
          </div>
          
          <div className="flex flex-col">
            <Card className="glass-card h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="font-medium text-gray-500 mb-4">Translated Result:</h3>
                
                {hasResult ? (
                  <div>
                    <p className="text-2xl md:text-3xl font-medium mb-4">Hello, how are you today?</p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>Confidence: 98%</span>
                      <span>•</span>
                      <span>American Sign Language (ASL)</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-400 italic">
                      {loading ? "Translating sign language..." : "Sign language translation will appear here"}
                    </p>
                  </div>
                )}
              </div>
              
              {hasResult && (
                <div className="p-6 border-t border-gray-100">
                  <div className="flex gap-3">
                    <Button className="flex items-center gap-2">
                      <Volume2 size={18} />
                      <span>Speak</span>
                    </Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Play size={18} />
                      <span>Playback</span>
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignToTextDemo;
