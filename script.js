const questions = [
    {
      question: "Question 1: What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: 0
    },
    {
      question: "Question 2: Who painted the Mona Lisa?",
      choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
      correctAnswer: 0
    },
    // Add more questions here
  ];
  
  let currentQuestionIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let leaderboard = [];
  
  const questionElement = document.getElementById("question");
  const choicesElement = document.getElementById("choices");
  const submitButton = document.getElementById("submit-btn");
  const resultContainer = document.getElementById("result-container");
  const resultElement = document.getElementById("result");
  const leaderboardBody = document.getElementById("leaderboard-body");
  
  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = currentQuestion.question;
  
    choicesElement.innerHTML = "";
  
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      const choice = currentQuestion.choices[i];
      const li = document.createElement("li");
      li.textContent = choice;
      choicesElement.appendChild(li);
    }
  }
  
  function checkAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
  
    if (selectedIndex === currentQuestion.correctAnswer) {
      correctAnswers++;
      resultElement.textContent = "Correct!";
      resultElement.style.color = "green";
    } else {
      incorrectAnswers++;
      resultElement.textContent = "Incorrect!";
      resultElement.style.color = "red";
    }
  
    resultContainer.style.display = "block";
  }
  
  function showNextQuestion() {
    currentQuestionIndex++;
  
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      displayLeaderboard();
    }
  }
  
  function displayLeaderboard() {
    const participant = `Participant ${leaderboard.length + 1}`;
    const leaderboardEntry = {
      participant,
      correctAnswers,
      incorrectAnswers
    };
    leaderboard.push(leaderboardEntry);
  
    leaderboard.sort((a, b) => b.correctAnswers - a.correctAnswers);
  
    leaderboardBody.innerHTML = "";
  
    for (let i = 0; i < leaderboard.length; i++) {
      const entry = leaderboard[i];
      const row = document.createElement("tr");
      const participantCell = document.createElement("td");
      const correctCell = document.createElement("td");
      const incorrectCell = document.createElement("td");
  
      participantCell.textContent = entry.participant;
      correctCell.textContent = entry.correctAnswers;
      incorrectCell.textContent = entry.incorrectAnswers;
  
      row.appendChild(participantCell);
      row.appendChild(correctCell);
      row.appendChild(incorrectCell);
  
      leaderboardBody.appendChild(row);
    }
  
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("leaderboard-container").style.display = "block";
  }
  
  submitButton.addEventListener("click", function () {
    const selectedAnswerIndex = Array.from(choicesElement.children).indexOf(document.querySelector("li.selected"));
  
    if (selectedAnswerIndex !== -1) {
      checkAnswer(selectedAnswerIndex);
      showNextQuestion();
    }
  });
  
  choicesElement.addEventListener("click", function (event) {
    const clickedElement = event.target;
  
    if (clickedElement.tagName === "LI") {
      Array.from(choicesElement.children).forEach((choiceElement) => {
        choiceElement.classList.remove("selected");
      });
  
      clickedElement.classList.add("selected");
    }
  });
  
  displayQuestion();
  