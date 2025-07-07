
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

interface DetailHeaderProps {
  metricTitle: string;
  metricDescription: string;
  subjectName: string;
  selectedSubject: string | null;
}

const DetailHeader = ({
  metricTitle,
  metricDescription,
  subjectName,
  selectedSubject
}: DetailHeaderProps) => {
  return (
    <div className="bg-white border-b pt-6 pb-4">
      <div className="container mx-auto px-6 max-w-6xl">
        <Link 
          to={`/dashboard${selectedSubject ? `?subject=${selectedSubject}` : ''}`} 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4"
        >
          <ChevronLeft className="mr-1" size={16} /> Back to Dashboard
        </Link>
        <h1 className="text-2xl font-bold">{metricTitle}</h1>
        <p className="text-muted-foreground">
          {metricDescription} {selectedSubject ? `for ${subjectName}` : ''}
        </p>
      </div>
    </div>
  );
};

export default DetailHeader;
