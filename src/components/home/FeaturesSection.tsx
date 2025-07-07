import { useLanguage } from "@/contexts/LanguageContext";

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      title: t('home.feature24hTutoring'),
      description: t('home.feature24hTutoringDesc'),
      icon: "💬"
    },
    {
      title: t('home.featureVideoSupport'),
      description: t('home.featureVideoSupportDesc'),
      icon: "🎥"
    },
    {
      title: t('home.featureCustomPaths'),
      description: t('home.featureCustomPathsDesc'),
      icon: "🧭"
    },
    {
      title: t('home.featureProgressTracking'),
      description: t('home.featureProgressTrackingDesc'),
      icon: "📊"
    },
    {
      title: t('home.featureCommunitySupport'),
      description: t('home.featureCommunitySupportDesc'),
      icon: "👥"
    },
    {
      title: t('home.featureProficiencyTesting'),
      description: t('home.featureProficiencyTestingDesc'),
      icon: "📝"
    }
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.everythingYouNeed')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.everythingYouNeedDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
