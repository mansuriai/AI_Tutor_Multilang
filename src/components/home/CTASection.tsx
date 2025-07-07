import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const CTASection = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-6 bg-tutor-primary text-white">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('home.readyToTransform')}</h2>
        <p className="text-xl mb-8 opacity-90">
          {t('home.readyToTransformDesc')}
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="bg-white text-tutor-primary hover:bg-gray-100">
              {t('home.getStartedNow')}
            </Button>
          </Link>
          <Link to="/subjects">
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
              {t('home.exploreSubjectsCTA')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
