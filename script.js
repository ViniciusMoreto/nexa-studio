// DETECÇÃO DE MOBILE

const isMobile = window.innerWidth <= 768;
const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;

// LOADER

const loader = document.getElementById("loader");
const loaderNexa = document.querySelector(".loader-nexa");
const loaderStudio = document.querySelector(".loader-studio");
const loaderTagline = document.querySelector(".loader-tagline");
const loaderProgressFill = document.querySelector(".loader-progress-fill");
const loaderPercentage = document.querySelector(".loader-percentage");
const loaderFeatures = document.querySelectorAll(".loader-feature");

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
        duration: isMobile ? 0.3 : 0.6,
        ease: "back.out(1.7)"
    })
    .to(loaderStudio, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: isMobile ? 0.3 : 0.6,
        ease: "back.out(1.7)"
    }, "-=0.2")
    .to(loaderTagline, {
        opacity: 1,
        y: 0,
        duration: isMobile ? 0.2 : 0.5,
        ease: "power2.out"
    }, "-=0.1");

// Anima features (mais rápido em mobile)
loaderFeatures.forEach((feature, index) => {
    loaderTl.to(feature, {
        opacity: 1,
        x: 0,
        duration: isMobile ? 0.2 : 0.4,
        ease: "power2.out",
        onStart: () => {
            feature.classList.add("active");
            if (index > 0) {
                loaderFeatures[index - 1].classList.remove("active");
            }
        }
    }, `+=${isMobile ? 0.1 : 0.3}`);
});

// Anima barra de progresso
loaderTl.to(loaderProgressFill, {
    width: "100%",
    duration: isMobile ? 1 : 2,
    ease: "power2.inOut",
    onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        loaderPercentage.textContent = progress + "%";
    }
}, "-=1");

// TECH CURSOR (APENAS DESKTOP)

if (!isMobile && !isTouchDevice) {
    const techCursor = document.getElementById("techCursor");
    const cursorTrail = document.getElementById("cursorTrail");

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let trailDots = [];
    const MAX_TRAIL = 6;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        if (trailDots.length < MAX_TRAIL) {
            createTrailDot(mouseX, mouseY);
        }
    });

    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.25;
        cursorY += (mouseY - cursorY) * 0.25;

        techCursor.style.left = cursorX + "px";
        techCursor.style.top = cursorY + "px";

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

    function createTrailDot(x, y) {
        const dot = document.createElement("div");
        dot.className = "trail-dot";
        dot.style.left = x + "px";
        dot.style.top = y + "px";
        cursorTrail.appendChild(dot);

        trailDots.unshift({ el: dot, x, y });

        if (trailDots.length > MAX_TRAIL) {
            const old = trailDots.pop();
            old.el.remove();
        }
    }

    document.querySelectorAll("a, button").forEach((el) => {
        el.addEventListener("mouseenter", () => techCursor.classList.add("hover-link"));
        el.addEventListener("mouseleave", () => techCursor.classList.remove("hover-link"));
    });

    document.addEventListener("mousedown", () => techCursor.classList.add("clicking"));
    document.addEventListener("mouseup", () => techCursor.classList.remove("clicking"));

    document.addEventListener("mouseleave", () => techCursor.style.opacity = "0");
    document.addEventListener("mouseenter", () => techCursor.style.opacity = "1");
}

// NAVBAR

const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
});

// MENU MOBILE

const menuToggle = document.getElementById("menuToggle");
const navUl = document.getElementById("navUl");

menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    navUl.classList.toggle("active");
    document.body.classList.toggle("menu-open");
});

// Fecha o menu ao clicar fora dele (no overlay)
document.addEventListener("click", (e) => {
    if (
        navUl.classList.contains("active") &&
        !navUl.contains(e.target) &&
        !menuToggle.contains(e.target)
    ) {
        menuToggle.classList.remove("active");
        navUl.classList.remove("active");
        document.body.classList.remove("menu-open");
    }
});

// SCROLL SUAVE

document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href.length > 1) {
            e.preventDefault();
            const destino = document.querySelector(href);
            if (destino) {
                destino.scrollIntoView({ behavior: "smooth" });
                // Fecha o menu mobile se estiver aberto
                menuToggle.classList.remove("active");
                navUl.classList.remove("active");
                document.body.classList.remove("menu-open");
            }
        }
    });
});

// PARTÍCULAS (APENAS DESKTOP)

if (!isMobile) {
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
}

// GSAP + SCROLLTRIGGER

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
    }
);

function startAnimations() {
    const mm = gsap.matchMedia();

    // Animações apenas para desktop
    mm.add("(min-width: 992px)", () => {
        const tl = gsap.timeline();

        tl.to(".logo", {
            autoAlpha: 1,
            x: 100,
            duration: 1.5,
        })
            .fromTo(
                "nav li",
                { y: -30, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, stagger: 0.1, duration: 0.5 }
            )
            .fromTo(
                "nav .nav-cta",
                { scale: 0.8, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.7 },
                "-=.3"
            )
            .fromTo(
                ".hero h1",
                { x: -100, autoAlpha: 0 },
                { x: 0, autoAlpha: 1, duration: 1 }
            )
            .fromTo(
                ".hero p",
                { y: 40, autoAlpha: 0 },
                { y: 0, autoAlpha: 1, duration: 0.8 }
            )
            .fromTo(
                ".buttons",
                { scale: 0.8, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 0.7 },
                "-=.3"
            )
            .fromTo(
                ".hero-image",
                { x: 100, autoAlpha: 0 },
                { x: 0, autoAlpha: 1, duration: 1 },
                "-=.6"
            )
            .fromTo(
                ".glow",
                { scale: 0.4, autoAlpha: 0 },
                { scale: 1, autoAlpha: 1, duration: 1.3 },
                "-=.8"
            );

        // Animações de scroll (desktop)
        gsap.utils.toArray(".reveal").forEach((el) => {
            gsap.fromTo(
                el,
                { y: 40, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 85%",
                    },
                }
            );
        });

        // Parallax nos blurs (apenas desktop)
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

        // Flutuação do laptop
        gsap.to(".laptop-mockup", {
            y: -10,
            repeat: -1,
            yoyo: true,
            duration: 2,
            ease: "power1.inOut",
        });
    });

    // Animações simplificadas para mobile
    mm.add("(max-width: 991px)", () => {
        // Fade-in simples sem transforms complexos
        gsap.utils.toArray(".reveal").forEach((el) => {
            gsap.fromTo(
                el,
                { autoAlpha: 0 },
                {
                    autoAlpha: 1,
                    duration: 0.6,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: el,
                        start: "top 90%",
                    },
                }
            );
        });

        // Hero simplificado
        gsap.to(".logo", { autoAlpha: 1, duration: 0.5 });
        gsap.to("nav li", { autoAlpha: 1, stagger: 0.05, duration: 0.3 });
        gsap.to("nav .nav-cta", { autoAlpha: 1, duration: 0.4 });
        gsap.to(".hero h1", { autoAlpha: 1, duration: 0.6 });
        gsap.to(".hero p", { autoAlpha: 1, duration: 0.5 });
        gsap.to(".buttons", { autoAlpha: 1, duration: 0.5 });
        gsap.to(".hero-image", { autoAlpha: 1, duration: 0.6 });
        gsap.to(".glow", { autoAlpha: 1, duration: 0.5 });
    });
}

// SPLIT TEXT ANIMATION

const span = (text, index) => {
    const node = document.createElement("span");
    node.textContent = text;
    node.style.setProperty("--index", index);
    return node;
};

const byLetter = (text) => [...text].map(span);
const byWord = (text) => text.split(" ").map(span);

const { matches: motionOK } = window.matchMedia(
    "(prefers-reduced-motion: no-preference)"
);

if (motionOK) {
    const splitTargets = document.querySelectorAll("[split-by]");

    splitTargets.forEach((node) => {
        const type = node.getAttribute("split-by");
        let nodes = null;

        if (type === "letter") nodes = byLetter(node.innerText);
        else if (type === "word") nodes = byWord(node.innerText);

        if (nodes) {
            node.textContent = "";
            node.append(...nodes);
        }
    });
}

// WHATSAPP - ESCOLHER PLANO

const PLANOS = {
    Start: {
        nome: "Start (R$ 390)",
        resumo: "landing page profissional com HTML + CSS, responsiva e com SEO básico"
    },
    Pro: {
        nome: "Pro (R$ 690)",
        resumo: "landing page com JavaScript, formulário de contato e recursos interativos"
    },
    Premium: {
        nome: "Premium (R$ 1.290)",
        resumo: "landing page com animações profissionais (GSAP), microinterações e até 10 seções"
    },
    Luxury: {
        nome: "Luxury (R$ 1.990)",
        resumo: "experiência exclusiva com animações avançadas, efeitos premium e suporte prioritário"
    }
};

const NUMERO_WHATSAPP = "5519997519981";

function montarMensagemPlano(nomePlano) {
    const plano = PLANOS[nomePlano];
    if (!plano) return "Olá! Vim do site da NEXA Studio e gostaria de tirar algumas dúvidas.";

    const mensagem = `Olá! 👋

Vim do site da *NEXA Studio* e tenho interesse no *Plano ${plano.nome}*.

Vi que ele inclui ${plano.resumo} e gostaria de saber mais sobre como funciona.

Podem me ajudar? 🚀`;

    return mensagem;
}

document.querySelectorAll(".choose-plan").forEach((btn) => {
    btn.addEventListener("click", function (e) {
        e.preventDefault();

        const nomePlano = this.getAttribute("data-plan");
        const mensagem = montarMensagemPlano(nomePlano);
        const mensagemCodificada = encodeURIComponent(mensagem);
        const link = `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;

        window.open(link, "_blank");
    });
});
