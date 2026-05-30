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