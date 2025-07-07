
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$40",
    description: "Perfect for beginners and casual learners",
    features: [
      "24/7 text-based AI tutoring",
      "Access to basic quizzes",
      "Community forum access",
      "5 subjects included",
      "Weekly progress reports",
    ],
    popular: false,
    buttonText: "Get Started"
  },
  {
    id: "standard",
    name: "Standard",
    price: "$100",
    description: "Our most popular plan for dedicated students",
    features: [
      "Everything in Basic",
      "Video tutoring (10 hours/month)",
      "Advanced quizzes and tests",
      "Unlimited subjects",
      "Daily progress tracking",
      "Priority support",
    ],
    popular: true,
    buttonText: "Subscribe Now"
  },
  {
    id: "premium",
    name: "Premium",
    price: "$200",
    description: "For serious students who need comprehensive support",
    features: [
      "Everything in Standard",
      "Unlimited video tutoring",
      "Custom learning path creation",
      "1-on-1 monthly human tutor session",
      "Personalized curriculum design",
      "Advanced analytics dashboard",
      "Certificate of completion",
    ],
    popular: false,
    buttonText: "Go Premium"
  },
];

const SubscriptionPlans = () => {
  const handleSubscribe = (planId: string) => {
    toast.success(`You selected the ${planId.charAt(0).toUpperCase() + planId.slice(1)} plan! Please connect Supabase to enable subscriptions.`, {
      description: "This would typically redirect to a payment page.",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {plans.map((plan) => (
        <Card 
          key={plan.id} 
          className={`flex flex-col ${
            plan.popular ? "border-tutor-primary shadow-lg relative" : ""
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-4 left-0 right-0 flex justify-center">
              <span className="bg-tutor-primary text-white text-xs font-semibold py-1 px-4 rounded-full">
                MOST POPULAR
              </span>
            </div>
          )}
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{plan.name}</CardTitle>
            <div>
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground"> / month</span>
            </div>
            <CardDescription className="mt-2">{plan.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check size={18} className="text-tutor-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full ${plan.popular ? "bg-tutor-primary hover:bg-tutor-primary/90" : ""}`}
              onClick={() => handleSubscribe(plan.id)}
            >
              {plan.buttonText}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
