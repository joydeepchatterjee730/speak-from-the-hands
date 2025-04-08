
import React from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import SignToTextDemo from "@/components/SignToTextDemo";
import TextToSignDemo from "@/components/TextToSignDemo";
import VideoCallDemo from "@/components/VideoCallDemo";
import Footer from "@/components/Footer";
import FeatureCard from "@/components/FeatureCard";
import { 
  Phone, 
  Video, 
  MessageSquare, 
  Languages, 
  UserPlus 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 px-4 md:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Breaking Communication Barriers</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform offers multiple ways to facilitate communication between deaf and hearing individuals.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <FeatureCard 
                title="Phone Calls" 
                description="Convert sign language to audio and audio to sign language during phone calls."
                icon={Phone}
                iconColor="text-sign-blue"
              />
              <FeatureCard 
                title="Video Calls" 
                description="Real-time translation during video calls with avatar visualization."
                icon={Video}
                iconColor="text-sign-purple"
              />
              <FeatureCard 
                title="In-Person" 
                description="Use our app for in-person conversations with instant translations."
                icon={MessageSquare}
                iconColor="text-sign-indigo"
              />
              <FeatureCard 
                title="Multiple Languages" 
                description="Support for various sign languages from around the world."
                icon={Languages}
                iconColor="text-sign-teal"
              />
              <FeatureCard 
                title="Custom Signs" 
                description="Create and save your own custom signs for personalized communication."
                icon={UserPlus}
                iconColor="text-sign-blue"
              />
            </div>
          </div>
        </section>
        
        <SignToTextDemo />
        <TextToSignDemo />
        <VideoCallDemo />
        
        {/* CTA Section */}
        <section className="py-20 px-4 md:px-8 bg-gradient-to-r from-sign-blue to-sign-purple text-white">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to break communication barriers?</h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join us in creating a more accessible world where everyone can communicate freely.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-sign-blue font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Get Started
              </button>
              <button className="bg-transparent border border-white text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
