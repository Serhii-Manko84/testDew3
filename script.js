// const wrapper = document.querySelector(".container");
// const input = document.querySelector(".container-input");
// const button = document.querySelector(".container-btn");

// function showText() {
//   const inputValue = input.value.trim();
//   if (inputValue !== "") {
//     const text = document.createElement("span");
//     text.className = "container-text";
//     text.innerText = inputValue;
//     wrapper.appendChild(text);
//     button.disabled = true;
//     input.value = "";
//   }
// }

// button.addEventListener("click", showText);
// input.addEventListener("input", () => {
//   button.disabled = false;
// });
// --------------------------------------------------------
const wrapper = document.querySelector(".container");
const input = document.querySelector(".container-input");
const button = document.querySelector(".container-btn");
const textContainer = document.querySelector(".container-text");

let isMouseDown = false;
let initialMouseX, initialMouseY;
let selectedLetters = [];
let ctrlPressed = false;

function showText() {
  const inputValue = input.value.trim();
  if (inputValue !== "") {
    // Clear existing text
    textContainer.innerHTML = "";

    const letters = inputValue.split("");
    const spans = letters.map((letter) => {
      const span = document.createElement("span");
      span.innerText = letter;
      span.classList.add("letter");
      return span;
    });
    spans.forEach((span) => {
      textContainer.appendChild(span);
      span.addEventListener("mousedown", handleMouseDown);
    });

    button.disabled = true;
    input.value = "";
  }
}

function handleMouseDown(event) {
  event.preventDefault();

  isMouseDown = true;
  const currentIndex = [...textContainer.children].indexOf(event.target);

  if (!ctrlPressed && !event.target.classList.contains("selected")) {
    clearSelection();
  }

  if (!event.target.classList.contains("selected")) {
    event.target.classList.add("selected");
    selectedLetters.push(event.target);
  }

  initialMouseX = event.clientX;
  initialMouseY = event.clientY;

  document.addEventListener("mousemove", handleMouseMove);
  document.addEventListener("mouseup", handleMouseUp);
}

function handleMouseMove(event) {
  if (isMouseDown) {
    const deltaX = event.clientX - initialMouseX;
    const deltaY = event.clientY - initialMouseY;

    selectedLetters.forEach((letter) => {
      const rect = letter.getBoundingClientRect();
      letter.style.position = "absolute";
      letter.style.left = `${rect.left + deltaX}px`;
      letter.style.top = `${rect.top + deltaY}px`;
    });

    initialMouseX = event.clientX;
    initialMouseY = event.clientY;
  }
}

function handleMouseUp() {
  isMouseDown = false;
  document.removeEventListener("mousemove", handleMouseMove);
  document.removeEventListener("mouseup", handleMouseUp);
}

function handleKeyDown(event) {
  if (event.key === "Control") {
    ctrlPressed = true;
  }
}

function handleKeyUp(event) {
  if (event.key === "Control") {
    ctrlPressed = false;
  }
}

function clearSelection() {
  selectedLetters.forEach((letter) => {
    letter.classList.remove("selected");
  });
  selectedLetters = [];
}

button.addEventListener("click", showText);
input.addEventListener("input", () => {
  button.disabled = false;
});

document.addEventListener("keydown", handleKeyDown);
document.addEventListener("keyup", handleKeyUp);

// -------------------------------------------------
