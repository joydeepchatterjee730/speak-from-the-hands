
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Play, RefreshCw, Volume2, StopCircle } from "lucide-react";

const SignToTextDemo = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasResult, setHasResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Clean up camera stream when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("Could not access your camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  };

  const startRecording = () => {
    if (!cameraActive) {
      startCamera();
      return;
    }
    
    setIsRecording(true);
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setHasResult(true);
      setTranslatedText("Hello, how are you today?");
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setLoading(false);
      setHasResult(true);
    }, 1500);
  };

  const resetDemo = () => {
    setIsRecording(false);
    setHasResult(false);
    setTranslatedText("");
    stopCamera();
  };

  const speakText = () => {
    if ('speechSynthesis' in window && translatedText) {
      const utterance = new SpeechSynthesisUtterance(translatedText);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="sign-to-text" className="py-20 px-4 md:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sign Language to Text & Speech</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our AI model recognizes sign language in real-time and converts it to text and speech, enabling seamless communication.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card className="glass-card overflow-hidden h-full">
              <div className="aspect-[4/3] bg-background relative">
                {isRecording && (
                  <div className="absolute top-4 left-4 glass-card px-3 py-2 text-sm flex items-center gap-2 animate-pulse z-10">
                    <span className="h-3 w-3 bg-red-500 rounded-full"></span>
                    <span className="text-white">Recording...</span>
                  </div>
                )}
                
                {cameraActive ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted 
                    className="w-full h-full object-cover bg-muted" 
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <Camera size={48} className="text-muted-foreground mb-3" />
                    <p className="text-muted-foreground">Start recording to translate sign language</p>
                  </div>
                )}
                
                {loading && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                    <RefreshCw size={48} className="text-primary mb-3 animate-spin" />
                    <p className="text-foreground">Processing sign language...</p>
                  </div>
                )}
              </div>
              
              <div className="p-4 flex justify-center">
                {!isRecording ? (
                  <Button onClick={startRecording} className="btn-primary">
                    <Camera size={18} className="mr-2" />
                    {cameraActive ? 'Start Translating' : 'Enable Camera'}
                  </Button>
                ) : (
                  <Button onClick={stopRecording} className="bg-red-600 hover:bg-red-700 text-white flex items-center gap-2">
                    <StopCircle size={18} />
                    Stop Recording
                  </Button>
                )}
                
                {(cameraActive || hasResult) && (
                  <Button onClick={resetDemo} variant="outline" className="btn-secondary ml-3">
                    <RefreshCw size={18} className="mr-2" />
                    Reset
                  </Button>
                )}
              </div>
            </Card>
          </div>
          
          <div className="flex flex-col">
            <Card className="glass-card h-full flex flex-col">
              <div className="p-6 flex-grow">
                <h3 className="font-medium text-muted-foreground mb-4">Translated Result:</h3>
                
                {hasResult ? (
                  <div>
                    <p className="text-2xl md:text-3xl font-medium mb-4">{translatedText}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Confidence: 98%</span>
                      <span>•</span>
                      <span>American Sign Language (ASL)</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-muted-foreground italic">
                      {loading ? "Translating sign language..." : "Sign language translation will appear here"}
                    </p>
                  </div>
                )}
              </div>
              
              {hasResult && (
                <div className="p-6 border-t border-border">
                  <div className="flex gap-3">
                    <Button 
                      className="flex items-center gap-2"
                      onClick={speakText}
                    >
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
