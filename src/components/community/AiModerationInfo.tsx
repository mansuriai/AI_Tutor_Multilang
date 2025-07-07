import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const AiModerationInfo = () => {
  const { t } = useLanguage();
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t('community.aiModeration')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm space-y-2">
          <p><strong>{t('community.howToUseAI')}:</strong></p>
          <ul className="space-y-1 ml-4">
            <li>• {t('community.replyToAnyPost')}</li>
            <li>• {t('community.typeAIQuestion')} <code className="bg-gray-100 px-1 rounded text-xs">@ai</code> {t('community.followedByQuestion')}</li>
            <li>• {t('community.getInstantHelp')}</li>
            <li>• {t('community.aiProvidesGuidance')}</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AiModerationInfo;
