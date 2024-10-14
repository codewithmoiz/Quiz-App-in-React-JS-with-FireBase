import React, { useState, useEffect } from 'react'
import Option from './components/Option'
import app from './Firebase'
import { getDatabase, ref, set } from 'firebase/database'
import { FaRedoAlt, FaRegCheckCircle, FaRegQuestionCircle, FaRegTimesCircle, FaCode, FaJs } from 'react-icons/fa'

const App = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNamePopup, setShowNamePopup] = useState(true);
  const [userResult, setUserResult] = useState(null);

  const quizQuestions = [
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "let", "const", "variable"],
      correctAnswer: "var",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the correct way to write a comment in JavaScript?",
      options: ["// Comment", "/* Comment */", "# Comment", "<!-- Comment -->"],
      correctAnswer: "// Comment",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "unshift()", "shift()"],
      correctAnswer: "push()",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What does DOM stand for?",
      options: ["Document Object Model", "Data Object Model", "Digital Ordinance Model", "Document Orientation Model"],
      correctAnswer: "Document Object Model",
      icon: <FaCode className="text-blue-500 mr-2" />
    },
    {
      question: "Which operator is used for strict equality comparison in JavaScript?",
      options: ["==", "===", "=", "!="],
      correctAnswer: "===",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'typeof' operator in JavaScript?",
      options: ["To check if a variable is defined", "To determine the type of a value", "To create a new variable", "To compare two values"],
      correctAnswer: "To determine the type of a value",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which method is used to remove the last element from an array?",
      options: ["pop()", "push()", "shift()", "unshift()"],
      correctAnswer: "pop()",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What does the 'this' keyword refer to in JavaScript?",
      options: ["The current function", "The global object", "The object that owns the current code", "The parent object"],
      correctAnswer: "The object that owns the current code",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which function is used to parse a JSON string?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.decode()"],
      correctAnswer: "JSON.parse()",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'use strict' directive in JavaScript?",
      options: ["To enable strict mode", "To disable strict mode", "To import modules", "To declare variables"],
      correctAnswer: "To enable strict mode",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which method is used to select an element by its ID in JavaScript?",
      options: ["getElementById()", "querySelector()", "getElementsByClassName()", "getElementByName()"],
      correctAnswer: "getElementById()",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'addEventListener' method?",
      options: ["To add a new HTML element", "To attach an event handler to an element", "To create a new event", "To remove an event listener"],
      correctAnswer: "To attach an event handler to an element",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which operator is used for logical AND in JavaScript?",
      options: ["&&", "||", "!", "&"],
      correctAnswer: "&&",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'map' method in JavaScript?",
      options: ["To create a new array with the results of calling a function on every element", "To filter an array", "To sort an array", "To find an element in an array"],
      correctAnswer: "To create a new array with the results of calling a function on every element",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which keyword is used to declare a function in JavaScript?",
      options: ["function", "def", "func", "method"],
      correctAnswer: "function",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'fetch' function in JavaScript?",
      options: ["To make network requests", "To declare variables", "To create loops", "To handle errors"],
      correctAnswer: "To make network requests",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which method is used to convert a string to lowercase in JavaScript?",
      options: ["toLowerCase()", "toLower()", "changeCase('lower')", "lowerCase()"],
      correctAnswer: "toLowerCase()",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'async' keyword in JavaScript?",
      options: ["To declare an asynchronous function", "To create a new thread", "To import modules", "To handle errors"],
      correctAnswer: "To declare an asynchronous function",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "Which method is used to remove the first element from an array?",
      options: ["shift()", "unshift()", "pop()", "remove()"],
      correctAnswer: "shift()",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
    {
      question: "What is the purpose of the 'Promise' object in JavaScript?",
      options: ["To represent a value that may not be available immediately", "To create loops", "To handle DOM events", "To define classes"],
      correctAnswer: "To represent a value that may not be available immediately",
      icon: <FaJs className="text-yellow-400 mr-2" />
    },
  ];

  useEffect(() => {
    setSelectedOption(null);
    setIsCorrect(null);
  }, [currentQuestion]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    const correct = option === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    if (correct) {
      setScore(prevScore => prevScore + 1);
    }
    setTimeout(() => {
      if (currentQuestion === quizQuestions.length - 1) {
        const result = {
          name: userName,
          totalQuestions: quizQuestions.length,
          correctAnswers: score + (correct ? 1 : 0),
          incorrectAnswers: quizQuestions.length - (score + (correct ? 1 : 0)),
          pass: score + (correct ? 1 : 0) >= 12,
          grade: getGrade(score + (correct ? 1 : 0))
        };
        setUserResult(result);
        setShowResults(true);
        sendResultToFirebase(result);
      } else {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      }
    }, 1000);
  };

  const getGrade = (score) => {
    if (score >= 18) return 'A';
    if (score >= 16) return 'B';
    if (score >= 14) return 'C';
    if (score >= 12) return 'D';
    return 'F';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsCorrect(null);
    setScore(0);
    setShowResults(false);
    setUserResult(null);
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNamePopup(false);
    }
  };

  const sendResultToFirebase = (result) => {
    const db = getDatabase(app);
    const resultRef = ref(db, 'results/' + Date.now());
    set(resultRef, result)
      .then(() => {
        console.log("Result successfully sent to Firebase");
      })
      .catch((error) => {
        console.error("Error sending result to Firebase: ", error);
      });
  };

  if (showNamePopup) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Welcome to the Quiz!</h2>
          <form onSubmit={handleNameSubmit}>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Quiz
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold mb-6">Quiz Results for {userResult.name}</h2>
          <div className="flex justify-center items-center mb-6">
            <FaRegQuestionCircle className="text-4xl text-blue-500 mr-4" />
            <p className="text-xl">Total Questions: {userResult.totalQuestions}</p>
          </div>
          <div className="flex justify-center items-center mb-6">
            <FaRegCheckCircle className="text-4xl text-green-500 mr-4" />
            <p className="text-xl">Correct Answers: {userResult.correctAnswers}</p>
          </div>
          <div className="flex justify-center items-center mb-6">
            <FaRegTimesCircle className="text-4xl text-red-500 mr-4" />
            <p className="text-xl">Wrong Answers: {userResult.incorrectAnswers}</p>
          </div>
          <div className="mb-6">
            <p className="text-xl font-bold">Result: {userResult.pass ? 'Pass' : 'Fail'}</p>
          </div>
          <div className="mb-8">
            <p className="text-xl font-bold">Grade: {userResult.grade}</p>
          </div>
          <button
            onClick={resetQuiz}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 mx-auto rounded-full flex items-center justify-center transition duration-300"
          >
            <FaRedoAlt className="mr-2" />
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 flex items-center">
          {quizQuestions[currentQuestion].icon}
          Question {currentQuestion + 1}/{quizQuestions.length}
        </h2>
        <p className="text-lg mb-4">{quizQuestions[currentQuestion].question}</p>
        <div className="space-y-2">
          {quizQuestions[currentQuestion].options.map((option, index) => (
            <Option
              key={index}
              text={option}
              onClick={() => handleOptionClick(option)}
              isSelected={selectedOption === option}
              isCorrect={selectedOption === option ? isCorrect : null}
              correctAnswer={quizQuestions[currentQuestion].correctAnswer}
              state={selectedOption === option ? 'selected' : 'default'}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;