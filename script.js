const questions = [
    {
      question: "What is the capital of India?",
      options: ["Delhi", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "Delhi"
    },
    {
      question: "Which river is known as the Ganga in India?",
      options: ["Yamuna", "Brahmaputra", "Godavari", "Hooghly"],
      correctAnswer: "Yamuna"
    },
    {
      question: "What is the national flower of India?",
      options: ["Lotus", "Rose", "Jasmine", "Marigold"],
      correctAnswer: "Lotus"
    },
    {
      question: "Which of the following is not a UNESCO World Heritage Site in India?",
      options: ["Taj Mahal", "Red Fort", "Qutub Minar", "Hawker's Bay"],
      correctAnswer: "Hawker's Bay"
    },
    {
      question: "Who was the first Prime Minister of India?",
      options: ["Jawaharlal Nehru", "Indira Gandhi", "Mahatma Gandhi", "Sardar Vallabhbhai Patel"],
      correctAnswer: "Jawaharlal Nehru"
    },
    {
      question: "What is the highest mountain peak in India?",
      options: ["Mount Everest", "Kangchenjunga", "Nanda Devi", "K2"],
      correctAnswer: "Kangchenjunga"
    },
    {
      question: "Which Indian state is known as the 'Land of Five Rivers'?",
      options: ["Punjab", "Haryana", "Uttar Pradesh", "Bihar"],
      correctAnswer: "Punjab"
    },
    {
      question: "Which is the national animal of India?",
      options: ["Tiger", "Elephant", "Lion", "Leopard"],
      correctAnswer: "Tiger"
    },
    {
      question: "Which Indian city is known as the 'City of Lakes'?",
      options: ["Udaipur", "Jaipur", "Bhopal", "Lucknow"],
      correctAnswer: "Udaipur"
    },
    {
      question: "What is the currency of India?",
      options: ["Rupee", "Dollar", "Euro", "Yen"],
      correctAnswer: "Rupee"
    }
  ];
  
  const quizContainer = document.getElementById('quiz-container');
  const progressBar = document.getElementById('progress');
  const questionElement = document.getElementById('question');
  const optionsElement = document.getElementById('options');
  const feedbackElement = document.getElementById('feedback');
  const nextButton = document.getElementById('next-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  let timer;
  let timeLimit = 10; // Time limit for each question in seconds
  
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement('button');
      button.textContent = `${index + 1}. ${option}`;
      button.classList.add('bg-gray-200', 'hover:bg-gray-300', 'text-gray-800', 'font-semibold', 'py-2', 'px-4', 'rounded');
      button.addEventListener('click', () => checkAnswer(option));
      optionsElement.appendChild(button);
    });
  
    startTimer();
  }
  
  function checkAnswer(selectedOption) {
    clearInterval(timer);
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correctAnswer) {
      score++;
      feedbackElement.textContent = "Correct!";
    } else {
      feedbackElement.textContent = "Incorrect!";
    }
    nextButton.disabled = false;
  }
  
  function nextQuestion() {
    clearInterval(timer);
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
      feedbackElement.textContent = '';
      nextButton.disabled = true;
    } else {
      // Display final score
      questionElement.textContent = `Quiz Completed! Your Score: ${score}/${questions.length}`;
      optionsElement.innerHTML = '';
      feedbackElement.textContent = '';
      nextButton.style.display = 'none';
    }
  }
  
  function startTimer() {
    let timeLeft = timeLimit;
    progressBar.style.width = '100%';
    timer = setInterval(() => {
      timeLeft--;
      const progressWidth = (timeLeft / timeLimit) * 100;
      progressBar.style.width = progressWidth + '%';
      if (timeLeft <= 0) {
        clearInterval(timer);
        checkAnswer('');
      }
    }, 1000);
  }
  
  nextButton.addEventListener('click', nextQuestion);
  
  // Display the first question when the page loads
  displayQuestion();
  