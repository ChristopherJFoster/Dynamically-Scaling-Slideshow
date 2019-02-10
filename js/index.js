// Selects all images from HTML:
const slideImgs = Array.from(document.querySelectorAll("img"));
// Sets all images to invisible:
slideImgs.forEach(image => {
  TweenMax.set(image, { autoAlpha: 0 });
});
// Sets first image in slideImgs array to be the visible image...
let slideIn = slideImgs[0];
// ...and then makes that image visible:
TweenMax.set(slideIn, { autoAlpha: 1 });
// Keeps track of the index of the active slide:
let slideImgsIndex = 0;
// Keeps track of whether the next slide animation will move left (0) or up (1):
let slideDir = 0;

const goToNextSlide = () => {
  // This GSAP timeline allows for multple animations to happen in sync with one another. In this case the new image slides in and the old image slides out in one fluid motion.
  const tl = new TimelineLite();
  // The visible image is marked as the outgoing image:
  let slideOut = slideIn;
  // Determines the next incoming image:
  if (slideImgsIndex === slideImgs.length - 1) {
    slideIn = slideImgs[0];
    slideImgsIndex = 0;
  } else {
    slideIn = slideImgs[`${slideImgsIndex + 1}`];
    slideImgsIndex += 1;
  }

  // Leftward slide animation:
  if (slideDir === 0) {
    tl
      // Instantly moves the incoming image rightward out of frame and makes it visible (so that it will be visible as it slides into frame):
      .set(slideIn, { x: "100%", autoAlpha: 1 })
      // Animates outgoing image leftward out of frame:
      .to(slideOut, 0.75, { x: "-100%", ease: Power2.easeInOut }, 0)
      // Animates incoming image leftward into frame:
      .to(slideIn, 0.75, { x: "0%", ease: Power2.easeInOut }, 0)
      // Resets the position and (in)visibility of the image that just exited the frame:
      .set(slideOut, { x: "0%", autoAlpha: 0 });
    // Sets variable for alternating slide animation direction:
    slideDir = 1;

    // Upward slide animation:
  } else {
    tl.set(slideIn, { y: "100%", autoAlpha: 1 })
      .to(slideOut, 0.75, { y: "-100%", ease: Power2.easeInOut }, 0)
      .to(slideIn, 0.75, { y: "0%", ease: Power2.easeInOut }, 0)
      .set(slideOut, { y: "0%", autoAlpha: 0 });
    slideDir = 0;
  }
};

// Start continuous slideshow:
setInterval(goToNextSlide, 2500);
