// Selecting form
const form = document.querySelector("form");

// Function to handle form submission
const handleFormData = (e) => {
  e.preventDefault();

  // Retrieving input elements
  const rollNumber = document.getElementById("roll_no");
  const nameInput = document.getElementById("name");
  const batchInput = document.getElementById("batch");
  const sectionInput = document.getElementById("section");

  const rollNum = rollNumber.value;
  const name = nameInput.value;
  const batch = batchInput.value;
  const section = sectionInput.value;

  // Storing Data in Session Storage

  sessionStorage.setItem("roll_no", rollNum);
  sessionStorage.setItem("name", name);
  sessionStorage.setItem("batch", batch);
  sessionStorage.setItem("section", section);

  // Submitting the form
  form.submit();
};

// Handling form submission event
form.addEventListener("submit", handleFormData);

//  Quiz Data

const quizData = [
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<script>", "<javascript>", "<scripting>", "<section>"],
    correct: 0,
  },
  {
    question: "Which property is used to control spacing between element?",
    options: ["margin", "padding", "spacing", "border-spacing"],
    correct: 1,
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper text markup Language",
      "Hyper transfer markup Language",
      "Hyper text machine Language",
      "Hyperlink text markup Language",
    ],
    correct: 0,
  },
  {
    question: "How to write an IF statement in JavaScript?",
    options: ["if i = 5 then", "if i == 5 then", "if (i == 5)", "if i = 5"],
    correct: 1,
  },
  {
    question: "How does a FOR loop start?",
    options: [
      "for (i = 0; i = 5)",
      "for (i = 0; i = 5 i++)",
      "for (i = 0; i = 1 to 5)",
      "for (i = 0; i &lt;= 5)",
    ],
    correct: 1,
  },
];

const answerElm = document.querySelectorAll(".answer");
const quiz = document.querySelector("#quiz");
const [questionElm, option_1, option_2, option_3, option_4] =
  document.querySelectorAll(
    "#question , .option_1 , .option_2 , .option_3 , .option_4"
  );

const submitBtn = document.querySelector("#submi");

let currentQues = 0;

let score = 0;

const loadQues = () => {
  const { question, options } = quizData[currentQues];

  questionElm.innerText = question;

  options.forEach(
    (curOption, index) => (window[`option_${index + 1}`].innerText = curOption)
  );
};
loadQues();

// Get Selected answer on button click

const getSelectedOption = () => {
  let ans_index;

  answerElm.forEach((curOption, index) => {
    if (curOption.checked) {
      ans_index = index;
    }
  });
  return ans_index;
};

// Deselect Answer

const deselectAns = () => {
  answerElm.forEach((curElm) => (curElm.checked = false));
};

submitBtn.addEventListener("click", () => {
  const selectedOpton = getSelectedOption();
  console.log(selectedOpton);

  if (selectedOpton === quizData[currentQues].correct) {
    score = score + 1;
  }

  const obtainedScore = `${score}/${quizData.length}`;
  currentQues++;

  sessionStorage.setItem("score", obtainedScore);
  if (currentQues < quizData.length) {
    deselectAns();
    loadQues();
  } else {
    window.location.href = "result.html";
  }
});
