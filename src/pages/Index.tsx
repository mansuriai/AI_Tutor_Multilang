import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SubscriptionPlans from "@/components/SubscriptionPlans";
import HeroSection from "@/components/home/HeroSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import SubjectsPreview from "@/components/home/SubjectsPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import CTASection from "@/components/home/CTASection";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection />
      <FeaturesSection />
      <SubjectsPreview />
      
      {/* Subscription Plans */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.subscriptionPlans')}</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('home.subscriptionPlansDesc')}
            </p>
          </div>
          
          <SubscriptionPlans />
        </div>
      </section>

      <TestimonialsSection />
      <CTASection />

      <Footer />
    </div>
  );
};

export default Index;
