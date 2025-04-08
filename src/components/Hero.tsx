
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-32 pb-24 px-4 md:px-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Breaking Barriers in
            <span className="gradient-text block">Sign Language Communication</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-lg">
            Our AI-powered platform translates sign language to speech and speech to sign language in real-time, making communication accessible for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button className="btn-primary">
              <span>Start Communicating</span>
              <ArrowRight size={18} className="ml-2" />
            </Button>
            <Button className="btn-secondary">
              How It Works
            </Button>
          </div>
          <div className="pt-6">
            <p className="text-sm text-gray-500">Powered by state-of-the-art AI models for seamless translation</p>
          </div>
        </div>
        <div className="relative">
          <div className="w-full h-full absolute -z-10 rounded-full bg-gradient-radial from-purple-200/50 to-transparent opacity-70 blur-3xl"></div>
          <div className="glass-card p-4 animate-float">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-r from-sign-blue/10 to-sign-purple/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-sign-blue to-sign-purple rounded-full opacity-20 animate-pulse-subtle"></div>
                <div className="absolute text-7xl md:text-8xl">🤟</div>
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3 text-center">
                <p className="font-medium text-gray-800">Sign Language → Speech</p>
              </div>
            </div>
          </div>
          <div className="glass-card p-4 absolute -bottom-12 -right-4 md:right-12 animate-float" style={{ animationDelay: '1s' }}>
            <div className="relative aspect-[4/3] w-36 md:w-48 rounded-xl overflow-hidden bg-gradient-to-r from-sign-indigo/10 to-sign-teal/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-r from-sign-indigo to-sign-teal rounded-full opacity-20 animate-pulse-subtle"></div>
                <div className="absolute text-4xl md:text-5xl">🔊</div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 glass-card p-2 text-center">
                <p className="font-medium text-xs md:text-sm text-gray-800">Speech → Sign</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
