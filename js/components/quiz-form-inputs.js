const template = document.createElement("template");
template.innerHTML = `
  <form class="category-choice__form" id="quiz-form">
    <article class="category-choice__question" data-question-id="1">
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

    const node = template.content.cloneNode(true);
    const article = node.querySelector(".category-choice__question");
    const heading = node.querySelector(".category-choice__question-text");
    const optionsWrapper = node.querySelector(".category-choice__inputField");
    const nextLabelBtn = node.querySelector(".category-choice__next");
    const backLabelBtn = node
      .querySelector(".category-choice__back")
      .closest("button");

    article.setAttribute("data-question-id", id);
    heading.id = `q${id}-label`;
    heading.textContent = text;
    optionsWrapper.setAttribute("aria-labelledby", `q${id}-label`);
    nextLabelBtn.textContent = isLast ? "Submit" : "Next";

    if (isFirst) {
      backLabelBtn.remove();
    }

    for (let i = 0; i < Number(inputCount); i++) {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `q${id}-answer`;
      input.name = `question${id}`;
      input.className = "category-choice__input";
      input.value = answerValue;
      optionsWrapper.appendChild(input);
    }

    this.replaceChildren(node);

    this.querySelector("#quiz-form").addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const value = formData.get(`question${id}`);

      this.dispatchEvent(
        new CustomEvent("quiz-answer", {
          detail: { questionId: id, value },
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
