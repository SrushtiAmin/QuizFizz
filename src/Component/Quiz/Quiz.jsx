import { useState, useEffect } from "react";
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
  const [timeLeft, setTimeLeft] = useState(getInitialTime());
  const [lockedQuestions, setLockedQuestions] = useState(new Set());

  function getInitialTime() {
    if (difficulty === "easy") return 60; // 20 minutes in seconds
    if (difficulty === "medium") return 50; // 50 seconds per question
    if (difficulty === "hard") return 40; // 40 seconds per question
    return 0;
  }

  const finalizeQuiz = (currentAnswers) => {
    const finalAnswers = quizData.map((question) => {
      const existingAnswer = currentAnswers.find((a) => a.questionId === question.id);
      return existingAnswer || {
        questionId: question.id,
        question: question.text,
        selectedOption: undefined,
        correctAnswer: question.correctAnswer,
        isCorrect: false,
      };
    });

    navigate("/scoreboard", {
      state: {
        answers: finalAnswers,
        totalQuestions: quizData.length,
        searchQuery,
        difficulty,
      },
    });
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      setLockedQuestions((prev) => new Set([...prev, currentQuestion]));

      if (currentQuestion < quizData.length - 1) {
        const updatedAnswers = [
          ...answers,
          {
            questionId: quizData[currentQuestion].id,
            question: quizData[currentQuestion].text,
            selectedOption: undefined,
            correctAnswer: quizData[currentQuestion].correctAnswer,
            isCorrect: false,
          },
        ];
        setAnswers(updatedAnswers);
        setCurrentQuestion((prev) => prev + 1);
        setTimeLeft(getInitialTime());
      } else {
        finalizeQuiz([...answers, {
          questionId: quizData[currentQuestion].id,
          question: quizData[currentQuestion].text,
          selectedOption: undefined,
          correctAnswer: quizData[currentQuestion].correctAnswer,
          isCorrect: false,
        }]);
      }
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    setTimeLeft(getInitialTime());
  }, [currentQuestion]);

  const handleOptionSelect = (option) => {
    if (lockedQuestions.has(currentQuestion)) return;
    setSelectedOptions({ ...selectedOptions, [currentQuestion]: option });
  };

  const handleAnswerClick = () => {
    if (lockedQuestions.has(currentQuestion)) return;

    const selectedOption = selectedOptions[currentQuestion];
    if (selectedOption) {
      const currentCorrectAnswer = quizData[currentQuestion].correctAnswer;
      const isCorrect = selectedOption === currentCorrectAnswer;

      const updatedAnswers = [...answers, {
        questionId: quizData[currentQuestion].id,
        question: quizData[currentQuestion].text,
        selectedOption,
        correctAnswer: currentCorrectAnswer,
        isCorrect,
      }];

      setAnswers(updatedAnswers);

      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        finalizeQuiz(updatedAnswers);
      }
    } else {
      alert("Please select an option before submitting.");
    }
  };

  const formatTime = (seconds) => {
    if (difficulty === "easy") {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    }
    return `${seconds} sec`;
  };

  const question = quizData[currentQuestion];

  return (
    <div className="quiz-page">
      <header className="quiz-header">
        <img src={logo} alt="quiz-logo" className="quiz-logo" />
        <div className="quiz-timer">⏳ {formatTime(timeLeft)}</div>
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
                  disabled={lockedQuestions.has(currentQuestion)}
                />
                {option}
              </label>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button className="answer-button" onClick={handleAnswerClick}>
            {currentQuestion < quizData.length - 1 ? "Next" : "Submit"}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Quiz;
