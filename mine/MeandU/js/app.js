// Get the DOM elements for the image carousel
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const images = document.querySelectorAll("img");
const buttons = document.querySelectorAll(".button");

let imageIndex = 0;
let intervalId;

// Define function to start automatic image slider
const autoSlide = () => {
  intervalId = setInterval(() => {
    imageIndex = (imageIndex + 1) % images.length;
    slideImage(imageIndex);
  }, 1500);
};

// Call autoSlide function on page load
autoSlide();

// A function that updates the carousel display to show the specified image
const slideImage = (index) => {
  // Check if the index is out of bounds
  if (index >= images.length || index < 0) {
    imageIndex = 0;
  } else {
    imageIndex = index;
  }
  carousel.style.transform = `translateX(-${imageIndex * 100}%)`;
};

// A function that updates the carousel display to show the next or previous image
const updateClick = (e) => {
  clearInterval(intervalId);
  imageIndex =
    e.target.id === "next"
      ? (imageIndex + 1) % images.length
      : (imageIndex - 1 + images.length) % images.length;
  slideImage(imageIndex);
  autoSlide();
};

// Add event listeners to the navigation buttons
buttons.forEach((button) => button.addEventListener("click", updateClick));

// Add mouseover event listener to wrapper element to stop auto sliding
wrapper.addEventListener("mouseover", () => clearInterval(intervalId));
// Add mouseleave event listener to wrapper element to start auto sliding again
wrapper.addEventListener("mouseleave", autoSlide);
