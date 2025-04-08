
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor?: string;
}

const FeatureCard = ({ title, description, icon: Icon, iconColor = "text-sign-blue" }: FeatureCardProps) => {
  return (
    <Card className="glass-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
      <CardHeader>
        <div className={`w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-4 ${iconColor}`}>
          <Icon size={24} />
        </div>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
