const canvas = document.querySelector("#etch-a-sketch");
const ctx = canvas.getContext("2d");
const shakeBtn = document.querySelector(".shake");
const MOVE_AMOUNT = 20;
// const width = canvas.width;
// const height = canvas.height;
// short form of the above
const { width, height } = canvas;

let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.lineWidth = MOVE_AMOUNT;

let hue = 0;
ctx.strokeStyle = `hsl(${hue},100%,50%)`;

ctx.beginPath();
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

function drew({ key }) {
  // options is an object. allows to pass parameters inside the object.
  hue += 5;
  ctx.strokeStyle = `hsl(${hue},100%,50%)`;

  console.log(key);
  ctx.beginPath();
  ctx.moveTo(x, y);
  switch (key) {
    case "ArrowUp":
      y -= MOVE_AMOUNT;
      break;

    case "ArrowDown":
      y += MOVE_AMOUNT;
      break;

    case "ArrowLeft":
      x -= MOVE_AMOUNT;
      break;

    case "ArrowRight":
      x += MOVE_AMOUNT;
      break;

    default:
      break;
  }
  ctx.lineTo(x, y);
  ctx.stroke();
}

function handleKey(e) {
  if (e.key.includes("Arrow")) {
    e.preventDefault();
    drew({ key: e.key });
  }
  // console.log(e.key);
}

function clearCanvas() {
  canvas.classList.add("shake");
  ctx.clearRect(0, 0, width, height);
  canvas.addEventListener(
    "animationend",
    () => {
      canvas.classList.remove("shake");
    },
    { once: true },
  );
}

window.addEventListener("keydown", handleKey);
shakeBtn.addEventListener("click", clearCanvas);
