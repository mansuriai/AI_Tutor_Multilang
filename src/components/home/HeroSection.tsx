import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();

  return (
    <section className="bg-gradient-to-b from-white to-tutor-light py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">{t('home.heroTitle')}</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg">
              {t('home.heroSubtitle')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/subjects">
                <Button size="lg" className="bg-tutor-primary hover:bg-tutor-primary/90">
                  {t('home.startLearning')}
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="lg" variant="outline">
                  {t('home.tryFreeToday')}
                </Button>
              </Link>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="relative mx-auto max-w-md">
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-tutor-primary rounded-full opacity-20 animate-pulse-subtle"></div>
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-tutor-secondary rounded-full opacity-20 animate-pulse-subtle" style={{ animationDelay: "1s" }}></div>
              
              <div className="relative bg-white rounded-xl border shadow-lg overflow-hidden z-10">
                <div className="bg-tutor-primary text-white p-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex mb-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-tutor-primary flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="ml-3 bg-gray-100 rounded-lg p-3 text-sm">
                      {t('home.aiTutorGreeting')}
                    </div>
                  </div>
                  <div className="flex mb-4 justify-end">
                    <div className="mr-3 bg-tutor-primary/10 rounded-lg p-3 text-sm">
                      {t('home.studentQuestion')}
                    </div>
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                      👤
                    </div>
                  </div>
                  <div className="flex mb-4 items-center">
                    <div className="w-8 h-8 rounded-full bg-tutor-primary flex items-center justify-center text-white font-bold">
                      AI
                    </div>
                    <div className="ml-3 bg-gray-100 rounded-lg p-3 text-sm">
                      {t('home.aiTutorResponse')}
                    </div>
                  </div>
                  <div className="relative">
                    <input 
                      type="text" 
                      placeholder={t('home.askAnything')} 
                      className="w-full p-3 pr-10 border rounded-lg bg-gray-50 text-sm"
                    />
                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-tutor-primary">
                      ↑
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
