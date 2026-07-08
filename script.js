// =========================
// LOADER
// =========================
const loader = document.getElementById("loader");
const loaderNexa = document.querySelector(".loader-nexa");
const loaderStudio = document.querySelector(".loader-studio");
const loaderTagline = document.querySelector(".loader-tagline");
const loaderProgressFill = document.querySelector(".loader-progress-fill");
const loaderPercentage = document.querySelector(".loader-percentage");
const loaderFeatures = document.querySelectorAll(".loader-feature");

// Adiciona classe de loading no body
document.body.classList.add("loading");

// Timeline principal do loader
const loaderTl = gsap.timeline({
    onComplete: () => {
        loader.classList.add("hide");
        document.body.classList.remove("loading");
        setTimeout(() => {
            startAnimations();
        }, 300);
    }
});

// Anima logo NEXA
loaderTl
    .to(loaderNexa, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    })
    // Anima STUDIO
    .to(loaderStudio, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)"
    }, "-=0.3")
    // Anima tagline
    .to(loaderTagline, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: "power2.out"
    }, "-=0.2");

// Anima features aparecendo uma a uma
loaderFeatures.forEach((feature, index) => {
    loaderTl.to(feature, {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        onStart: () => {
            feature.classList.add("active");
            if (index > 0) {
                loaderFeatures[index - 1].classList.remove("active");
            }
        }
    }, `+=0.3`);
});

// Anima barra de progresso com porcentagem
loaderTl.to(loaderProgressFill, {
    width: "100%",
    duration: 2,
    ease: "power2.inOut",
    onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        loaderPercentage.textContent = progress + "%";
    }
}, "-=1.5");

// =========================
// TECH CURSOR (minimalista)
// =========================
const techCursor = document.getElementById("techCursor");
const cursorTrail = document.getElementById("cursorTrail");

let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let trailDots = [];
const MAX_TRAIL = 6;

// Captura posição do mouse
document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Cria pontinho do trail a cada movimento
    if (trailDots.length < MAX_TRAIL) {
        createTrailDot(mouseX, mouseY);
    }
});

// Animação suave (lerp)
function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.25;
    cursorY += (mouseY - cursorY) * 0.25;

    techCursor.style.left = cursorX + "px";
    techCursor.style.top = cursorY + "px";

    // Atualiza trail
    trailDots.forEach((dot, i) => {
        const target = i === 0 ? { x: mouseX, y: mouseY } : trailDots[i - 1];
        dot.x += (target.x - dot.x) * 0.3;
        dot.y += (target.y - dot.y) * 0.3;
        dot.el.style.left = dot.x + "px";
        dot.el.style.top = dot.y + "px";
        dot.el.style.opacity = 1 - (i / MAX_TRAIL) * 0.7;
        dot.el.style.transform = `scale(${1 - i * 0.1})`;
    });

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Cria pontinho do trail
function createTrailDot(x, y) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    dot.style.left = x + "px";
    dot.style.top = y + "px";
    cursorTrail.appendChild(dot);

    trailDots.unshift({ el: dot, x, y });

    // Remove excesso
    if (trailDots.length > MAX_TRAIL) {
        const old = trailDots.pop();
        old.el.remove();
    }
}

// Estados de hover
document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => techCursor.classList.add("hover-link"));
    el.addEventListener("mouseleave", () => techCursor.classList.remove("hover-link"));
});

// Click
document.addEventListener("mousedown", () => techCursor.classList.add("clicking"));
document.addEventListener("mouseup", () => techCursor.classList.remove("clicking"));

// Esconde ao sair da janela
document.addEventListener("mouseleave", () => techCursor.style.opacity = "0");
document.addEventListener("mouseenter", () => techCursor.style.opacity = "1");

// =========================
// NAVBAR
// =========================
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// =========================
// MENU MOBILE
// =========================
const menuToggle = document.getElementById("menuToggle");
const navUl = document.getElementById("navUl");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navUl.classList.toggle("active");
});

// =========================
// SCROLL SUAVE
// =========================
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href.length > 1) {
            e.preventDefault();
            const destino = document.querySelector(href);
            if (destino) {
                destino.scrollIntoView({ behavior: "smooth" });
                menuToggle.classList.remove("active");
                navUl.classList.remove("active");
            }
        }
    });
});

// =========================
// PARTÍCULAS
// =========================
const particles = document.getElementById("particles");
for (let i = 0; i < 35; i++) {
    const particle = document.createElement("span");
    particle.classList.add("particle");
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDuration = 5 + Math.random() * 10 + "s";
    particle.style.animationDelay = Math.random() * 5 + "s";
    const size = 3 + Math.random() * 5 + "px";
    particle.style.width = size;
    particle.style.height = size;
    particles.appendChild(particle);
}

// =========================
// GSAP + SCROLLTRIGGER
// =========================
gsap.registerPlugin(ScrollTrigger);

gsap.set(
    [
        ".logo",
        "nav li",
        ".hero h1",
        ".hero p",
        ".buttons",
        ".hero-image",
        ".glow",
        "nav nav-cta",
    ],
    {
        autoAlpha: 0,
    },
);

const mm = gsap.matchMedia();
function startAnimations() {
    const mm = gsap.matchMedia();

    mm.add("(min-width:992px)", () => {
        const tl = gsap.timeline();

        tl.to(".logo", {
            autoAlpha: 1,
            x: 100,
            duration: 1.5,
        })

            .fromTo(
                "nav li",
                {
                    y: -30,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: 0.1,
                    duration: 0.5,
                },
            )

            .fromTo(
                "nav .nav-cta",
                {
                    scale: 0.8,
                    autoAlpha: 0,
                },
                {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.7,
                },
                "-=.3",
            )

            .fromTo(
                ".hero h1",
                {
                    x: -100,
                    autoAlpha: 0,
                },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 1,
                },
            )

            .fromTo(
                ".hero p",
                {
                    y: 40,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                },
            )

            .fromTo(
                ".buttons",
                {
                    scale: 0.8,
                    autoAlpha: 0,
                },
                {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 0.7,
                },
                "-=.3",
            )

            .fromTo(
                ".hero-image",
                {
                    x: 100,
                    autoAlpha: 0,
                },
                {
                    x: 0,
                    autoAlpha: 1,
                    duration: 1,
                },
                "-=.6",
            )

            .fromTo(
                ".glow",
                {
                    scale: 0.4,
                    autoAlpha: 0,
                },
                {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 1.3,
                },
                "-=.8",
            );

        gsap.utils.toArray(".reveal").forEach((el) => {
            gsap.fromTo(
                el,
                {
                    y: 40,
                    autoAlpha: 0,
                },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                },
            );
        });

        gsap.to(".blur1", {
            y: -100,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        gsap.to(".blur2", {
            y: 100,
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
            },
        });

        gsap.to(".laptop-mockup", {
            y: -10,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "power1.inOut",
        });
    });
}
