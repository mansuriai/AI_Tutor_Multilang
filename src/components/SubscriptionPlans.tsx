import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

const plans = [
  {
    id: "basic",
    nameKey: "subscription.basic",
    price: "$40",
    descriptionKey: "subscription.basicDesc",
    features: [
      "subscription.feature.textAiTutoring",
      "subscription.feature.basicQuizzes",
      "subscription.feature.communityForum",
      "subscription.feature.fiveSubjects",
      "subscription.feature.weeklyReports",
    ],
    popular: false,
    buttonKey: "subscription.getStarted"
  },
  {
    id: "standard",
    nameKey: "subscription.pro",
    price: "$100",
    descriptionKey: "subscription.proDesc",
    features: [
      "subscription.feature.everythingBasic",
      "subscription.feature.videoTutoring10h",
      "subscription.feature.advancedQuizzes",
      "subscription.feature.unlimitedSubjects",
      "subscription.feature.dailyTracking",
      "subscription.feature.prioritySupport",
    ],
    popular: true,
    buttonKey: "subscription.subscribeNow"
  },
  {
    id: "premium",
    nameKey: "subscription.premium",
    price: "$200",
    descriptionKey: "subscription.premiumDesc",
    features: [
      "subscription.feature.everythingPro",
      "subscription.feature.unlimitedVideoTutoring",
      "subscription.feature.customLearningPath",
      "subscription.feature.humanTutorSession",
      "subscription.feature.curriculumDesign",
      "subscription.feature.advancedAnalytics",
      "subscription.feature.certificate",
    ],
    popular: false,
    buttonKey: "subscription.goPremium"
  },
];

const SubscriptionPlans = () => {
  const { t } = useLanguage();
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
                {t('subscription.mostPopular')}
              </span>
            </div>
          )}
          <CardHeader className="pb-2">
            <CardTitle className="text-2xl">{t(plan.nameKey)}</CardTitle>
            <div>
              <span className="text-3xl font-bold">{plan.price}</span>
              <span className="text-muted-foreground"> / {t('subscription.month')}</span>
            </div>
            <CardDescription className="mt-2">{t(plan.descriptionKey)}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <Check size={18} className="text-tutor-primary mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{t(feature)}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button 
              className={`w-full ${plan.popular ? "bg-tutor-primary hover:bg-tutor-primary/90" : ""}`}
              onClick={() => handleSubscribe(plan.id)}
            >
              {t(plan.buttonKey)}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SubscriptionPlans;
