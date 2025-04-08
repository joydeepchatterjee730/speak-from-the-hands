
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Phone, MicOff, VideoOff, Mic, Settings, X } from "lucide-react";

const VideoCallDemo = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isVideoOn, setIsVideoOn] = useState(true);

  const startCall = () => {
    setIsCallActive(true);
  };

  const endCall = () => {
    setIsCallActive(false);
    setIsMicOn(true);
    setIsVideoOn(true);
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
  };

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn);
  };

  return (
    <section id="video-call" className="py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Video Call with Sign Language Translation</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience seamless video calls where sign language is automatically translated into speech and vice versa in real-time.
          </p>
        </div>
        
        <div className="glass-card p-4 md:p-6 overflow-hidden">
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            <div className="relative aspect-video bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden">
              {!isCallActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👩‍💻</div>
                  <p className="text-white/80">Start call to connect</p>
                </div>
              )}
              
              {isCallActive && (
                <>
                  {isVideoOn ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-8xl">🧏‍♀️</div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <VideoOff size={48} className="text-white/60" />
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
            
            <div className="relative aspect-video bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl overflow-hidden">
              {!isCallActive && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-7xl mb-4">👨‍💼</div>
                  <p className="text-white/80">Waiting for call...</p>
                </div>
              )}
              
              {isCallActive && (
                <>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl">🙋‍♂️</div>
                  </div>
                  <div className="absolute top-3 left-3 glass-card bg-black/60 px-3 py-1 text-sm text-white rounded-full">
                    John (Voice)
                  </div>
                  <div className="absolute bottom-3 left-3 glass-card bg-sign-blue/80 px-3 py-1 text-sm text-white rounded-lg max-w-[80%]">
                    <p>Hi there! How can I help you today?</p>
                  </div>
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
                  className={`rounded-full w-12 h-12 p-0 ${!isMicOn ? 'bg-gray-200' : 'bg-white'}`}
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
                  className={`rounded-full w-12 h-12 p-0 ${!isVideoOn ? 'bg-gray-200' : 'bg-white'}`}
                  onClick={toggleVideo}
                >
                  {isVideoOn ? <Video size={18} /> : <VideoOff size={18} />}
                </Button>
                <Button 
                  variant="outline" 
                  className="rounded-full w-12 h-12 p-0 bg-white"
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
