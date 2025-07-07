
import { useState, useEffect } from "react";

export interface PracticeProblem {
  id: string;
  subject: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  isMultipleChoice: boolean;
  solution: string;
  hint?: string;
}

export function usePracticeProblems(subjectFilter?: string | null) {
  const [problems, setProblems] = useState<PracticeProblem[]>([
    {
      id: "p1",
      subject: "Mathematics",
      topic: "Algebra",
      difficulty: "easy",
      question: "Solve for x: 2x + 5 = 15",
      isMultipleChoice: true,
      options: ["x = 5", "x = 10", "x = 7", "x = 3"],
      solution: "x = 5",
      hint: "Subtract 5 from both sides, then divide by 2."
    },
    {
      id: "p2",
      subject: "Mathematics",
      topic: "Calculus",
      difficulty: "medium",
      question: "Find the derivative of f(x) = x³ + 2x² - 4x + 7",
      isMultipleChoice: false,
      solution: "f'(x) = 3x² + 4x - 4",
      hint: "Apply the power rule for each term."
    },
    {
      id: "p3",
      subject: "Physics",
      topic: "Kinematics",
      difficulty: "medium",
      question: "A car accelerates uniformly from rest to 20 m/s in 10 seconds. What is its acceleration?",
      isMultipleChoice: true,
      options: ["1 m/s²", "2 m/s²", "0.5 m/s²", "4 m/s²"],
      solution: "2 m/s²",
      hint: "Use the formula a = (v - u) / t, where u is initial velocity and v is final velocity."
    },
    {
      id: "p4",
      subject: "Chemistry",
      topic: "Periodic Table",
      difficulty: "easy",
      question: "What is the atomic number of Oxygen?",
      isMultipleChoice: true,
      options: ["6", "7", "8", "9"],
      solution: "8",
      hint: "The atomic number represents the number of protons in an atom."
    },
    {
      id: "p5",
      subject: "English",
      topic: "Grammar",
      difficulty: "hard",
      question: "Identify the grammatical error in the following sentence: 'Neither the students nor the teacher were able to solve the problem.'",
      isMultipleChoice: false,
      solution: "The verb 'were' should be 'was'. The verb agrees with the noun closest to it, which is 'teacher' (singular).",
      hint: "Look at the subject-verb agreement with 'neither/nor' constructions."
    },
    {
      id: "p6",
      subject: "Programming",
      topic: "JavaScript",
      difficulty: "medium",
      question: "What will be the output of: console.log(typeof typeof 1);",
      isMultipleChoice: true,
      options: ["number", "string", "undefined", "object"],
      solution: "string",
      hint: "The typeof operator returns a string. So typeof 1 returns 'number', and typeof 'number' returns 'string'."
    }
  ]);
  
  const filteredProblems = subjectFilter 
    ? problems.filter(problem => problem.subject.toLowerCase() === subjectFilter.toLowerCase())
    : problems;

  return { problems: filteredProblems };
}
