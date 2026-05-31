// =========================
// ESTO ES EL FUTURO
// =========================

const mouseGlow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove", (e) => {
  if(!mouseGlow) return;

  mouseGlow.style.left = e.clientX + "px";
  mouseGlow.style.top = e.clientY + "px";
});

// Animación de aparición

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }
  });
},{
  threshold:0.15
});

document
  .querySelectorAll(".bar-image, .universe-card, .hero-tag, .hero h1, .hero p")
  .forEach(el => observer.observe(el));

// Parallax suave de imagen

const barImage = document.querySelector(".bar-image");

document.addEventListener("mousemove", (e) => {
  if(!barImage) return;

  const x = (window.innerWidth / 2 - e.clientX) / 90;
  const y = (window.innerHeight / 2 - e.clientY) / 90;

  barImage.style.transform = `translate(${x}px, ${y}px) scale(1.01)`;
});

// =========================
// PORTAL NARANJA + AZUL
// =========================

document.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", function(e){
    const url = this.getAttribute("href");

    if(!url || url.startsWith("#") || url.startsWith("http")){
      return;
    }

    e.preventDefault();

    const portal = document.createElement("div");
    portal.className = "future-portal";

    portal.innerHTML = `
      <div class="future-portal-core"></div>
      <h2>VIAJANDO</h2>
    `;

    document.body.appendChild(portal);

    setTimeout(() => {
      window.location.href = url;
    }, 1000);
  });
});

const title = document.querySelector(".hero h1");

document.addEventListener("mousemove",(e)=>{

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (e.clientX - centerX) * 0.02;
    const moveY = (e.clientY - centerY) * 0.02;

    title.style.transform =
    `
    perspective(1200px)
    rotateY(${moveX}deg)
    rotateX(${-moveY}deg)
    translateZ(40px)
    `;
});
// =========================
// GTA LANDING SEQUENCE
// =========================

const stages = document.querySelectorAll(".travel-stage");

if(stages.length){
  setTimeout(() => {
    stages[0]?.classList.remove("active");
    stages[1]?.classList.add("active");
  }, 2200);

  setTimeout(() => {
    stages[1]?.classList.remove("active");
    stages[2]?.classList.add("active");
  }, 4700);
}
// =========================
// FUTURE ASSISTANT CART
// =========================

let futureCart = JSON.parse(localStorage.getItem("futureCart")) || [];

function saveFutureCart(){
  localStorage.setItem("futureCart", JSON.stringify(futureCart));
}

function formatFutureMoney(value){
  return "$" + value.toLocaleString("es-AR");
}

function renderFutureCart(){
  const itemsBox = document.getElementById("assistantItems");
  const totalBox = document.getElementById("assistantTotal");

  if(!itemsBox || !totalBox) return;

  itemsBox.innerHTML = "";

  if(futureCart.length === 0){
    itemsBox.innerHTML = `<p class="empty-cart">Tocá productos para sumarlos.</p>`;
  }

  let total = 0;

  futureCart.forEach((item, index) => {
    total += item.price * item.qty;

    const div = document.createElement("div");
    div.className = "future-cart-item";

    div.innerHTML = `
      <div>
        <h4>${item.name}</h4>
        <small>${item.qty} x ${formatFutureMoney(item.price)}</small>
      </div>

      <div class="future-cart-controls">
        <button onclick="updateFutureCartQty(${index}, -1)">-</button>
        <span>${item.qty}</span>
        <button onclick="updateFutureCartQty(${index}, 1)">+</button>
        <button class="delete" onclick="deleteFutureCartItem(${index})">×</button>
      </div>
    `;

    itemsBox.appendChild(div);
  });

  totalBox.textContent = formatFutureMoney(total);
}

function addToFutureCart(name, price){
  const existing = futureCart.find(item => item.name === name);

  if(existing){
    existing.qty++;
  }else{
    futureCart.push({ name, price, qty:1 });
  }

  saveFutureCart();
  renderFutureCart();

  document.getElementById("assistantPanel")?.classList.add("active");
}

function updateFutureCartQty(index, amount){
  futureCart[index].qty += amount;

  if(futureCart[index].qty <= 0){
    futureCart.splice(index,1);
  }

  saveFutureCart();
  renderFutureCart();
}

function deleteFutureCartItem(index){
  futureCart.splice(index,1);
  saveFutureCart();
  renderFutureCart();
}

function resetFutureCart(){
  futureCart = [];
  saveFutureCart();
  renderFutureCart();
}

function buildFutureOrder(){
  if(futureCart.length === 0){
    alert("Todavía no agregaste productos.");
    return;
  }

  let total = 0;

  let message = "Hola Club Serrano 👋%0A%0A";
  message += "Quiero consultar por esta selección:%0A%0A";

  futureCart.forEach(item => {
    const subtotal = item.price * item.qty;
    total += subtotal;

    message += `• ${item.qty} x ${item.name} - ${formatFutureMoney(subtotal)}%0A`;
  });

  message += "%0A";
  message += `Total estimado: ${formatFutureMoney(total)}%0A%0A`;
  message += "¿Me ayudan a confirmar disponibilidad o reservar?";

  window.open(
    `https://wa.me/5491130921900?text=${message}`,
    "_blank"
  );
}

document.addEventListener("click", (e) => {
  const item = e.target.closest(".menu-item");

  if(!item) return;

  const name = item.querySelector("span")?.textContent.trim();
  const priceText = item.querySelector("strong")?.textContent || "0";
  const price = Number(priceText.replace(/\D/g, ""));

  if(!name || !price) return;

  addToFutureCart(name, price);

  item.classList.add("added");

  setTimeout(() => {
    item.classList.remove("added");
  }, 500);
});

window.addEventListener("load", () => {
  const toggle = document.getElementById("assistantToggle");
  const panel = document.getElementById("assistantPanel");
  const close = document.getElementById("assistantClose");
  const reset = document.getElementById("assistantReset");
  const order = document.getElementById("assistantOrder");

  toggle?.addEventListener("click", () => {
    panel?.classList.toggle("active");
  });

  close?.addEventListener("click", () => {
    panel?.classList.remove("active");
  });

  reset?.addEventListener("click", resetFutureCart);
  order?.addEventListener("click", buildFutureOrder);

  renderFutureCart();
});
// =========================
// PROMO COUNTDOWN
// =========================

function updatePromoCountdown(){
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");

  if(!h || !m || !s) return;

  const now = new Date();
  const end = new Date();

  end.setHours(23, 59, 59, 999);

  const diff = end - now;

  if(diff <= 0){
    h.textContent = "00";
    m.textContent = "00";
    s.textContent = "00";
    return;
  }

  const hours = Math.floor(diff / 1000 / 60 / 60);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  h.textContent = String(hours).padStart(2,"0");
  m.textContent = String(minutes).padStart(2,"0");
  s.textContent = String(seconds).padStart(2,"0");
}

setInterval(updatePromoCountdown,1000);
updatePromoCountdown();