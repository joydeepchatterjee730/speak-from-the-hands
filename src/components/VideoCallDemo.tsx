
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Phone, MicOff, VideoOff, Mic, Settings, X, Share2, Copy, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import VideoAvatar from "./VideoAvatar";

const VideoCallDemo = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [cameraActive, setCameraActive] = useState(false);
  const [roomLink, setRoomLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [messageIndex, setMessageIndex] = useState(0);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Pre-defined messages for the demo
  const demoMessages = [
    "Hi there! How can I help you today?",
    "I understand. Could you tell me more about your needs?",
    "That's interesting. Let me check what options we have.",
    "I think we can definitely assist with that."
  ];

  useEffect(() => {
    // Clean up camera stream when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

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
      }, 5000);

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
    // Generate a random room ID
    const roomId = Math.random().toString(36).substring(2, 10);
    const link = `${window.location.origin}/video-call/${roomId}`;
    setRoomLink(link);
    
    // Start camera and set call active
    startCamera();
    setIsCallActive(true);
    
    toast({
      title: "Call Started",
      description: "You can share the link with others to join this call.",
    });
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMicOn(true);
    setIsVideoOn(true);
    setMessages([]);
    setMessageIndex(0);
    stopCamera();
    setRoomLink("");
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
    navigator.clipboard.writeText(roomLink);
    setCopied(true);
    toast({
      title: "Link Copied!",
      description: "Video call link copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const goToFullCall = () => {
    if (roomLink) {
      const roomId = roomLink.split('/').pop();
      navigate(`/video-call/${roomId}`);
    }
  };

  return (
    <section id="video-call" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Call with Sign Language Translation</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience seamless video calls where sign language is automatically translated into speech and vice versa in real-time.
          </p>
        </div>
        
        <div className="glass-card p-4 md:p-6 overflow-hidden">
          {isCallActive && roomLink && (
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 p-3 rounded-lg bg-muted">
              <div className="flex items-center">
                <span className="text-sm text-muted-foreground mr-2">Shareable link:</span>
                <span className="text-sm font-medium truncate max-w-[250px] md:max-w-md">{roomLink}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={copyLink}
                  className="flex gap-1 items-center"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={goToFullCall}
                  className="flex gap-1 items-center"
                >
                  <Share2 size={14} />
                  Open Full Call
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative aspect-video bg-card rounded-xl overflow-hidden">
              {!isCallActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👩‍💻</div>
                  <p className="text-muted-foreground">Start call to connect</p>
                </div>
              )}
              
              {isCallActive && (
                <>
                  {isVideoOn ? (
                    <video 
                      ref={videoRef} 
                      autoPlay 
                      playsInline 
                      muted 
                      className="w-full h-full object-cover bg-muted" 
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-muted">
                      <VideoOff size={48} className="text-muted-foreground" />
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
              )}
            </div>
            
            <div className="relative aspect-video bg-card rounded-xl overflow-hidden">
              {!isCallActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👨‍💼</div>
                  <p className="text-muted-foreground">Waiting for call...</p>
                </div>
              )}
              
              {isCallActive && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <VideoAvatar 
                      text={messages.length > 0 ? messages[messages.length - 1] : ""} 
                      isProcessing={false}
                    />
                  </div>
                  <div className="absolute top-3 left-3 glass-card bg-black/60 px-3 py-1 text-sm text-white rounded-full">
                    John (Voice)
                  </div>
                  {messages.length > 0 && (
                    <div className="absolute bottom-3 left-3 glass-card bg-sign-blue/80 px-3 py-1 text-sm text-white rounded-lg max-w-[80%]">
                      <p>{messages[messages.length - 1]}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex justify-center">
            {!isCallActive ? (
              <Button onClick={startCall} className="btn-primary">
                <Phone size={18} className="mr-2" />
                <span>Start Demo Call</span>
              </Button>
            ) : (
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
                  onClick={goToFullCall}
                >
                  <Settings size={18} />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoCallDemo;
