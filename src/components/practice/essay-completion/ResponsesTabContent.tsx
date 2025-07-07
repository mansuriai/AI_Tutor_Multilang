
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { EssayQuestion } from "../EssayQuizTaking";

interface ResponsesTabContentProps {
  questions: EssayQuestion[];
  answers: Record<string, string>;
}

const ResponsesTabContent = ({ questions, answers }: ResponsesTabContentProps) => {
  return (
    <div className="py-4">
      <div className="space-y-6">
        {questions.map((question, index) => (
          <Card key={question.id}>
            <CardHeader>
              <CardTitle className="text-lg">Question {index + 1}</CardTitle>
              <CardDescription>{question.question}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Your Response:</h4>
                <div className="bg-gray-50 p-3 rounded whitespace-pre-line min-h-[100px]">
                  {answers[question.id] || "No answer provided"}
                </div>
              </div>
              
              {question.sampleAnswer && (
                <div>
                  <h4 className="font-medium mb-2">Sample Answer:</h4>
                  <div className="bg-soft-blue p-3 rounded whitespace-pre-line">
                    {question.sampleAnswer}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResponsesTabContent;
