import { useState } from "react";

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PracticeQuiz {
  id: string;
  subject: string;
  topic: string;
  title: string;
  description: string;
  timeLimit: number; // in minutes
  questions: QuizQuestion[];
}

export function usePracticeQuizzes(subjectId?: string | null) {
  const [quizzes] = useState<PracticeQuiz[]>([
    {
      id: "q1",
      subject: "Mathematics",
      topic: "Algebra",
      title: "Algebra Fundamentals",
      description: "Test your understanding of basic algebraic concepts",
      timeLimit: 15,
      questions: [
        {
          id: "q1_1",
          question: "Solve for x: 3x - 7 = 14",
          options: ["x = 5", "x = 7", "x = 8", "x = 9"],
          correctAnswer: "x = 7",
          explanation: "3x - 7 = 14\n3x = 21\nx = 7"
        },
        {
          id: "q1_2",
          question: "Simplify: 2(x + 3) - 4(x - 1)",
          options: ["2x + 10", "-2x + 10", "6x - 2", "-2x + 2"],
          correctAnswer: "-2x + 10",
          explanation: "2(x + 3) - 4(x - 1) = 2x + 6 - 4x + 4 = -2x + 10"
        },
        {
          id: "q1_3",
          question: "If f(x) = x² + 3x + 2, what is f(2)?",
          options: ["8", "10", "12", "14"],
          correctAnswer: "12",
          explanation: "f(2) = 2² + 3(2) + 2 = 4 + 6 + 2 = 12"
        }
      ]
    },
    {
      id: "q2",
      subject: "Physics",
      topic: "Mechanics",
      title: "Newton's Laws Quiz",
      description: "Test your knowledge of Newton's laws of motion",
      timeLimit: 10,
      questions: [
        {
          id: "q2_1",
          question: "What is Newton's First Law?",
          options: [
            "F = ma",
            "An object at rest stays at rest unless acted upon by an external force",
            "For every action, there is an equal and opposite reaction",
            "Energy can neither be created nor destroyed"
          ],
          correctAnswer: "An object at rest stays at rest unless acted upon by an external force",
          explanation: "Newton's First Law, also known as the law of inertia, states that an object will remain at rest or in uniform motion unless acted upon by an external force."
        },
        {
          id: "q2_2",
          question: "What is the formula for Newton's Second Law?",
          options: ["F = mv", "F = ma", "F = mg", "F = m/a"],
          correctAnswer: "F = ma",
          explanation: "Newton's Second Law states that the force acting on an object is equal to the mass of the object multiplied by its acceleration."
        }
      ]
    },
    {
      id: "q3",
      subject: "English",
      topic: "Literature",
      title: "Shakespeare's Works",
      description: "Test your knowledge of Shakespeare's major plays",
      timeLimit: 20,
      questions: [
        {
          id: "q3_1",
          question: "Which play begins with the line 'To be, or not to be'?",
          options: ["Macbeth", "Romeo and Juliet", "Hamlet", "King Lear"],
          correctAnswer: "Hamlet",
          explanation: "'To be, or not to be' is from Hamlet's soliloquy in Act 3, Scene 1 of Hamlet."
        },
        {
          id: "q3_2",
          question: "In which city is Romeo and Juliet set?",
          options: ["Venice", "Rome", "Verona", "Florence"],
          correctAnswer: "Verona",
          explanation: "Romeo and Juliet is set in Verona, Italy, where the two feuding families, the Montagues and Capulets, reside."
        }
      ]
    },
    {
      id: "finance-basics",
      subject: "Finance",
      topic: "Basics",
      title: "Introduction to Managerial Finance",
      description: "Test your understanding of basic finance concepts.",
      timeLimit: 15,
      questions: [
        {
          id: "fin_1",
          question: "What is the primary purpose of a balance sheet?",
          options: [
            "To show a company's revenues and expenses",
            "To show a company's assets, liabilities, and equity at a point in time",
            "To show cash inflows and outflows",
            "To show market share"
          ],
          correctAnswer: "To show a company's assets, liabilities, and equity at a point in time",
          explanation: "A balance sheet provides a snapshot of a company's financial position at a specific point in time."
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
          correctAnswer: "Inventory",
          explanation: "Current assets are expected to be converted to cash within a year. Inventory is a current asset."
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
          correctAnswer: "Return on Investment",
          explanation: "ROI stands for Return on Investment."
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
          correctAnswer: "Income Statement",
          explanation: "The income statement shows revenues and expenses over a period."
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
          correctAnswer: "Revenue - Expenses",
          explanation: "Net Income = Revenue - Expenses."
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
          correctAnswer: "Spreading investments across various assets to reduce risk",
          explanation: "Diversification reduces risk by spreading investments."
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
          correctAnswer: "A company's profit distributed to shareholders",
          explanation: "Dividends are profits paid to shareholders."
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
          correctAnswer: "Primary Market",
          explanation: "New securities are issued in the primary market."
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
          correctAnswer: "The ease with which an asset can be converted into cash",
          explanation: "Liquidity is how quickly an asset can be converted to cash."
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
          correctAnswer: "Accounts Payable",
          explanation: "Accounts Payable is a liability."
        }
      ]
    },
    {
      id: "finance-investing",
      subject: "Finance",
      topic: "Investing",
      title: "Financial Tools",
      description: "Assess your knowledge of investing concepts in finance.",
      timeLimit: 15,
      questions: [
        {
          id: "fin_inv_1",
          question: "What is a stock?",
          options: [
            "A loan to a company",
            "Ownership in a company",
            "A type of bond",
            "A government security"
          ],
          correctAnswer: "Ownership in a company",
          explanation: "A stock represents ownership in a company."
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
          correctAnswer: "Professional management and diversification",
          explanation: "Mutual funds offer diversification and professional management."
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
          correctAnswer: "A market where prices are rising",
          explanation: "A bull market is when prices are rising."
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
          correctAnswer: "Bonds",
          explanation: "Bonds are generally considered low-risk."
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
          correctAnswer: "Exchange-Traded Fund",
          explanation: "ETF stands for Exchange-Traded Fund."
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
          correctAnswer: "Spreading investments across different assets",
          explanation: "Diversification means spreading investments to reduce risk."
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
          correctAnswer: "A collection of investments",
          explanation: "A portfolio is a collection of investments."
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
          correctAnswer: "Price volatility",
          explanation: "Stocks are subject to price volatility."
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
          correctAnswer: "The annual dividend divided by the stock price",
          explanation: "Dividend yield = annual dividend / stock price."
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
          correctAnswer: "Color risk",
          explanation: "Color risk is not a real investment risk."
        }
      ]
    }
  ]);

  const filteredQuizzes = subjectId 
    ? quizzes.filter(quiz => {
        if (!subjectId) return true;
        // Normalize subjectId and quiz.subject for comparison
        const normalizedSubjectId = subjectId.toLowerCase().replace(/[-_ ]/g, "");
        const normalizedQuizSubject = quiz.subject.toLowerCase().replace(/[-_ ]/g, "");
        // Match for 'finance', 'businessfinance', etc.
        if (normalizedSubjectId.includes("finance") && normalizedQuizSubject.includes("finance")) {
          return true;
        }
        // Fallback: exact match
        return normalizedQuizSubject === normalizedSubjectId;
      })
    : quizzes;

  return { quizzes: filteredQuizzes };
}
