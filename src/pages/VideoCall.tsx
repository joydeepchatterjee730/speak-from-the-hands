
import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Phone, MicOff, VideoOff, Mic, Settings, X, Share2, Copy, Check, ArrowLeft } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import VideoAvatar from "@/components/VideoAvatar";

const VideoCall = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [callHistory, setCallHistory] = useState<string[]>([]);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  const [contactName, setContactName] = useState("John");
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Pre-defined messages for the demo
  const demoMessages = [
    "Hi there! How can I help you today?",
    "I understand. Could you tell me more about your needs?",
    "That's interesting. Let me check what options we have.",
    "I think we can definitely assist with that.",
    "Let me know if you have any other questions.",
    "Is there anything else you'd like to discuss?"
  ];

  useEffect(() => {
    // If there's a room ID, try to join the call automatically
    if (roomId) {
      startCall();
      
      // Add to call history from localStorage if available
      const history = JSON.parse(localStorage.getItem('callHistory') || '[]');
      setCallHistory(history);
    }
    
    // Clean up camera stream when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId]);

  useEffect(() => {
    if (isCallActive) {
      // Generate a demo message every few seconds
      const interval = setInterval(() => {
        if (messageIndex < demoMessages.length) {
          setMessages(prev => [...prev, demoMessages[messageIndex]]);
          setMessageIndex(prev => prev + 1);
        } else {
          clearInterval(interval);
        }
      }, 7000);

      return () => clearInterval(interval);
    }
  }, [isCallActive, messageIndex]);

  const startCamera = async () => {
    try {
      const constraints = { 
        video: isVideoOn,
        audio: isMicOn
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera/microphone:", err);
      toast({
        title: "Permission Error",
        description: "Could not access your camera or microphone. Please check permissions.",
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

  const startCall = () => {
    // Start camera and set call active
    startCamera();
    setIsCallActive(true);
    
    // Save this person to call history
    const newHistory = [...callHistory];
    if (!newHistory.includes(contactName)) {
      newHistory.push(contactName);
      setCallHistory(newHistory);
      localStorage.setItem('callHistory', JSON.stringify(newHistory));
    }
    
    toast({
      title: "Call Connected",
      description: `You are now in a call with ${contactName}`,
    });
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMicOn(true);
    setIsVideoOn(true);
    setMessages([]);
    setMessageIndex(0);
    stopCamera();
    navigate('/');
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach(track => {
        track.enabled = !isMicOn;
      });
    }
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
    if (isVideoOn) {
      // Turning video off
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach(track => {
          track.enabled = false;
        });
      }
    } else {
      // Turning video on
      if (streamRef.current) {
        streamRef.current.getVideoTracks().forEach(track => {
          track.enabled = true;
        });
      } else {
        // If stream doesn't exist, restart camera
        startCamera();
      }
    }
  };

  const copyLink = () => {
    const link = `${window.location.origin}/video-call/${roomId}`;
    navigator.clipboard.writeText(link);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Video call link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background pt-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              className="mr-2"
              onClick={() => navigate('/')}
            >
              <ArrowLeft size={18} className="mr-2" />
              Back
            </Button>
            <h1 className="text-2xl font-bold">Video Call</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={copyLink}
              className="flex gap-1 items-center"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Copied" : "Share Link"}
            </Button>
          </div>
        </div>

        <div className="glass-card p-4 md:p-6 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative aspect-video bg-card rounded-xl overflow-hidden">
              {isCallActive ? (
                <>
                  {isVideoOn ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <VideoOff size={64} className="text-muted-foreground" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 glass-card bg-black/60 px-3 py-1 text-sm text-white rounded-full">
                    You (Sign Language)
                  </div>
                  {!isMicOn && (
                    <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-red-500/90 flex items-center justify-center">
                      <MicOff size={18} className="text-white" />
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👩‍💻</div>
                  <p className="text-muted-foreground">Camera preview will appear here</p>
                  <Button onClick={startCall} className="mt-4 btn-primary">
                    <Phone size={18} className="mr-2" />
                    <span>Join Call</span>
                  </Button>
                </div>
              )}
            </div>
            
            <div className="relative aspect-video bg-card rounded-xl overflow-hidden">
              {isCallActive ? (
                <>
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <VideoAvatar 
                      text={messages.length > 0 ? messages[messages.length - 1] : ""} 
                      isProcessing={false}
                    />
                  </div>
                  <div className="absolute top-3 left-3 glass-card bg-black/60 px-3 py-1 text-sm text-white rounded-full">
                    {contactName} (Voice)
                  </div>
                  {messages.length > 0 && (
                    <div className="absolute bottom-3 left-3 glass-card bg-sign-blue/80 px-3 py-1 text-sm text-white rounded-lg max-w-[80%]">
                      <p>{messages[messages.length - 1]}</p>
                    </div>
                  )}
                </>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👨‍💼</div>
                  <p className="text-muted-foreground">Waiting for call to connect...</p>
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            {isCallActive && (
              <div className="flex gap-4">
                <Button 
                  variant="outline" 
                  className={`rounded-full w-12 h-12 p-0 ${!isMicOn ? 'bg-muted' : 'bg-muted/50'}`}
                  onClick={toggleMic}
                >
                  {isMicOn ? <Mic size={18} /> : <MicOff size={18} />}
                </Button>
                <Button 
                  onClick={endCall} 
                  className="rounded-full w-12 h-12 p-0 bg-red-500 hover:bg-red-600 text-white"
                >
                  <X size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  className={`rounded-full w-12 h-12 p-0 ${!isVideoOn ? 'bg-muted' : 'bg-muted/50'}`}
                  onClick={toggleVideo}
                >
                  {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full w-12 h-12 p-0 bg-muted/50"
                >
                  <Settings size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>

        {isCallActive && callHistory.length > 0 && (
          <Card className="mt-8 p-6">
            <h2 className="text-lg font-medium mb-4">Call History</h2>
            <ul className="space-y-2">
              {callHistory.map((name, i) => (
                <li key={i} className="flex items-center justify-between p-2 rounded hover:bg-muted">
                  <span>{name}</span>
                  <span className="text-sm text-muted-foreground">Recent call</span>
                </li>
              ))}
            </ul>
          </Card>
        )}
      </div>
    </div>
  );
};

export default VideoCall;
