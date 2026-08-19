import RunCode from "../src/index.ts"

const STORAGE_KEY = "runcodejs-playground"

const defaultCode = {
  html: `<div class="bubble-field"></div>

<div class="prompt">
  <h1>Bubbles 🎐</h1>
  <p>Click anywhere to spawn a bubble.</p>
</div>`,
  css: `:root { color-scheme: dark; }

* { box-sizing: border-box; }

body {
  margin: 0;
  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: system-ui, sans-serif;
  background: linear-gradient(160deg, #0b0e1a 0%, #1a1a2e 45%, #542064 100%);
  color: #e7ecff;
  overflow: hidden;
}

.bubble-field {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: auto;
}

.bubble {
  position: absolute;
  bottom: calc(-1 * var(--size));
  left: var(--left);
  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%,
    rgba(255, 255, 255, 0.55),
    rgba(84, 32, 100, 0.5),
    rgba(12, 36, 114, 0.35));
  box-shadow:
    inset 0 0 12px rgba(255, 255, 255, 0.25),
    0 0 18px rgba(56, 189, 248, 0.25);
  opacity: 0.6;
  animation: rise var(--dur) linear infinite;
  animation-delay: var(--delay);
}

@keyframes rise {
  0%   { transform: translateY(0) translateX(0); }
  25%  { transform: translateY(-28vh) translateX(22px); }
  50%  { transform: translateY(-56vh) translateX(-16px); }
  75%  { transform: translateY(-84vh) translateX(14px); }
  100% { transform: translateY(-120vh) translateX(0); }
}

.prompt {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 2rem;
  pointer-events: none;
}

.prompt h1 {
  margin: 0 0 0.5rem;
  font-size: clamp(2rem, 6vw, 3.5rem);
  text-shadow: 0 2px 30px rgba(0, 0, 0, 0.6);
}

.prompt p {
  margin: 0;
  opacity: 0.9;
  line-height: 1.6;
}`,
  js: `const field = document.querySelector(".bubble-field");

function spawnBubble(x = Math.random() * window.innerWidth) {
  const b = document.createElement("span");
  b.className = "bubble";
  const size = 12 + Math.random() * 70;
  b.style.setProperty("--size", size + "px");
  b.style.setProperty("--left", (x + (Math.random() * 80 - 40)) + "px");
  b.style.setProperty("--dur", (8 + Math.random() * 10) + "s");
  b.style.setProperty("--delay", (-Math.random() * 16) + "s");
  field.appendChild(b);
  return b;
}

for (let i = 0; i < 40; i++) {
  spawnBubble();
}

field.addEventListener("pointerdown", (event) => {
  spawnBubble(event.clientX);
  console.log("New bubble!");
});

console.log("Bubbles are rising \u2014 click to spawn more.");`
}

function loadSavedCode(): { html: string; css: string; js: string } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultCode
    const parsed = JSON.parse(raw) as Partial<typeof defaultCode>
    return {
      html: typeof parsed.html === "string" ? parsed.html : defaultCode.html,
      css: typeof parsed.css === "string" ? parsed.css : defaultCode.css,
      js: typeof parsed.js === "string" ? parsed.js : defaultCode.js
    }
  } catch {
    return defaultCode
  }
}

const runcode = new RunCode({
  element: ".rc-container",
  theme: "dracula",
  clickToLoad: true,
  defaultTab: { editor: "html", preview: true },
  preview: { live: true, debounce: 400 },
  code: loadSavedCode()
})

const buttons = document.querySelectorAll<HTMLButtonElement>(".theme-btn")

function setActive(theme: string): void {
  buttons.forEach(btn => btn.classList.toggle("active", btn.dataset.theme === theme))
}

setActive("dracula")

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const theme = btn.dataset.theme!
    runcode.setTheme(theme)
    setActive(theme)
  })
})

const setupBtn = document.querySelector<HTMLButtonElement>(".setup-btn")
setupBtn?.addEventListener("click", () => {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // Ignore storage errors
  }
  runcode.setCode(defaultCode)
  runcode.setup()
})

function saveCode(): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(runcode.editor?.getCode()))
  } catch {
    // Storage may be unavailable (private mode, quota). Ignore.
  }
}

window.setInterval(saveCode, 1000)
window.addEventListener("pagehide", saveCode)