
function loadVales() {
  const vales = JSON.parse(localStorage.getItem("vales") || "[]");
  vales.forEach(addCard);
}

function saveVale(text) {
  const vales = JSON.parse(localStorage.getItem("vales") || "[]");
  vales.push(text);
  localStorage.setItem("vales", JSON.stringify(vales));
}

function addCard(text) {
  const gallery = document.getElementById("gallery");

  const card = document.createElement("div");
  card.className = "vale-card";

  const rareza = Math.floor(Math.random() * 100);
  if (rareza < 5) {
    card.classList.add("legendary");
  } else if (rareza < 20) {
    card.classList.add("epic");
  } else if (rareza < 50) {
    card.classList.add("rare");
  }

  card.textContent = `Vale por ${text}`;

  const btn = document.createElement("button");
  btn.textContent = "📥 Descargar";
  btn.onclick = () => downloadCardAsImage(card);
  card.appendChild(document.createElement("br"));
  card.appendChild(btn);

  gallery.appendChild(card);
}

function downloadCardAsImage(element) {
  html2canvas(element).then(canvas => {
    const link = document.createElement("a");
    link.download = "vale-por.png";
    link.href = canvas.toDataURL();
    link.click();
  });
}

document.getElementById("create-btn").addEventListener("click", () => {
  const input = document.getElementById("vale-input");
  const text = input.value.trim();
  if (!text) return;
  addCard(text);
  saveVale(text);
  input.value = "";
});

window.onload = loadVales;
