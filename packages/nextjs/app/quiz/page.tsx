"use client";

import React, { useEffect, useState } from "react";
import QuestionComponent from "~~/components/Question";
// import Question from "~/components/Question";
import { Answers, Question } from "~~/utils/scaffold-eth/quiz";

const questions: Question[] = [
  {
    question: "What is the capital of Francefwsjkdfbs fsdjkfbskjf sdf sdkjjfbsdk?",
    options: ["New York", "London", "Paris", "Dubai"],
    answer: "Paris",
  },
  {
    question: "Who is the CEO of Tesla?",
    options: ["Jeff Bezos", "Elon Musk", "Bill Gates", "Steve Jobs"],
    answer: "Elon Musk",
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState<Answers>({});
  const [result, setResult] = useState<string | null>(null);
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const handleOptionChange = (questionIndex: number, option: string) => {
    setAnswers({
      ...answers,
      [questionIndex]: option,
    });
  };

  useEffect(() => {
    const answeredQuestionsCount = Object.keys(answers).length;
    setAllQuestionsAnswered(answeredQuestionsCount === questions.length);
  }, [answers]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const score = questions.reduce((total, question, index) => {
      if (answers[index] === question.answer) {
        return total + 1;
      }
      return total;
    }, 0);

    setResult(`You scored ${score} out of ${questions.length}`);
  };

  return (
    <div className="flex justify-center m-10">
      <div className="w-100 rounded-lg ">
        <form onSubmit={handleSubmit} className="space-y-4">
          {questions.map((question, index) => (
            <QuestionComponent
              key={index}
              question={question}
              questionIndex={index}
              handleOptionChange={handleOptionChange}
              currentAnswer={answers[index]}
            />
          ))}
          <button
            type="submit"
            className={`${
              allQuestionsAnswered ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"
            } px-4 py-2 rounded mx-auto block ${allQuestionsAnswered ? "" : "pointer-events-none"}`}
            disabled={!allQuestionsAnswered}
          >
            Submit
          </button>
        </form>
        {result && <p className="text-center mt-4">{result}</p>}
      </div>
    </div>
  );
};
export default Quiz;
