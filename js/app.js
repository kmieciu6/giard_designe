// Searcher
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById('searchInput');
    const searchSuggestions = document.getElementById('searchSuggestions');
    const textNodes = getTextNodes(document.body);
    let highlightedElements = [];

    searchInput.addEventListener('input', function () {
    const searchText = searchInput.value.toLowerCase();
    const matchingWords = findMatchingWords(searchText);
    showSuggestions(matchingWords);
    });

    document.addEventListener('click', function (event) {
    if (!event.target.classList.contains('suggestion') && !event.target.matches('.highlighted')) {
        removeHighlight();
        searchSuggestions.innerHTML = '';
    }
    });

    function findMatchingWords(text) {
    const matchingWords = new Set();

    textNodes.forEach(node => {
        const textContent = node.textContent.toLowerCase();
        if (textContent.includes(text)) {
        const words = textContent.split(' ');
        words.forEach(word => {
            if (word.includes(text) && word.length > 3) { // Dodaj warunek na długość słowa
            matchingWords.add(word);
            }
        });
        }
    });

    return Array.from(matchingWords);
    }

    function showSuggestions(words) {
    searchSuggestions.innerHTML = '';

    words.forEach(word => {
        const suggestion = document.createElement('div');
        suggestion.classList.add('suggestion');
        suggestion.textContent = word;

        suggestion.addEventListener('click', function () {
        removeHighlight();
        highlightTextNodes(word);
        scrollToHighlightedWord(word);
        searchInput.value = '';
        searchSuggestions.innerHTML = '';
        });

        searchSuggestions.appendChild(suggestion);
    });
    }

    function highlightTextNodes(text) {
    highlightedElements = [];

    textNodes.forEach(node => {
        const textContent = node.textContent;
        const lowerCaseText = textContent.toLowerCase();

        if (lowerCaseText.includes(text)) {
        const tempContainer = document.createElement('div');
        const newNode = document.createElement('mark');
        newNode.classList.add('highlighted');
        newNode.textContent = text;

        tempContainer.innerHTML = textContent.replace(new RegExp(`(${text})`, 'gi'), '<mark class="highlighted">$1</mark>');
        const newNodes = Array.from(tempContainer.childNodes);

        newNodes.forEach(newNode => {
            highlightedElements.push(newNode);
            node.parentNode.insertBefore(newNode, node);
        });

        node.parentNode.removeChild(node);
        }
    });
    }

    function scrollToHighlightedWord(word) {
    highlightedElements.forEach(element => {
        if (element.textContent.toLowerCase() === word) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
    }

    function removeHighlight() {
    highlightedElements.forEach(element => {
        const newNode = document.createTextNode(element.textContent);
        element.parentNode.insertBefore(newNode, element);
        element.parentNode.removeChild(element);
    });
    highlightedElements = [];
    }

    function getTextNodes(node) {
    const textNodes = [];
    if (node.nodeType === Node.TEXT_NODE) {
        textNodes.push(node);
    } else {
        node.childNodes.forEach(child => {
        textNodes.push(...getTextNodes(child));
        });
    }
    return textNodes;
    }
});


// Carousel
const carousel = document.querySelector(".carousel");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".prevBtn");
const nextBtn = document.querySelector(".nextBtn");

let currentIndex = 0;
let slideWidth = slides[0].clientWidth;
let intervalId = null;

function goToSlide(index) {
currentIndex = (index + slides.length) % slides.length;
slideWidth = slides[currentIndex].clientWidth;
carousel.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function changeSlide(direction) {
stopAutoSlide();
if (direction === "next") {
    goToSlide(currentIndex + 1);
} else if (direction === "prev") {
    goToSlide(currentIndex - 1);
}
startAutoSlide();
}

function startAutoSlide() {
intervalId = setInterval(() => changeSlide("next"), 5000);
}

function stopAutoSlide() {
clearInterval(intervalId);
}

nextBtn.addEventListener("click", () => changeSlide("next"));
prevBtn.addEventListener("click", () => changeSlide("prev"));

window.addEventListener("resize", () => {
slideWidth = slides[currentIndex].clientWidth;
goToSlide(currentIndex);
});

startAutoSlide();


// Buttons
const scrollButtons = document.querySelectorAll('.scroll-button');
scrollButtons.forEach(button => {
  button.addEventListener('click', function() {
    const target = this.getAttribute('data-target');
    const targetUrl = this.getAttribute('data-url');
    const targetSection = document.getElementById(target);

    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    } else if (targetUrl) {
      window.location.href = targetUrl;
    }
  });
});


// Scroll to top
const scrollToTopButton = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


// Masonry
document.addEventListener("DOMContentLoaded", function() {
    const grid = document.querySelector(".grid");

    const masonry = new Masonry(grid, {
        itemSelector: ".grid-item",
        columnWidth: ".grid-sizer",
        gutter: 10,
    });
});


// FancyBox
document.addEventListener("DOMContentLoaded", function () {
    const galleryItems = document.querySelectorAll('[data-fancybox="gallery"]');

    galleryItems.forEach((item) => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            const options = {
                loop: true, // Pozwala na przewijanie galerii w pętli
                buttons: ["close", "arrowLeft", "arrowRight"], // Pokazuje przyciski nawigacyjne
                caption: function (instance, item) {
                    return item.opts.caption;
                }
                // Dodaj inne opcje konfiguracyjne FancyBox tutaj
            };

            // Otwarcie obrazka w FancyBox
            Fancybox.show([{
                src: item.getAttribute("href"),
                opts: options
            }]);
        });
    });
});


// Rozwiń/zwiń
document.addEventListener("DOMContentLoaded", function () {
    const rozwinButton = document.getElementById("rozwin-btn");
    const gradientOverlay = document.querySelector(".gradient-overlay");
    const arrowImg = document.querySelector(".arrow-img");
    const buttonText = document.querySelector(".button-text");

    rozwinButton.addEventListener("click", function () {
        gradientOverlay.style.opacity = gradientOverlay.style.opacity === "0" ? "1" : "0";
        arrowImg.style.transform = arrowImg.style.transform === "rotate(180deg)" ? "rotate(0deg)" : "rotate(180deg)";
        buttonText.textContent = buttonText.textContent === "Rozwiń" ? "Zwiń" : "Rozwiń";
    });
});

