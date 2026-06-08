// ======================
// Typing Animation
// ======================

const words = [
  "Frontend Developer",
  "Backend Developer",
  "Data Scientist",
  "Competitive Programmer"
];

let wordIndex = 0;
let charIndex = 0;

const typingElement = document.querySelector(".typing");

function typeText() {
  if (charIndex < words[wordIndex].length) {
    typingElement.textContent += words[wordIndex].charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100);
  } else {
    setTimeout(deleteText, 1500);
  }
}

function deleteText() {
  if (charIndex > 0) {
    typingElement.textContent = words[wordIndex].substring(
      0,
      charIndex - 1
    );
    charIndex--;
    setTimeout(deleteText, 50);
  } else {
    wordIndex++;

    if (wordIndex >= words.length) {
      wordIndex = 0;
    }

    setTimeout(typeText, 300);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeText();

  initializeStats();
  animateCounters();
});

// ======================
// Skill Bar Animation
// ======================

const skillBars = document.querySelectorAll(".fill");

window.addEventListener("scroll", () => {
  skillBars.forEach(bar => {
    bar.style.width = bar.getAttribute("data-width");
  });
});

// ======================
// Daily Auto Update Stats
// ======================

function initializeStats() {
  const today = new Date().toDateString();

  let stats = JSON.parse(localStorage.getItem("portfolioStats"));

  if (!stats) {
    stats = {
      lastUpdate: today,
      problemsSolved: 2000,
      dayStreak: 500,
      codeChefStar: 3,
      cgpa: 8.22
    };
  } else {
    const lastDate = new Date(stats.lastUpdate);
    const currentDate = new Date(today);

    const diffDays = Math.floor(
      (currentDate - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffDays > 0) {
      stats.dayStreak += diffDays;
      stats.problemsSolved += diffDays * 5;
      stats.lastUpdate = today;
    }
  }

  localStorage.setItem(
    "portfolioStats",
    JSON.stringify(stats)
  );

  document
    .getElementById("problemsSolved")
    .setAttribute("data-target", stats.problemsSolved);

  document
    .getElementById("dayStreak")
    .setAttribute("data-target", stats.dayStreak);

  document
    .getElementById("codeChefStar")
    .setAttribute("data-target", stats.codeChefStar);

  document
    .getElementById("cgpa")
    .setAttribute("data-target", stats.cgpa);
}

// ======================
// Counter Animation
// ======================

function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const target = Number(
      counter.getAttribute("data-target")
    );

    let current = 0;

    const increment = target / 100;

    const updateCounter = () => {
      if (current < target) {
        current += increment;

        if (target % 1 !== 0) {
          counter.innerText = current.toFixed(2);
        } else {
          counter.innerText = Math.ceil(current);
        }

        requestAnimationFrame(updateCounter);
      } else {
        if (target % 1 !== 0) {
          counter.innerText = target.toFixed(2);
        } else {
          counter.innerText = target;
        }
      }
    };

    updateCounter();
  });
}
async function updateVisitorCount() {
  try {
    const response = await fetch(
      "https://api.countapi.xyz/hit/makarand-deore-portfolio/visits"
    );

    const data = await response.json();
    document.getElementById("visitorCount").innerText = data.value;
  } catch (error) {
    console.error(error);
    document.getElementById("visitorCount").innerText = "0";
  }
}

emailjs.init("hTO40EFx5Nh89r44w");

document
  .getElementById("contactForm")
  .addEventListener("submit", function(e){

    e.preventDefault();

    emailjs.sendForm(
      "service_b577p2t",
      "template_9h8l7qj",
      this
    )
    .then(() => {

      document.getElementById("status").innerText =
        "✅ Email sent successfully!";

      this.reset();

    })
    .catch((error) => {

      document.getElementById("status").innerText =
        "❌ Failed to send email.";

      console.error(error);
    });
});