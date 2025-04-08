
import React, { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";
import { Camera, Mic, MessageSquare, Video, Share2, Plus, Save, RefreshCw } from "lucide-react";
import VideoAvatar from "@/components/VideoAvatar";
import { useToast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("translate");
  const [isRecording, setIsRecording] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [translatedText, setTranslatedText] = useState("");
  const [customSigns, setCustomSigns] = useState<{gesture: string, meaning: string}[]>([
    { gesture: "👌", meaning: "I understand" },
    { gesture: "👍", meaning: "Yes, that's correct" },
    { gesture: "✌️", meaning: "Peace, I'm friendly" }
  ]);
  const [newGesture, setNewGesture] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Generate a random room ID
  const generateRoomId = () => {
    return Math.random().toString(36).substring(2, 10);
  };

  const startCamera = async () => {
    try {
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
        
        toast({
          title: "Camera activated",
          description: "Your camera is now ready for sign language translation"
        });
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast({
        title: "Permission Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setCameraActive(false);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startTranslating = () => {
    if (!cameraActive) {
      startCamera();
      return;
    }

    setIsRecording(true);
    setIsProcessing(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      const demoTexts = [
        "Hello, nice to meet you",
        "Can you help me with directions?",
        "Thank you for your assistance",
        "I would like to order food please"
      ];
      setTranslatedText(demoTexts[Math.floor(Math.random() * demoTexts.length)]);
    }, 3000);
  };

  const stopTranslating = () => {
    setIsRecording(false);
  };

  const resetTranslation = () => {
    setIsRecording(false);
    setTranslatedText("");
    stopCamera();
  };

  const handleTextSubmit = () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setTranslatedText(inputText);
    }, 1500);
  };

  const addCustomSign = () => {
    if (!newGesture.trim() || !newMeaning.trim()) return;
    
    setCustomSigns([...customSigns, {
      gesture: newGesture,
      meaning: newMeaning
    }]);
    
    setNewGesture("");
    setNewMeaning("");
    
    toast({
      title: "Custom sign added",
      description: `New sign "${newGesture}" added successfully`
    });
  };

  const createNewCall = () => {
    const roomId = generateRoomId();
    navigate(`/video-call/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Welcome to DeafEars</h1>
              <p className="text-muted-foreground mt-2">Start translating sign language or create a new video call</p>
            </div>
            <Button 
              className="btn-primary mt-4 md:mt-0"
              onClick={createNewCall}
            >
              <Video size={18} className="mr-2" />
              Start New Video Call
            </Button>
          </div>
          
          <Tabs defaultValue="translate" value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-3 md:w-[400px]">
              <TabsTrigger value="translate">Translate</TabsTrigger>
              <TabsTrigger value="custom-signs">Custom Signs</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="translate" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Sign to Text Panel */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Sign Language to Text</CardTitle>
                    <CardDescription>Use your camera to translate sign language to text</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="aspect-video bg-card rounded-lg relative overflow-hidden">
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
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <Camera size={48} className="text-muted-foreground mb-3" />
                          <p className="text-muted-foreground">Click below to enable camera</p>
                        </div>
                      )}
                      
                      {isProcessing && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10">
                          <RefreshCw size={48} className="text-primary mb-3 animate-spin" />
                          <p className="text-foreground">Processing sign language...</p>
                        </div>
                      )}
                    </div>
                    
                    {!isRecording ? (
                      <Button 
                        onClick={startTranslating} 
                        className="w-full"
                      >
                        <Camera size={18} className="mr-2" />
                        {cameraActive ? 'Start Translating' : 'Enable Camera'}
                      </Button>
                    ) : (
                      <div className="flex gap-3">
                        <Button 
                          onClick={stopTranslating}
                          variant="destructive"
                          className="flex-1"
                        >
                          Stop Recording
                        </Button>
                        <Button 
                          onClick={resetTranslation}
                          variant="outline"
                          className="flex-1"
                        >
                          Reset
                        </Button>
                      </div>
                    )}
                    
                    {translatedText && (
                      <div className="mt-4 p-4 border border-border rounded-lg bg-muted/30">
                        <p className="font-medium text-lg">{translatedText}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                          <span>American Sign Language (ASL)</span>
                          <span>•</span>
                          <span>Confidence: 94%</span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Text to Sign Panel */}
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle>Text to Sign Language</CardTitle>
                    <CardDescription>Convert text into sign language visualization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="text-input">Enter text to convert</Label>
                      <div className="flex gap-2 mt-2">
                        <Input 
                          id="text-input"
                          placeholder="Type here..."
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          disabled={isProcessing || !!translatedText}
                          className="bg-card border-border"
                        />
                        <Button 
                          onClick={handleTextSubmit}
                          disabled={!inputText.trim() || isProcessing || !!translatedText}
                        >
                          <MessageSquare size={18} />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="aspect-video bg-card rounded-lg overflow-hidden">
                      <VideoAvatar 
                        text={translatedText}
                        isProcessing={isProcessing}
                      />
                    </div>
                    
                    {translatedText && (
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setTranslatedText("");
                          setInputText("");
                        }}
                      >
                        <RefreshCw size={18} className="mr-2" />
                        Try Another
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Recent Translations</CardTitle>
                  <CardDescription>Your translation history from the current session</CardDescription>
                </CardHeader>
                <CardContent>
                  {translatedText ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-3 rounded-md bg-muted/30 border border-border">
                        <div>
                          <p className="font-medium">{translatedText}</p>
                          <p className="text-sm text-muted-foreground">Just now</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Share2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No recent translations</p>
                      <p className="text-sm text-muted-foreground mt-1">Translations will appear here after you use the translator</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="custom-signs" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Custom Signs</CardTitle>
                  <CardDescription>Create and manage your personalized sign language gestures</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Add new custom sign */}
                    <div className="p-4 border border-border rounded-lg space-y-4">
                      <h3 className="font-medium">Add New Custom Sign</h3>
                      <div>
                        <Label htmlFor="gesture">Gesture/Symbol</Label>
                        <Input 
                          id="gesture"
                          placeholder="👋" 
                          value={newGesture}
                          onChange={(e) => setNewGesture(e.target.value)}
                          className="bg-card border-border mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="meaning">Meaning</Label>
                        <Input 
                          id="meaning"
                          placeholder="Hello" 
                          value={newMeaning}
                          onChange={(e) => setNewMeaning(e.target.value)}
                          className="bg-card border-border mt-1"
                        />
                      </div>
                      <Button
                        onClick={addCustomSign}
                        disabled={!newGesture.trim() || !newMeaning.trim()}
                        className="w-full"
                      >
                        <Plus size={16} className="mr-2" />
                        Add Custom Sign
                      </Button>
                    </div>
                    
                    {/* Custom signs list */}
                    <div className="p-4 border border-border rounded-lg">
                      <h3 className="font-medium mb-3">Your Custom Signs</h3>
                      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                        {customSigns.map((sign, index) => (
                          <div 
                            key={index} 
                            className="flex items-center justify-between p-3 rounded-md bg-muted/30"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{sign.gesture}</span>
                              <span className="font-medium">{sign.meaning}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Save size={16} className="mr-2" />
                    Save All Custom Signs
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your profile and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Display Name</Label>
                    <Input 
                      id="username" 
                      defaultValue="User" 
                      className="bg-card border-border"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Sign Language</Label>
                    <select 
                      id="language"
                      defaultValue="asl"
                      className="w-full h-10 px-3 rounded-md border border-border bg-card"
                    >
                      <option value="asl">American Sign Language (ASL)</option>
                      <option value="bsl">British Sign Language (BSL)</option>
                      <option value="auslan">Australian Sign Language (Auslan)</option>
                      <option value="isl">International Sign Language</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="voice">Text-to-Speech Voice</Label>
                    <select 
                      id="voice"
                      defaultValue="en-us-1"
                      className="w-full h-10 px-3 rounded-md border border-border bg-card"
                    >
                      <option value="en-us-1">English (US) - Female</option>
                      <option value="en-us-2">English (US) - Male</option>
                      <option value="en-gb-1">English (UK) - Female</option>
                      <option value="en-gb-2">English (UK) - Male</option>
                    </select>
                  </div>
                  <Button className="w-full mt-4">
                    <Save size={16} className="mr-2" />
                    Save Settings
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Device Settings</CardTitle>
                  <CardDescription>Configure camera and microphone access</CardDescription>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={startCamera} className="flex gap-2">
                    <Camera size={16} />
                    Test Camera
                  </Button>
                  <Button variant="outline" className="flex gap-2">
                    <Mic size={16} />
                    Test Microphone
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
