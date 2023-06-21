const navMenu = document.getElementById("nav-menu");
const toggleBtn = document.getElementById("header__toggle");
const closeBtn = document.getElementById("header__close");

toggleBtn.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

closeBtn.addEventListener("click", () => {
  navMenu.classList.remove("show");
});

fetch("materialData.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((res, index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      //   card.style = `--clr: #009688${index + 1}`;

      const imageHTML = `
        <div class="img-box">
          <img class="img" src="${res.image}" />
        </div>
      `;
      card.innerHTML += imageHTML;

      const content = document.createElement("div");
      content.classList.add("content");

      const contentTitle = document.createElement("h2");
      contentTitle.classList.add("content-title");
      contentTitle.innerText = res.level;
      content.appendChild(contentTitle);

      if (Array.isArray(res.category)) {
        res.category.forEach((categoryObj) => {
          const category = Object.keys(categoryObj)[0];
          const url = categoryObj[category];

          const btn = document.createElement("a");
          btn.classList.add("btn");
          btn.href = url;
          btn.target = "_blank"; // Open link in a new tab
          btn.innerText = category;
          content.appendChild(btn);
        });
      } else {
        const categoryObj = res.category[0];
        const category = Object.keys(categoryObj)[0];
        const url = categoryObj[category];

        const btn = document.createElement("a");
        btn.classList.add("btn");
        btn.href = url;
        btn.target = "_blank"; // Open link in a new tab
        btn.innerText = category;
        content.appendChild(btn);
      }

      card.appendChild(content);
      document.querySelector(".container").appendChild(card);
    });
  });
