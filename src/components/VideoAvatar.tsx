
import React, { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RefreshCw } from "lucide-react";

interface VideoAvatarProps {
  text?: string;
  isProcessing?: boolean;
  signLanguageType?: string;
}

// Mapping of common phrases to specific sign animations
const signLanguageMap: Record<string, string> = {
  "hello": "/signs/hello.gif",
  "how are you": "/signs/how-are-you.gif",
  "thank you": "/signs/thank-you.gif",
  "yes": "/signs/yes.gif",
  "no": "/signs/no.gif",
  "help": "/signs/help.gif",
  "goodbye": "/signs/goodbye.gif",
  "hello, how are you today": "/signs/full-body/greeting.gif",
  "hi there! how can i help you today": "/signs/full-body/greeting-help.gif",
  "i understand. could you tell me more about your needs?": "/signs/full-body/understand.gif",
  "that's interesting. let me check what options we have.": "/signs/full-body/interesting.gif",
  "i think we can definitely assist with that.": "/signs/full-body/assist.gif",
  "default": "/signs/full-body/avatar-idle.gif"
};

const VideoAvatar: React.FC<VideoAvatarProps> = ({ 
  text = "", 
  isProcessing = false,
  signLanguageType = "ASL"
}) => {
  const [avatarSrc, setAvatarSrc] = useState<string>("");
  
  useEffect(() => {
    if (!text || isProcessing) {
      setAvatarSrc("/signs/full-body/avatar-idle.gif");
      return;
    }

    // Normalize text for comparison
    const normalizedText = text.toLowerCase().trim();
    
    // Find matching animation or use default
    const signSrc = signLanguageMap[normalizedText] || signLanguageMap["default"];
    setAvatarSrc(signSrc);
    
    console.log(`Showing sign for: "${normalizedText}", Language: ${signLanguageType}`);
  }, [text, isProcessing, signLanguageType]);

  return (
    <div className="flex flex-col items-center">
      {isProcessing ? (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <RefreshCw size={48} className="text-primary mb-4 animate-spin" />
          <p className="text-muted-foreground">Processing sign language...</p>
        </div>
      ) : (
        <div className="relative aspect-video max-h-[400px] w-full flex items-center justify-center">
          {avatarSrc ? (
            <div className="w-full h-full rounded-xl overflow-hidden bg-gradient-to-r from-background/50 to-muted/50">
              <img 
                src={avatarSrc} 
                alt={`Sign language avatar ${text ? `signing: ${text}` : ''}`}
                className="full-body-avatar"
                onError={() => setAvatarSrc("/signs/full-body/avatar-idle.gif")}
              />
            </div>
          ) : (
            <div className="w-64 h-64 rounded-full bg-muted flex items-center justify-center">
              <span className="text-7xl">🧏</span>
            </div>
          )}
        </div>
      )}
      {text && !isProcessing && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground">{signLanguageType}</p>
          <p className="font-medium">{text}</p>
        </div>
      )}
    </div>
  );
};

export default VideoAvatar;
