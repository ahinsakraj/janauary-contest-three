const catContainer = document.querySelector("#category_container");
const startBtn = document.querySelector("#hero button");
const tagSpan = document.querySelectorAll(".tag>span");
const tagBtn = document.querySelectorAll(".tag>button");
const startQuiz = document.querySelector("#category>button");
const questionSection = document.getElementById("question_section");

// Quiz questions
let quizData = [
  {
    category: "General Knowledge",
    questions: [
      {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: [
          "Harper Lee",
          "George Orwell",
          "Jane Austen",
          "F. Scott Fitzgerald",
        ],
        answer: "Harper Lee",
      },
      {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: "Paris",
      },
      // Add more questions...
    ],
  },
  {
    category: "Science",
    questions: [
      {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        answer: "Au",
      },
      {
        question: "Who developed the theory of relativity?",
        options: [
          "Isaac Newton",
          "Albert Einstein",
          "Galileo Galilei",
          "Stephen Hawking",
        ],
        answer: "Albert Einstein",
      },
      // Add more questions...
    ],
  },
  // Add more categories...
  {
    category: "History",
    questions: [
      {
        question: "In which year did World War II end?",
        options: ["1943", "1945", "1950", "1939"],
        answer: "1945",
      },
      {
        question: "Who was the first President of the United States?",
        options: [
          "John Adams",
          "George Washington",
          "Thomas Jefferson",
          "James Madison",
        ],
        answer: "George Washington",
      },
      // Add more questions...
    ],
  },
  // Add more categories...
  {
    category: "Mathematics",
    questions: [
      {
        question: "What is the value of π (pi) to two decimal places?",
        options: ["3.14", "2.71", "1.62", "4.20"],
        answer: "3.14",
      },
      {
        question: "What is the square root of 25?",
        options: ["5", "6", "4", "7"],
        answer: "5",
      },
      // Add more math questions...
    ],
  },

  {
    category: "Geography",
    questions: [
      {
        question: "Which is the longest river in the world?",
        options: ["Nile", "Amazon", "Yangtze", "Mississippi"],
        answer: "Amazon",
      },
      {
        question: "What is the capital of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra",
      },
      // Add more geography questions...
    ],
  },
  // Add more categories...
];

// Function to toggle category section

function toggleCategory(e) {
  if (catContainer.style.display === "none") {
    catContainer.style.display = "flex";
  } else catContainer.style.display = "none";
}

startBtn.addEventListener("click", toggleCategory);

let selectedCategories = [];
function tagSelect(close, button) {
  if (close.style.display === "none") {
    close.style.display = "flex";
    button.style.backgroundColor = "#FFCD2E";
    selectedCategories.push(button.innerText);
  } else {
    close.style.display = "none";
    button.style.backgroundColor = "#d1d1d1";
    selectedCategories = selectedCategories.filter(
      (item) => item !== button.innerText
    );
  }
}
tagBtn.forEach((item) => {
  item.addEventListener("click", (e) => {
    const close = e.target.nextElementSibling;
    const button = e.target;
    tagSelect(close, button);
  });
});
tagSpan.forEach((item) => {
  item.addEventListener("click", (e) => {
    const close = e.currentTarget;
    const button = e.currentTarget.previousElementSibling;
    tagSelect(close, button);
  });
});

// Function for Showing questions
let score = 0;
const questionText = document.querySelector(".question_text");
const optins = document.querySelectorAll(".sub_option");
const nextBtn = document.querySelector(".nextBtn");
const prevBtn = document.querySelector(".prevBtn");
const skipBtn = document.querySelector(".skipBtn");

function clearSelection() {
  document.querySelectorAll(".option").forEach((item) => {
    item.style.backgroundColor = "#d1d1d1";
  });
}

// Function for showing the final score.
function showScore() {
  document.querySelector(".navigation").remove();
  const h2 = document.createElement("h2");
  h2.innerText = `SCORE : ${score}`;
  h2.classList.add("score");
  questionSection.append(h2);

  document.querySelector(".card").style.display = "block";
  const innerH2 = document.querySelector(".card>h2");
  innerH2.innerText = `Your Score is : ${score}`;
}

// card button for closing quiz score.
document.querySelector(".card>button").addEventListener("click", () => {
  document.querySelector(".card").style.display = "none";
  questionSection.style.display = "none";
  location.reload();
});

function showTheQuestion(arr, queCtn) {
  if (queCtn === arr.length) showScore(); //It will show the total score
  if (queCtn < 0) queCtn = arr.length - 1;

  let selectedOption;
  questionText.innerText = arr[queCtn].question;
  clearSelection();
  optins.forEach((item, idx) => {
    item.innerText = arr[queCtn].options[idx];

    item.parentNode.addEventListener("click", (e) => {
      selectedOption = item.innerText;
      clearSelection();
      e.currentTarget.style.backgroundColor = "#FCC822";
    });
  });

  //   Next button event
  nextBtn.addEventListener("click", (e) => {
    if (selectedOption === arr[queCtn].answer) score++;
    selectedOption = undefined;
    queCtn++;
    showTheQuestion(arr, queCtn);
    e.stopImmediatePropagation();
  });

  //   Prev Button event
  prevBtn.addEventListener("click", (e) => {
    queCtn--;
    showTheQuestion(arr, queCtn);
    e.stopImmediatePropagation();
  });

  //   skip button event
  skipBtn.addEventListener("click", (e) => {
    queCtn++;
    showTheQuestion(arr, queCtn);
    e.stopImmediatePropagation();
  });
}
function getQuestions() {
  questionSection.style.display = "flex";
  selectedCategories = selectedCategories.filter((item) => item !== "TagBadge");
  const questionArr = [];
  selectedCategories.forEach((item) => {
    for (let i = 0; i < quizData.length; i++) {
      if (item === quizData[i].category) {
        questionArr.push(...quizData[i].questions);
      }
    }
  });
  console.log(questionArr);
  showTheQuestion(questionArr, 0);
}
startQuiz.addEventListener("click", () => {
  if (selectedCategories.length >= 5) {
    toggleCategory();
    getQuestions();
  } else alert(`Kindly select more than 5 categories`);
});