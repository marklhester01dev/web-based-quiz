const template = document.createElement("template");
template.innerHTML = `
    <form class="multiple-choice__form" id="quiz-form">
      <article class="multiple-choice__question" data-question-id="1">
        <h2 id="q1-label" class="multiple-choice__question-text"></h2>

        <div
        class="multiple-choice__options"
        role="radiogroup"
        aria-labelledby="q1-label"
        >
        </div>
      </article>

      <button type="submit" class="multiple-choice__btn">
        <span class="multiple-choice__next">Next</span>
        <i class="ph ph-arrow-right"></i>
      </button>
  </form>
    `;

class QuizForm extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["question-id", "question-text", "choices", "is-last"];
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

    let choices = [];

    try {
      choices = JSON.parse(this.getAttribute("choices")) || [];
    } catch {
      choices = [];
    }

    const node = template.content.cloneNode(true);
    const article = node.querySelector(".multiple-choice__question");
    const heading = node.querySelector(".multiple-choice__question-text");
    const optionsWrapper = node.querySelector(".multiple-choice__options");
    const nextLabelBtn = node.querySelector(".multiple-choice__next");

    article.setAttribute("data-question-id", id);
    heading.id = `q${id}-label`;
    heading.textContent = text;
    optionsWrapper.setAttribute("aria-labelledby", `q${id}-label`);
    nextLabelBtn.textContent = isLast ? "Submit" : "Next";

    choices.forEach((choice, i) => {
      const optionDiv = document.createElement("div");
      optionDiv.className = "multiple-choice__option";
      optionDiv.innerHTML = `
          <input
          type="radio"
          id="q${id}-option${i + 1}"
          name="question${id}"
          value="${choice.value}"
          class="multiple-choice__input"
        />
        <label for="q${id}-option${i + 1}" class="multiple-choice__label">
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
          detail: { questionId: id, value: checked ? checked.value : null },
          bubbles: true,
        }),
      );
    });
  }
}

customElements.define("quiz-form", QuizForm);
