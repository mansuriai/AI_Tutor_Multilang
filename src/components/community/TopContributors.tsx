import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

const TopContributors = () => {
  const { t } = useLanguage();
  
  const contributors = [
    { nameKey: "community.users.emmaR", points: "1250", initials: "ER", grade: "11" },
    { nameKey: "community.users.michaelT", points: "980", initials: "MT", grade: "9" },
    { nameKey: "community.users.sophiaL", points: "720", initials: "SL", grade: "12" }
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{t('community.topContributors')}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {contributors.map((member, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="text-sm font-medium">{t(member.nameKey)}</div>
                  <div className="text-xs text-muted-foreground">
                    {t('community.gradeLabel').replace('{{grade}}', member.grade)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground">
                {t('community.points').replace('{{points}}', member.points)}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TopContributors;
