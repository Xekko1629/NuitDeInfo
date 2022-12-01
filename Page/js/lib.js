/*
** EPITECH PROJECT, 2022
** NuitDeInfo
** File description:
** lib.js
*/

var Question = function (questionObj) {
    this.value = {
      text: "Question",
      answers: [],
      expl_txt: "expl_txt"
    };
  
    this.selectedAnswer = null;
    this.html = null;
    this.questionText = null;
    this.questionExpl_txt = null;
    this.questionAnswers = null;
    this.questionFeedback = null;
  
    this.value = Object.assign(this.value, questionObj);
  
    this.onQuestionAnswered = ({ detail }) => {
      this.selectedAnswer = {
        value: detail.answer,
        html: detail.answerHtml
      };
      this.update();
  
      document.dispatchEvent(
        new CustomEvent("question-answered", {
          detail: {
            question: this,
            answer: detail.answer
          }
        })
      );
    };
  
    this.create = function () {
      this.html = document.createElement("div");
      this.html.classList.add("question");
  
      this.questionText = document.createElement("h2");
      this.questionText.textContent = this.value.text;
      this.questionExpl_txt = document.createElement("h3");
      this.questionExpl_txt.textContent = this.value.expl_txt;
  
      this.questionAnswers = document.createElement("div");
      this.questionAnswers.classList.add("answers");
  
      for (let i = 0; i < this.value.answers.length; i++) {
        const ansObj = this.value.answers[i];
        let answer = createAnswer(ansObj);
  
        answer.onclick = (ev) => {
          if (this.selectedAnswer !== null) {
            this.selectedAnswer.html.classList.remove("selected");
          }
  
          answer.classList.add("selected");
  
          this.html.dispatchEvent(
            new CustomEvent("question-answered", {
              detail: {
                answer: ansObj,
                answerHtml: answer
              }
            })
          );
        };
  
        this.questionAnswers.appendChild(answer);
      }
  
      this.questionFeedback = document.createElement("div");
      this.questionFeedback.classList.add("question-feedback");
  
      this.html.appendChild(this.questionText);
      this.html.appendChild(this.questionAnswers);
      this.html.appendChild(this.questionFeedback);
  
      this.html.addEventListener("question-answered", this.onQuestionAnswered);
  
      return this.html;
    };
  
    this.disable = function () {
      this.html.classList.add("disabled");
      this.html.onclick = (ev) => {
        ev.stopPropagation();
      };
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      let answers = this.html.querySelectorAll(".answer");
      for (let i = 0; i < answers.length; i++) {
        let answer = answers[i];
        answer.onclick = null;
      }
    };
  
    this.remove = function () {
      let children = this.html.querySelectorAll("*");
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        this.html.removeChild(child);
      }
  
      this.html.removeEventListener("question-answered", this.onQuestionAnswered);
  
      this.html.parentNode.removeChild(this.html);
      this.html = null;
    };
  
    this.update = function () {
      let correctFeedback, incorrectFeedback;
      this.html = this.html || document.createElement("div");
  
      correctFeedback = "Tu as eu juste !";
      incorrectFeedback = `Pas la bonne réponse !<br> ${this.questionExpl_txt.textContent}`;
  
      if (this.selectedAnswer !== null) {
        if (this.selectedAnswer.value.isCorrect) {
          this.html.classList.add("correct");
          this.html.classList.remove("incorrect");
          this.questionFeedback.innerHTML = correctFeedback;
        } else {
          this.html.classList.add("incorrect");
          this.html.classList.remove("correct");
          this.questionFeedback.innerHTML = incorrectFeedback;
        }
      }
    };
  
    function createAnswer(obj) {
      this.value = {
        text: "Answer",
        isCorrect: false
      };
  
      this.value = Object.assign(this.value, obj);
  
      this.html = document.createElement("button");
      this.html.classList.add("answer");
  
      this.html.textContent = this.value.text;
  
      return this.html;
    }
  };
  
  let questionsData = [
    {
      text: "Le VIH et le sida, c’est la même chose.",
      answers: [
        {
          text: "Vrai",
          isCorrect: false
        },
        {
          text: "False",
          isCorrect: true
        }
      ]
    },
    {
      text: "Les moustiques peuvent transmettre le VIH.",
      answers: [
        {
          text: "Vrai",
          isCorrect: false
        },
        {
          text: "False",
          isCorrect: true
        }
      ]
    },
    {
      text: "Embrasser une personne séropositive est sans danger.",
      answers: [
        {
          text: "Vrai",
          isCorrect: true
        },
        {
          text: "False",
          isCorrect: false,
        }
      ]
    },
    {
      text: "La transpiration d’une personne séropositive peut transmettre le VIH.",
      answers: [
        {
          text: "Vrai",
          isCorrect: false
        },
        {
          text: "False",
          isCorrect: true
        }
      ]
    },
    {
      text: "Faire l’amour avec une personne séropositive sous traitement est risqué.",
      answers: [
        {
          text: "Vrai",
          isCorrect: false
        },
        {
          text: "False",
          isCorrect: true
        }
      ]
    },
    {
      text: "On peut attraper le VIH pendant le sexe oral.",
      answers: [
        {
          text: "Vrai",
          isCorrect: true
        },
        {
          text: "False",
          isCorrect: false
        }
      ]
    },
    {
      text: "Une personne séropositive ne peut pas avoir d’enfants.",
      answers: [
        {
          text: "Vrai",
          isCorrect: false
        },
        {
          text: "False",
          isCorrect: true
        }
      ]
    },
    {
      text: "On peut attraper le VIH même en utilisant un préservatif.",
      answers: [
        {
          text: "Vrai",
          isCorrect: false
        },
        {
          text: "False",
          isCorrect: true
        }
      ]
    },
    {
      text: "On ne peut pas guérir du Sida.",
      answers: [
        {
          text: "Vrai",
          isCorrect: true
        },
        {
          text: "False",
          isCorrect: false
        }
      ]
    },
    {
      text: "Une femme séropositive peut transmettre le sida à son enfant.",
      answers: [
        {
          text: "Vrai",
          isCorrect: true
        },
        {
          text: "False",
          isCorrect: false
        }
      ]
    },
    {
      text: "Le préservatif est le seul moyen de se protéger contre le VIH et les autres IST.",
      answers: [
        {
          text: "Vrai",
          isCorrect: true
        },
        {
          text: "False",
          isCorrect: false
        }
      ]
    },
    {
      text: "Je peux voir plusieurs infections sexuellement transmissibles à la fois ?",
      answers: [
        {
          text: "Vrai",
          isCorrect: true
        },
        {
          text: "False",
          isCorrect: false
        }
      ]
    }
  ];
  
  let questions = [];
  let score = 0,
    answeredQuestions = 0;
  let appContainer = document.getElementById("questions-container");
  let scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = `Score: ${score}/${questionsData.length}`;

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  
  shuffle(questionsData);
  
  for (var i = 0; i < questionsData.length; i++) {
    let question = new Question({
      text: questionsData[i].text,
      answers: questionsData[i].answers,
      expl_txt: questionsData[i].expl_txt
    });
  
    appContainer.appendChild(question.create());
    questions.push(question);
  }
  
  document.addEventListener("question-answered", ({ detail }) => {
    if (detail.answer.isCorrect) {
      score++;
    }
  
    answeredQuestions++;
    scoreContainer.innerHTML = `Score: ${score}/${questions.length}`;
    detail.question.disable();
  
    if (answeredQuestions == questions.length) {
      setTimeout(function () {
        var val = confirm(`Vous avez terminé le quiz ! \nScore Final: ${score}/${questions.length}`);
        if (val == true) {
          document.location.href='https://google.com'
        } else if (val == false) {
          document.location.reload()
        }
      }, 100);
  
    }
  });
