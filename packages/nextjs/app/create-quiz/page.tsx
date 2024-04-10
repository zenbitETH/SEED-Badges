"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAccount } from "wagmi";
// import { useRouter } from "next/navigation";
import { withAuth } from "~~/components/withAuth";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

interface FormData {
  question: string;
  options: string[]; // Change the type to array of strings
  answer: string;
  eventId: string;
}

interface Question extends FormData {
  eventId: string; // Unique identifier for each question
}

const CreateQuizForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    question: "",
    options: ["", "", ""], // Initialize with empty strings
    answer: "",
    eventId: "",
  });
  const { address: connectedAddress } = useAccount();

  const [editMode, setEditMode] = useState<string | null>(null);
  // const router = useRouter();
  const [data, setData] = useState<any>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "options") {
      const optionIndex = Number(e.target.getAttribute("data-index"));
      const updatedOptions = [...formData.options];
      updatedOptions[optionIndex] = value;
      setFormData(prevState => ({
        ...prevState,
        options: updatedOptions,
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getData = async () => {
    try {
      const canAccess = checkQuizAccess();
      if (canAccess) {
        const response = await fetch(`/api/quiz?id=${selectedEvent}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY || "",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setData(data.data);
        } else {
          console.error("Failed to fetch data");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, [selectedEvent]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (!formData.question || !formData.answer || formData?.options?.length < 3) {
        return;
      }
      const correctAnswer = parseInt(formData.answer);

      const newQuestion: Question = {
        ...formData,
        answer: formData.options[correctAnswer - 1],
        eventId: selectedEvent,
      };

      if (editMode) {
        // const updatedQuestions = questions.map(q => (q.eventId === editMode ? newQuestion : q));
        // setQuestions(updatedQuestions);
        const canAccess = checkQuizAccess();
        if (canAccess) {
          const response = await fetch(`/api/quiz?id=${editMode}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.API_KEY || "",
            },
            body: JSON.stringify(newQuestion),
          });

          if (response.ok) {
            getData();
            setFormData({
              question: "",
              options: ["", "", ""], // Reset options
              answer: "",
              eventId: selectedEvent,
            });
            setEditMode(null);
          } else {
            console.error("Failed to update question");
          }
        }
      } else {
        const canAccess = checkQuizAccess();
        if (canAccess) {
          const response = await fetch("/api/quiz", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": process.env.API_KEY || "",
            },
            body: JSON.stringify(newQuestion),
          });

          if (response.ok) {
            getData();
            setFormData({
              question: "",
              options: ["", "", ""], // Reset options
              answer: "",
              eventId: selectedEvent,
            });
          } else {
            console.error("Failed to create question");
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const { data: eventData } = useScaffoldContractRead({
    contractName: "EASOnboarding",
    functionName: "getAllEvents",
  });

  const handleEdit = (id: string) => {
    const questionToEdit = data.find((q: { _id: string }) => q._id == id);

    if (!questionToEdit) return;

    setFormData({
      question: questionToEdit.question,
      options: [...questionToEdit.options],
      answer: "",
      eventId: questionToEdit.eventId,
    });
    setEditMode(questionToEdit._id);
  };

  const handleDelete = async (id: string) => {
    try {
      const canAccess = checkQuizAccess();
      if (canAccess) {
        const response = await fetch(`/api/quiz?id=${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": process.env.API_KEY || "",
          },
        });

        if (response.ok) {
          getData();
          setEditMode(null);
          setFormData({
            question: "",
            options: ["", "", ""],
            answer: "",
            eventId: "",
          });
        } else {
          console.error("Failed to delete question");
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const checkQuizAccess = () => {
    const questionToEdit = eventData?.find((q: { mentorAddress: string }) => q.mentorAddress == connectedAddress);

    if (!questionToEdit) {
      throw new Error("You are not authorized to create quiz");
    } else return true;
  };

  return (
    <div className="m-10">
      <label htmlFor="pet-select">Choose Event</label>
      <select
        name="pets"
        id="pet-select"
        onChange={e => {
          const selectedValue = e.target.value;
          setSelectedEvent(selectedValue);
        }}
      >
        <option value="">Please Select</option>
        {eventData &&
          eventData?.map((option, index) => (
            <option key={index} value={option.eventId.toString()}>
              {option.eventName}
            </option>
          ))}
      </select>
      {selectedEvent && (
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="border border-gray-300 rounded p-4 mb-4">
            <div className="mb-4">
              <label htmlFor="question" className="block mb-1">
                Question:
              </label>
              <input
                type="text"
                id="question"
                name="question"
                value={formData.question}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
                required
              />
            </div>
            <div className="flex mb-4">
              {formData.options.map((option, index) => (
                <div key={index} className="w-1/3 mr-2">
                  <label htmlFor={`option${index + 1}`} className="block mb-1">
                    Option {index + 1}:
                  </label>
                  <input
                    type="text"
                    id={`option${index + 1}`}
                    name="options"
                    data-index={index}
                    value={option}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded px-2 py-1"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="mb-4">
              <label htmlFor="answer" className="block mb-1">
                Correct Answer:
              </label>
              <select
                id="answer"
                name="answer"
                value={formData.answer}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-2 py-1"
                required
              >
                <option value="">Select correct answer</option>
                <option value={1}>Option 1</option>
                <option value={2}>Option 2</option>
                <option value={3}>Option 3</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              {editMode ? "Update Question" : "Add Question"}
            </button>
          </form>

          {data.length > 0 && (
            <div className="border border-gray-300 rounded p-4">
              <h2 className="text-lg font-semibold mb-2">Created Questions:</h2>
              <ul>
                {data.map(
                  (
                    {
                      question,
                      options,
                      answer,
                      _id,
                    }: { eventId: string; question: string; options: string[]; answer: string; _id: string },
                    index: number,
                  ) => (
                    <li key={index} className="mb-4 p-2 border">
                      <p>
                        <strong>Question {index + 1} :</strong> {question}
                      </p>
                      <p>
                        <strong>Options:</strong>
                        {options?.map((option, key) => {
                          return (
                            <span key={key}>
                              {key + 1}:{option}
                              {"            "}
                            </span>
                          );
                        })}
                      </p>
                      <p>
                        <strong>Answer:</strong> {answer}
                      </p>
                      <button onClick={() => handleEdit(_id)} className="mr-2 bg-blue-500 text-white px-2 py-1 rounded">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(_id)} className="bg-red-500 text-white px-2 py-1 rounded">
                        Delete
                      </button>
                    </li>
                  ),
                )}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default withAuth(CreateQuizForm);
