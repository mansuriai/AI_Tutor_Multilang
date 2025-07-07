import { useLanguage } from "@/contexts/LanguageContext";

const CommunityHeader = () => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white border-b pt-8 pb-6">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">{t('community.studentCommunity')}</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            {t('community.communityDescription')}
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-2xl mx-auto">
            <p className="text-sm text-blue-700">
              <strong>{t('community.new')}:</strong> {t('community.aiModeratorInfo')} <code className="bg-blue-100 px-1 rounded">@ai</code> {t('community.aiModeratorHelp')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityHeader;
