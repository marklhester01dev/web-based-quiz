const template = document.createElement("template");
template.innerHTML = `
      <article class="category">
        <div class="category__caption" tabindex="0">
          <h3 class="category__title"></h3>
          <p class="category__description">
          </p>
        </div>

        <div class="category__details" tabindex="0">
          <ul class="category__list">
            <li class="category__list-item">
              <i class="ph ph-list-numbers custom-large-icon" aria-hidden="true"></i>
              <p class="category__list-text"></p>
            </li>
            <li class="category__list-item">
              <i class="ph ph-list-bullets custom-large-icon" aria-hidden="true"></i>
              <p class="category__list-text"></p>
            </li>
            <li class="category__list-item">
              <i class="ph ph-clock custom-large-icon" aria-hidden="true"></i>
              <p class="category__list-text"></p>
            </li>
          </ul>
        </div>

        <div class="category__link">
          <a target="_self" class="category__link-page">
            <i class="ph ph-outline ph-note-pencil"></i>
            <p class="category__link-caption">Take this Quiz</p>
          </a>
        </div>
      </article>
`;

class CategoryCards extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["card-title", "items", "options", "time", "link"];
  }

  connectedCallback() {
    this.hasConnected = true;
    this._renderCategoryCards();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.hasConnected || oldValue === newValue) return;

    if (this._renderScheduled) return;

    this._renderScheduled = true;

    queueMicrotask(() => {
      this._renderScheduled = false;
      this._renderCategoryCards();
    });
  }

  _renderCategoryCards() {
    const categoryContent = {
      title: this.getAttribute("card-title") || "Untitled Category",
      items: this.getAttribute("items") || "0 Items",
      options: this.getAttribute("options") || "0 Options",
      time: this.getAttribute("time") || "N/A",
      link: this.getAttribute("link") || "#",
    };

    const node = template.content.cloneNode(true);

    const title = node.querySelector(".category__title");
    const items = node.querySelector(
      ".category__list-item:nth-child(1) .category__list-text"
    );
    const options = node.querySelector(
      ".category__list-item:nth-child(2) .category__list-text"
    );
    const time = node.querySelector(
      ".category__list-item:nth-child(3) .category__list-text"
    );

    node
      .querySelector(".category__link-page")
      .setAttribute("href", categoryContent.link);

    title.textContent = categoryContent.title;
    items.textContent = categoryContent.items;
    options.textContent = categoryContent.options;
    time.textContent = categoryContent.time;

    this.replaceChildren(node);
  }
}

customElements.define("category-card", CategoryCards);
