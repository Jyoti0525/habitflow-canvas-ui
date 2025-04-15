
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started",
      features: [
        "Up to 3 habits",
        "Basic analytics",
        "Daily reminders",
        "Mobile app access"
      ]
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      description: "Best for serious habit builders",
      features: [
        "Unlimited habits",
        "Advanced analytics",
        "Custom reminders",
        "Priority support",
        "Goal setting",
        "Progress sharing"
      ]
    },
    {
      name: "Team",
      price: "$29.99",
      period: "/month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team dashboard",
        "Admin controls",
        "Team analytics",
        "Custom branding",
        "API access"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-12">Simple, Transparent Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="hover:scale-105 transition-transform duration-300">
              <CardHeader>
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="flex items-baseline mt-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground ml-1">{plan.period}</span>
                </div>
                <p className="text-muted-foreground">{plan.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full">Get Started</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
