document.addEventListener("DOMContentLoaded", () => {
  const selectCategory = document.getElementById("category");
  const selectDifficulty = document.getElementById("difficulty");
  const questionEle = document.getElementById("question");
  const prevbtn = document.getElementById("Previous");
  const nextbtn = document.getElementById("next");
  const submit = document.getElementById("Submit");
  const startQuiz = document.getElementById("start-quiz");
  const start = document.getElementById("start");
  const container = document.getElementById("quiz-container");
  const questionNo = document.getElementById("question-no");

  let selectedValue = selectCategory.value;
  let difficultyValue = selectDifficulty.value;
  let currentIndex = 0;
  let questions = [];
  let selectedAnswers = {};
  let currentChoices = []; // Stores the current question's shuffled choices

  fetchCategory(); // Fetch categories when the page loads

  selectCategory.addEventListener("change", function () {
    selectedValue = selectCategory.value;
  });

  selectDifficulty.addEventListener("change", function () {
    difficultyValue = selectDifficulty.value;
  });

  startQuiz.addEventListener("click", async function () {
    if (!selectedValue || !difficultyValue) {
      alert("Please select both category and difficulty!");
      return;
    }

    start.style.display = "none";
    container.style.display = "block";
    
    questions = await fetchQuestions();

    if (questions && questions.length > 0) {
      loadQuestion();
    } else {
      alert(
        "No questions available. Please try another category or difficulty."
      );
    }
  });

  async function fetchCategory() {
    try {
      const response = await fetch("https://opentdb.com/api_category.php");
      if (!response.ok) throw new Error("Network issue");
      const data = await response.json();

      data.trivia_categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        selectCategory.appendChild(option);
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchQuestions() {
    try {
      const response = await fetch(
        `https://opentdb.com/api.php?amount=10&category=${selectedValue}&difficulty=${difficultyValue}&type=multiple`
      );
      if (!response.ok) throw new Error("Network issue");
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.log("Error:", error);
      return [];
    }
  }

  function loadQuestion() {
    if (!questions || questions.length === 0) {
      console.log("No questions available");
      return;
    }

    const currentQuestion = questions[currentIndex];
    questionEle.textContent = currentQuestion.question;

    questionNo.textContent = `Question ${currentIndex + 1}`;
    // Shuffle and store the choices for the current question
    currentChoices = [
      currentQuestion.correct_answer,
      ...currentQuestion.incorrect_answers,
    ].sort(() => Math.random() - 0.5);

    // Update the option elements with the current choices
    currentChoices.forEach((option, index) => {
      const optionEle = document.getElementById("option" + index);
      const radioInput = document.querySelector(
        `input[name="option"][value="${index}"]`
      );

      if (optionEle && radioInput) {
        optionEle.textContent = option;
      }
    });

    document
      .querySelectorAll('input[name="option"]')
      .forEach((input) => (input.checked = false));

    // Restore the previously selected answer, if any
    const savedAnswer = selectedAnswers[currentIndex];
    if (savedAnswer) {
      const savedIndex = currentChoices.indexOf(savedAnswer);
      if (savedIndex > -1) {
        const savedOption = document.querySelector(
          `input[name="option"][value="${savedIndex}"]`
        );
        if (savedOption) savedOption.checked = true;
      }
    }
    if (currentIndex === questions.length - 1) {
      nextbtn.style.display = "none";
      submit.style.display = "inline";
    } else {
      nextbtn.style.display = "inline";
      submit.style.display = "none";
    }
  }

  nextbtn.addEventListener("click", checkAnswer);

  function checkAnswer() {
    const selectedOption = document.querySelector(
      'input[name="option"]:checked'
    );

    if (!selectedOption) {
      alert("Please select an option");
      return;
    }

    selectedAnswers[currentIndex] = currentChoices[selectedOption.value];

    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      alert("Quiz finished!");
    }
  }

  prevbtn.addEventListener("click", preCheckAnswer);

  function preCheckAnswer() {
    if (currentIndex > 0) {
      const selectedOption = document.querySelector(
        'input[name="option"]:checked'
      );
      if (selectedOption) {
        selectedAnswers[currentIndex] = currentChoices[selectedOption.value];
      }

      currentIndex--;
      loadQuestion();
    }
  }

  submit.addEventListener("click", showResults);

  function showResults() {
    let score = 0;

    questions.forEach((question, index) => {
      const correctAnswer = question.correct_answer;
      const selectedAnswer = selectedAnswers[index];

      if (selectedAnswer === correctAnswer) {
        score++;
      }
    });

    const totalQuestions = questions.length;
    const scorePercentage = (score / totalQuestions) * 100;
    let message;

    if (scorePercentage >= 80) {
      message = "Excellent work!";
    } else if (scorePercentage >= 50) {
      message = "Good job!";
    } else {
      message = "Better luck next time!";
    }

    alert(
      `Your score: ${score}/${totalQuestions} (${scorePercentage.toFixed(2)}%)\n${message}`
    );

    // Optionally, reset the quiz
    resetQuiz();
  }

  function resetQuiz() {
    selectedAnswers = {};
    currentIndex = 0;
    questions = [];
    start.style.display = "block";
    container.style.display = "none";
    selectCategory.value = "9";
    selectDifficulty.value = "easy";
  }
});
