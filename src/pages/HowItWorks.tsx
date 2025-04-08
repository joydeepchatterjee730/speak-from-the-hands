
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">How DeafEars Works</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered platform bridges the communication gap between deaf and hearing individuals through state-of-the-art technology.
            </p>
          </div>
          
          <div className="space-y-12 md:space-y-24">
            {/* Sign to Text Section */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-4">Sign Language to Text</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our advanced computer vision models capture and interpret sign language in real-time, converting hand gestures, facial expressions, and body movements into text.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                      <p>Camera captures sign language gestures with high precision</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                      <p>AI model processes and recognizes signs, including finger spelling</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                      <p>Machine learning algorithms convert recognized signs to grammatically correct text</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                      <p>Text can be displayed or converted to speech in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Card className="glass-card p-6 aspect-video flex items-center justify-center overflow-hidden">
                  <div className="relative h-full w-full">
                    <img 
                      src="/signs/sign-to-text.webp" 
                      alt="Sign language recognition" 
                      className="object-cover rounded-lg h-full w-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400/4263EB/FFFFFF?text=Sign+Language+Recognition";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <div className="glass-card px-3 py-2">
                        <p className="font-medium text-white">Computer vision processes sign language</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
            
            {/* Text to Sign Section */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <Card className="glass-card p-6 aspect-video flex items-center justify-center overflow-hidden">
                  <div className="relative h-full w-full">
                    <img 
                      src="/signs/text-to-sign.webp" 
                      alt="Text to sign language visualization" 
                      className="object-cover rounded-lg h-full w-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400/7048E8/FFFFFF?text=Text+to+Sign+Translation";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <div className="glass-card px-3 py-2">
                        <p className="font-medium text-white">AI generates realistic avatar movements</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-4">Text to Sign Language</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Our system converts text or spoken language into realistic sign language animations through a lifelike avatar, making communication accessible in both directions.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                      <p>Text input or speech recognition captures spoken language</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                      <p>Natural language processing analyzes and prepares the content for translation</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                      <p>AI translates text to appropriate sign language gestures and expressions</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                      <p>Avatar renders fluid, natural-looking sign language in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Video Call Section */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-bold mb-4">Real-time Video Communication</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    DeafEars enables seamless video conversations between deaf and hearing individuals, translating in both directions simultaneously during calls.
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">1</span>
                      <p>Secure, high-quality video connections with low latency</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">2</span>
                      <p>Sign language from deaf users is translated to speech for hearing participants</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">3</span>
                      <p>Speech from hearing users is translated to sign language via avatar</p>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-primary/10 text-primary rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5">4</span>
                      <p>Shareable links make it easy to connect without both parties needing accounts</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <Card className="glass-card p-6 aspect-video flex items-center justify-center overflow-hidden">
                  <div className="relative h-full w-full">
                    <img 
                      src="/signs/video-call.webp" 
                      alt="DeafEars video call" 
                      className="object-cover rounded-lg h-full w-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400/4CC9BE/FFFFFF?text=Video+Call+Translation";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                      <div className="glass-card px-3 py-2">
                        <p className="font-medium text-white">Two-way real-time translation</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
          
          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to experience seamless communication?</h2>
            <Button 
              className="btn-primary text-lg px-8 py-6"
              onClick={() => navigate('/dashboard')}
            >
              Try DeafEars Now
              <ArrowRight size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HowItWorks;
