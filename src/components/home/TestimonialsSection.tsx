import { useLanguage } from "@/contexts/LanguageContext";

const TestimonialsSection = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Sarah J.",
      role: "Computer Science Student",
      content: t('home.testimonialSarah'),
      avatar: "S"
    },
    {
      name: "Michael T.",
      role: "High School Student",
      content: t('home.testimonialMichael'),
      avatar: "M"
    },
    {
      name: "Priya K.",
      role: "Language Learner",
      content: t('home.testimonialPriya'),
      avatar: "P"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.whatStudentsSay')}</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('home.whatStudentsSayDesc')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm"
            >
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-tutor-primary text-white flex items-center justify-center font-medium">
                  {testimonial.avatar}
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
