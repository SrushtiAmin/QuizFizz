import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Quiz.css";
import logo from "../../assets/logo.png";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { searchQuery, difficulty } = location.state || {};

  const quizData = [
    {
      id: 1,
      text: "What is the default value of an instance variable in Java?",
      options: ["0", "null", "Depends on the data type", "Compiler Error"],
      correctAnswer: "Depends on the data type",
    },
    {
      id: 2,
      text: "Which keyword is used to inherit a class in Java?",
      options: ["this", "extends", "super", "implements"],
      correctAnswer: "extends",
    },
    {
      id: 3,
      text: "What does JVM stand for in Java?",
      options: [
        "Java Virtual Machine",
        "Java Verified Memory",
        "Java Variable Manager",
        "Java Visual Mode",
      ],
      correctAnswer: "Java Virtual Machine",
    },
    {
      id: 4,
      text: "Which of the following is not a Java primitive data type?",
      options: ["int", "float", "String", "boolean"],
      correctAnswer: "String",
    },
    {
      id: 5,
      text: "Which method is used to start a thread in Java?",
      options: ["start()", "run()", "begin()", "execute()"],
      correctAnswer: "start()",
    },
    
    
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [answers, setAnswers] = useState([]);

  const handleOptionSelect = (option) => {
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: option });
  };

  const handleAnswerClick = () => {
    const selectedOption = selectedOptions[currentQuestion];
    if (selectedOption) {
      const currentCorrectAnswer = quizData[currentQuestion].correctAnswer;
      const isCorrect = selectedOption === currentCorrectAnswer;

      const updatedAnswers = [
        ...answers,
        {
          questionId: quizData[currentQuestion].id,
          question: quizData[currentQuestion].text,
          selectedOption,
          correctAnswer: currentCorrectAnswer,
          isCorrect,
        },
      ];

      if (currentQuestion < quizData.length - 1) {
        setAnswers(updatedAnswers);
        setCurrentQuestion(currentQuestion + 1);
      } else {
        navigate("/scoreboard", { state: { answers: updatedAnswers, searchQuery, difficulty } });
      }
    } else {
      alert("Please select an option before submitting.");
    }
  };

  const handlePreviousClick = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const question = quizData[currentQuestion];

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <img src={logo} alt="quiz-logo" />
      </header>

      <main className="quiz-content">
        <h2>
          Question {currentQuestion + 1} of {quizData.length}
        </h2>
        <p className="quiz-question">{question.text}</p>
        <div className="quiz-options">
          {question.options.map((option, index) => (
            <div key={index} className="option-item">
              <label>
                <input
                  type="radio"
                  name="quiz-option"
                  value={option}
                  checked={selectedOptions[currentQuestion] === option}
                  onChange={() => handleOptionSelect(option)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button
            className="previous-button"
            onClick={handlePreviousClick}
            disabled={currentQuestion === 0}
          >
            Previous
          </button>
          <button className="answer-button" onClick={handleAnswerClick}>
            {currentQuestion < quizData.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
