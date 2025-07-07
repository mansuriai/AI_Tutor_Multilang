import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const SubjectsPreview = () => {
  const { t } = useLanguage();

  const subjects = [
    { name: t('home.mathematics'), description: t('home.mathematicsDesc') },
    { name: t('home.sciences'), description: t('home.sciencesDesc') },
    { name: t('home.languages'), description: t('home.languagesDesc') },
    { name: t('home.computerScience'), description: t('home.computerScienceDesc') },
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.exploreSubjectAreas')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.exploreSubjectAreasDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg border border-gray-100 hover:border-tutor-primary transition-all hover:shadow-md`}
            >
              <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <Link to="/subjects" className="text-tutor-primary hover:underline text-sm font-medium">
                {t('home.exploreSubjects')}
              </Link>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link to="/subjects">
            <Button>{t('home.viewAllSubjects')}</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SubjectsPreview;
