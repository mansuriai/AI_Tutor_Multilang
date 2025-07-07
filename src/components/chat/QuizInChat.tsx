import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Check, ListCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
}

interface QuizInChatProps {
  subject: string;
  onComplete: () => void;
}

const QuizInChat = ({ subject, onComplete }: QuizInChatProps) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0, percentage: 0 });
  const { toast } = useToast();

  useEffect(() => {
    // Generate questions based on subject
    const generatedQuestions = generateQuizQuestions(subject);
    setQuestions(generatedQuestions);
  }, [subject]);

  const generateQuizQuestions = (subject: string): QuizQuestion[] => {
    // Mock questions generation based on subject
    // In a real app, this would come from an API
    const baseQuestions: Record<string, QuizQuestion[]> = {
      "Mathematics": [
        {
          id: "math_1",
          question: "What is the derivative of f(x) = x²?",
          options: ["f'(x) = x", "f'(x) = 2x", "f'(x) = 2", "f'(x) = x²"],
          correctAnswer: "f'(x) = 2x"
        },
        {
          id: "math_2",
          question: "Solve for x: 3x - 7 = 14",
          options: ["x = 5", "x = 7", "x = 8", "x = 9"],
          correctAnswer: "x = 7"
        },
        {
          id: "math_3",
          question: "What is the value of π (pi) to two decimal places?",
          options: ["3.12", "3.14", "3.16", "3.18"],
          correctAnswer: "3.14"
        },
        {
          id: "math_4",
          question: "Simplify: 2(x + 3) - 4(x - 1)",
          options: ["2x + 10", "-2x + 10", "6x - 2", "-2x + 2"],
          correctAnswer: "-2x + 10"
        },
        {
          id: "math_5",
          question: "If f(x) = x² + 3x + 2, what is f(2)?",
          options: ["8", "10", "12", "14"],
          correctAnswer: "12"
        },
        {
          id: "math_6",
          question: "What is the area of a circle with radius 5?",
          options: ["25π", "10π", "5π", "15π"],
          correctAnswer: "25π"
        },
        {
          id: "math_7",
          question: "What is the formula for the Pythagorean theorem?",
          options: ["a + b = c", "a² + b² = c²", "a × b = c", "a/b = c"],
          correctAnswer: "a² + b² = c²"
        },
        {
          id: "math_8",
          question: "What is the sum of the angles in a triangle?",
          options: ["90°", "180°", "270°", "360°"],
          correctAnswer: "180°"
        },
        {
          id: "math_9",
          question: "What is the slope of a line that passes through (2,3) and (4,7)?",
          options: ["1", "2", "3", "4"],
          correctAnswer: "2"
        },
        {
          id: "math_10",
          question: "What is the value of log₁₀(100)?",
          options: ["1", "2", "10", "100"],
          correctAnswer: "2"
        }
      ],
      "Science": [
        {
          id: "sci_1",
          question: "What is Newton's First Law?",
          options: [
            "F = ma",
            "An object at rest stays at rest unless acted upon by an external force",
            "For every action, there is an equal and opposite reaction",
            "Energy can neither be created nor destroyed"
          ],
          correctAnswer: "An object at rest stays at rest unless acted upon by an external force"
        },
        {
          id: "sci_2",
          question: "What is the chemical formula for water?",
          options: ["H2O", "CO2", "NaCl", "O2"],
          correctAnswer: "H2O"
        },
        {
          id: "sci_3",
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Mars"
        },
        {
          id: "sci_4",
          question: "What is the smallest unit of matter?",
          options: ["Atom", "Molecule", "Cell", "Electron"],
          correctAnswer: "Atom"
        },
        {
          id: "sci_5",
          question: "Who developed the theory of relativity?",
          options: ["Isaac Newton", "Albert Einstein", "Niels Bohr", "Marie Curie"],
          correctAnswer: "Albert Einstein"
        },
        {
          id: "sci_6",
          question: "What is the main function of the mitochondria in a cell?",
          options: ["Protein synthesis", "Cell division", "Energy production", "Waste removal"],
          correctAnswer: "Energy production"
        },
        {
          id: "sci_7",
          question: "Which of the following is NOT a state of matter?",
          options: ["Solid", "Liquid", "Gas", "Energy"],
          correctAnswer: "Energy"
        },
        {
          id: "sci_8",
          question: "What is the human body's largest organ?",
          options: ["Heart", "Brain", "Liver", "Skin"],
          correctAnswer: "Skin"
        },
        {
          id: "sci_9",
          question: "What causes the seasons on Earth?",
          options: ["Distance from the sun", "Earth's tilt", "Rotation speed", "Ocean currents"],
          correctAnswer: "Earth's tilt"
        },
        {
          id: "sci_10",
          question: "What is the speed of light approximately?",
          options: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
          correctAnswer: "300,000 km/s"
        }
      ],
      "General": [
        {
          id: "gen_1",
          question: "What's the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correctAnswer: "Paris"
        },
        {
          id: "gen_2",
          question: "Who wrote 'Romeo and Juliet'?",
          options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
          correctAnswer: "William Shakespeare"
        },
        {
          id: "gen_3",
          question: "What is the largest planet in our solar system?",
          options: ["Earth", "Mars", "Jupiter", "Saturn"],
          correctAnswer: "Jupiter"
        },
        {
          id: "gen_4",
          question: "In which year did World War II end?",
          options: ["1943", "1945", "1947", "1950"],
          correctAnswer: "1945"
        },
        {
          id: "gen_5",
          question: "What is the chemical symbol for gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: "Au"
        },
        {
          id: "gen_6",
          question: "Who painted the Mona Lisa?",
          options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
          correctAnswer: "Leonardo da Vinci"
        },
        {
          id: "gen_7",
          question: "Which of these is NOT a programming language?",
          options: ["Python", "Java", "HTML", "Dolphin"],
          correctAnswer: "Dolphin"
        },
        {
          id: "gen_8",
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correctAnswer: "Pacific Ocean"
        },
        {
          id: "gen_9",
          question: "What is the square root of 144?",
          options: ["12", "14", "16", "18"],
          correctAnswer: "12"
        },
        {
          id: "gen_10",
          question: "Which element has the chemical symbol 'O'?",
          options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
          correctAnswer: "Oxygen"
        }
      ],
      "Finance - Basics": [
        {
          id: "fin_1",
          question: "What is the primary purpose of a balance sheet?",
          options: [
            "To show a company's revenues and expenses",
            "To show a company's assets, liabilities, and equity at a point in time",
            "To show cash inflows and outflows",
            "To show market share"
          ],
          correctAnswer: "To show a company's assets, liabilities, and equity at a point in time"
        },
        {
          id: "fin_2",
          question: "Which of the following is considered a current asset?",
          options: [
            "Land",
            "Inventory",
            "Goodwill",
            "Equipment"
          ],
          correctAnswer: "Inventory"
        },
        {
          id: "fin_3",
          question: "What does ROI stand for in finance?",
          options: [
            "Return on Investment",
            "Rate of Interest",
            "Revenue on Income",
            "Ratio of Income"
          ],
          correctAnswer: "Return on Investment"
        },
        {
          id: "fin_4",
          question: "Which financial statement shows a company's profitability over a period?",
          options: [
            "Balance Sheet",
            "Income Statement",
            "Cash Flow Statement",
            "Statement of Retained Earnings"
          ],
          correctAnswer: "Income Statement"
        },
        {
          id: "fin_5",
          question: "What is the formula for Net Income?",
          options: [
            "Revenue - Expenses",
            "Assets - Liabilities",
            "Revenue + Expenses",
            "Assets + Liabilities"
          ],
          correctAnswer: "Revenue - Expenses"
        },
        {
          id: "fin_6",
          question: "Which of the following best describes diversification?",
          options: [
            "Investing in a single asset",
            "Spreading investments across various assets to reduce risk",
            "Borrowing money to invest",
            "Selling all assets"
          ],
          correctAnswer: "Spreading investments across various assets to reduce risk"
        },
        {
          id: "fin_7",
          question: "What is a dividend?",
          options: [
            "A type of bond",
            "A company's profit distributed to shareholders",
            "A loan from a bank",
            "A tax on income"
          ],
          correctAnswer: "A company's profit distributed to shareholders"
        },
        {
          id: "fin_8",
          question: "Which market is known for issuing new securities?",
          options: [
            "Primary Market",
            "Secondary Market",
            "Tertiary Market",
            "Commodity Market"
          ],
          correctAnswer: "Primary Market"
        },
        {
          id: "fin_9",
          question: "What does liquidity refer to in finance?",
          options: [
            "The amount of cash a company has",
            "The ease with which an asset can be converted into cash",
            "The number of shares traded",
            "The profitability of a company"
          ],
          correctAnswer: "The ease with which an asset can be converted into cash"
        },
        {
          id: "fin_10",
          question: "Which of the following is a liability?",
          options: [
            "Accounts Payable",
            "Inventory",
            "Retained Earnings",
            "Equipment"
          ],
          correctAnswer: "Accounts Payable"
        }
      ],
      "Finance - Investing": [
        {
          id: "fin_inv_1",
          question: "What is a stock?",
          options: [
            "A loan to a company",
            "Ownership in a company",
            "A type of bond",
            "A government security"
          ],
          correctAnswer: "Ownership in a company"
        },
        {
          id: "fin_inv_2",
          question: "What is the main benefit of investing in mutual funds?",
          options: [
            "Guaranteed returns",
            "Professional management and diversification",
            "No risk",
            "Tax-free income"
          ],
          correctAnswer: "Professional management and diversification"
        },
        {
          id: "fin_inv_3",
          question: "What does 'bull market' mean?",
          options: [
            "A market where prices are falling",
            "A market where prices are rising",
            "A market with no change",
            "A market for agricultural products"
          ],
          correctAnswer: "A market where prices are rising"
        },
        {
          id: "fin_inv_4",
          question: "Which of the following is a low-risk investment?",
          options: [
            "Stocks",
            "Bonds",
            "Cryptocurrency",
            "Options"
          ],
          correctAnswer: "Bonds"
        },
        {
          id: "fin_inv_5",
          question: "What is an ETF?",
          options: [
            "Exchange-Traded Fund",
            "Equity Trading Firm",
            "Electronic Transfer Fund",
            "Endowment Trust Fund"
          ],
          correctAnswer: "Exchange-Traded Fund"
        },
        {
          id: "fin_inv_6",
          question: "What is 'diversification' in investing?",
          options: [
            "Investing in one stock",
            "Spreading investments across different assets",
            "Selling all investments",
            "Investing only in bonds"
          ],
          correctAnswer: "Spreading investments across different assets"
        },
        {
          id: "fin_inv_7",
          question: "What is a portfolio?",
          options: [
            "A collection of investments",
            "A type of bond",
            "A stock exchange",
            "A financial statement"
          ],
          correctAnswer: "A collection of investments"
        },
        {
          id: "fin_inv_8",
          question: "What is the main risk of investing in stocks?",
          options: [
            "Price volatility",
            "Guaranteed loss",
            "No liquidity",
            "No ownership"
          ],
          correctAnswer: "Price volatility"
        },
        {
          id: "fin_inv_9",
          question: "What is a dividend yield?",
          options: [
            "The price of a stock",
            "The annual dividend divided by the stock price",
            "The number of shares owned",
            "The growth rate of a company"
          ],
          correctAnswer: "The annual dividend divided by the stock price"
        },
        {
          id: "fin_inv_10",
          question: "Which of the following is NOT a type of investment risk?",
          options: [
            "Market risk",
            "Credit risk",
            "Color risk",
            "Liquidity risk"
          ],
          correctAnswer: "Color risk"
        }
      ]
    };

    // Get questions for the subject or default to General
    let subjectKey = Object.keys(baseQuestions).find(
      key => subject.toLowerCase() === key.toLowerCase()
    );
    // If not found, try to match 'Finance' to 'Finance - Basics' by default
    if (!subjectKey && subject.toLowerCase() === 'finance') {
      subjectKey = 'Finance - Basics';
    }
    if (!subjectKey) {
      subjectKey = Object.keys(baseQuestions).find(
        key => subject.toLowerCase().includes(key.toLowerCase())
      ) || "General";
    }
    return baseQuestions[subjectKey].slice(0, 10);
  };

  const handleSelectAnswer = (questionId: string, answer: string) => {
    if (isSubmitted) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleSubmit = () => {
    // Calculate score
    let correct = 0;
    questions.forEach(question => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correct++;
      }
    });
    
    const percentage = Math.round((correct / questions.length) * 100);
    
    setScore({
      correct,
      total: questions.length,
      percentage
    });
    
    setIsSubmitted(true);
    
    toast({
      title: "Quiz Submitted!",
      description: `You scored ${correct} out of ${questions.length} (${percentage}%)`,
    });
  };

  const handleStartOver = () => {
    setIsSubmitted(false);
    setSelectedAnswers({});
    setCurrentQuestion(0);
  };
  
  // Check if all questions have been answered
  const allAnswered = questions.length > 0 && 
    questions.every(q => selectedAnswers[q.id]);

  // If we have no questions yet, show loading
  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="animate-spin mb-4 mx-auto h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
          <p>Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Results view when quiz is submitted
  if (isSubmitted) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <ListCheck className="mr-2 h-6 w-6" />
            Quiz Results
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-2">{score.percentage}%</div>
            <p className="text-muted-foreground">
              You got {score.correct} out of {score.total} questions correct
            </p>
          </div>
          <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
            {questions.map((q, index) => (
              <div key={q.id} className="border rounded-md p-4">
                <div className="flex justify-between mb-2">
                  <div className="font-medium">Question {index + 1}</div>
                  {selectedAnswers[q.id] === q.correctAnswer ? (
                    <div className="text-green-600 flex items-center">
                      <Check className="h-4 w-4 mr-1" /> Correct
                    </div>
                  ) : (
                    <div className="text-red-600">Incorrect</div>
                  )}
                </div>
                <div className="mb-2">{q.question}</div>
                <div className="text-sm">
                  <div>Your answer: {selectedAnswers[q.id] || "Not answered"}</div>
                  <div className="font-medium">Correct answer: {q.correctAnswer}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleStartOver}>
            Start Over
          </Button>
          <Button onClick={onComplete}>
            Return to Chat
          </Button>
        </CardFooter>
      </Card>
    );
  }

  // Quiz taking view
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <ListCheck className="mr-2 h-6 w-6" />
          Quick Quiz - {subject}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="bg-muted text-muted-foreground text-sm py-1 px-2 rounded-md">
            Question {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">{questions[currentQuestion].question}</h3>
          <RadioGroup 
            value={selectedAnswers[questions[currentQuestion].id] || ""}
            onValueChange={(value) => handleSelectAnswer(questions[currentQuestion].id, value)}
          >
            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2 border p-3 rounded-md hover:bg-muted/50">
                  <RadioGroupItem 
                    value={option} 
                    id={`option-${index}`} 
                  />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <Button 
            variant="outline" 
            onClick={handlePrev}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
        </div>
        <div className="flex space-x-2">
          {currentQuestion < questions.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button 
              onClick={handleSubmit}
              disabled={!allAnswered}
            >
              Submit Quiz
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuizInChat;
