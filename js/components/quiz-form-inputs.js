const template = document.createElement("template");
template.innerHTML = `
  <form class="category-choice__form" id="quiz-form">
    <article class="category-choice__question" data-question-id="1">

      <div class="category-choice__tracker">
        <span>Question</span>
        <span class="category-choice__currentProgress" data-current-progress="1"></span>
        <span>out of</span>
        <span class="category-choice__totalQuestions" data-total-question="1"></span>
      </div>
     
      <h2 id="q1-label" class="category-choice__question-text"></h2>

      <div
        class="category-choice__inputField"
        role="group"
        aria-labelledby="q1-label"
      >
      </div>
    </article>

    <div class="category-choice__actions">
      <button type="button" class="category-choice__btn">
        <span class="category-choice__back">Back</span>
      </button>

      <button type="submit" class="category-choice__btn">
        <span class="category-choice__next">Next</span>
      </button>
    </div>
  </form>
`;

class QuizForm extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return [
      "question-id",
      "question-text",
      "is-last",
      "is-first",
      "current-answer",
      "input-count",
      "current-progress",
      "total-questions",
    ];
  }

  connectedCallback() {
    this.hasConnected = true;
    this._renderQuizForm();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasConnected || oldValue === newValue) return;

    if (this.renderScheduled) return;
    this.renderScheduled = true;

    queueMicrotask(() => {
      this.renderScheduled = false;
      this._renderQuizForm();
    });
  }

  _renderQuizForm() {
    const id = this.getAttribute("question-id") || "0";
    const text =
      this.getAttribute("question-text") || "No question text provided.";
    const isLast = this.getAttribute("is-last") === "true";
    const isFirst = this.getAttribute("is-first") === "true";
    const answerValue = this.getAttribute("current-answer") || "";
    const inputCount = this.getAttribute("input-count") || "1";
    const totalQuestions = this.getAttribute("total-questions") || 0;
    const currentProgress = this.getAttribute("current-progress") || 0;

    const node = template.content.cloneNode(true);
    const article = node.querySelector(".category-choice__question");
    const heading = node.querySelector(".category-choice__question-text");
    const optionsWrapper = node.querySelector(".category-choice__inputField");
    const nextLabelBtn = node.querySelector(".category-choice__next");
    const backLabelBtn = node
      .querySelector(".category-choice__back")
      .closest("button");
    const currentProgressHolder = node.querySelector(
      ".category-choice__currentProgress",
    );
    const totalQuestionHolder = node.querySelector(
      ".category-choice__totalQuestions",
    );

    article.setAttribute("data-question-id", id);
    heading.id = `q${id}-label`;
    heading.textContent = text;
    optionsWrapper.setAttribute("aria-labelledby", `q${id}-label`);
    nextLabelBtn.textContent = isLast ? "Submit" : "Next";

    // Holds Current Progress
    currentProgressHolder.textContent = currentProgress;
    currentProgressHolder.setAttribute(
      "data-current-progress",
      currentProgress,
    );

    // Holds total Questions
    totalQuestionHolder.textContent = totalQuestions;
    totalQuestionHolder.setAttribute("data-total-question", totalQuestions);

    if (isFirst) {
      backLabelBtn.remove();
    }

    for (let i = 0; i < Number(inputCount); i++) {
      const input = document.createElement("input");
      if (i === 0) {
        input.id = `q${id}-answer`;
      }
      input.type = "text";
      input.name = `question${id}-input${i + 1}`;
      input.className = `category-choice__input q${id}-answer`;
      input.value = answerValue;
      optionsWrapper.appendChild(input);
    }

    this.replaceChildren(node);

    this.querySelector("#quiz-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const userInputs = {};
      const inputs = document.querySelectorAll(".category-choice__input");

      inputs.forEach((item) => {
        userInputs[item.name] = item.value;
        console.log(userInputs);
      });

      this.dispatchEvent(
        new CustomEvent("quiz-answer", {
          detail: { questionId: id, userInputs },
          bubbles: true,
        }),
      );
    });

    const liveBackBtn = this.querySelector(".category-choice__back")?.closest(
      "button",
    );
    if (liveBackBtn) {
      liveBackBtn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("quiz-back", { bubbles: true }));
      });
    }
  }
}

customElements.define("quiz-form", QuizForm);
