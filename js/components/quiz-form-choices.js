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
        class="category-choice__options"
        role="radiogroup"
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
    return ["question-id", "question-text", "choices", "is-last", "is-first", "current-progress", "total-questions"];
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
    const totalQuestions = this.getAttribute("total-questions") || 0;
    const currentProgress = this.getAttribute("current-progress") || 0;
  
    let choices = [];

    try {
      choices = JSON.parse(this.getAttribute("choices")) || [];
    } catch {
      choices = [];
    }

    const node = template.content.cloneNode(true);
    const article = node.querySelector(".category-choice__question");
    const heading = node.querySelector(".category-choice__question-text");
    const optionsWrapper = node.querySelector(".category-choice__options");
    const nextLabelBtn = node.querySelector(".category-choice__next");
    const backLabelBtn = node.querySelector(".category-choice__back").closest("button");
    const currentProgressHolder = node.querySelector(".category-choice__currentProgress");
    const totalQuestionHolder = node.querySelector(".category-choice__totalQuestions");

    article.setAttribute("data-question-id", id);
    heading.id = `q${id}-label`;
    heading.textContent = text;
    optionsWrapper.setAttribute("aria-labelledby", `q${id}-label`);
    nextLabelBtn.textContent = isLast ? "Submit" : "Next";

    // Holds Current Progress
    currentProgressHolder.textContent = currentProgress;
    currentProgressHolder.setAttribute("data-current-progress", currentProgress);
    
    // Holds total Questions
    totalQuestionHolder.textContent = totalQuestions;
    totalQuestionHolder.setAttribute("data-total-question", totalQuestions);

    if(isFirst){
      backLabelBtn.remove();
    }
    
    choices.forEach((choice, i) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "category-choice__option";
      optionDiv.innerHTML = `
          <input
          type="radio"
          id="q${id}-option${i + 1}"
          name="question${id}"
          value="${choice.value}"
          class="category-choice__input"
        />
        <label for="q${id}-option${i + 1}" class="category-choice__label">
          ${choice.label}
        </label>
      `;
      optionsWrapper.appendChild(optionDiv);
    });

    this.replaceChildren(node);

    //wire the submit listener AFTER the new form is in the DOM
    this.querySelector("#quiz-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const checked = this.querySelector(`input[name="question${id}"]:checked`);

      this.dispatchEvent(
        new CustomEvent("quiz-answer", {
          detail: { questionId: id, value: checked ? [checked.value] : [] },
          bubbles: true,
        }),
      );
    });

    // guard: only wire the back button if it actually rendered
    const liveBackBtn = this.querySelector(".category-choice__back")?.closest("button");
    if (liveBackBtn) {
      liveBackBtn.addEventListener("click", () => {
        this.dispatchEvent(new CustomEvent("quiz-back", { bubbles: true }));
      });
    }
  }
}

customElements.define("quiz-form", QuizForm);
