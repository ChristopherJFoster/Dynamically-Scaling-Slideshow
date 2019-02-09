const slideImgs = Array.from(document.querySelectorAll("img"));
// Sets all slide images to invisible:
slideImgs.forEach(image => {
  TweenMax.set(image, { autoAlpha: 0 });
});
// Sets first image in slideImgs array to be the visible image...
let slideIn = slideImgs[0];
// ...and then makes that image visible:
TweenMax.set(slideIn, { autoAlpha: 1 });
// Keeps track of the index of the active slide:
let slideImgsIndex = 0;

const goToNextSlide = () => {
  var tl = new TimelineLite();
  let slideOut = slideIn;
  // Determines slide direction:
  let slideDir = slideImgsIndex % 2;

  // Determines next slide:
  if (slideImgsIndex === slideImgs.length - 1) {
    slideIn = slideImgs[0];
    slideImgsIndex = 0;
  } else {
    slideIn = slideImgs[`${slideImgsIndex + 1}`];
    slideImgsIndex += 1;
  }

  // Reveals next slide:

  // Keeps track of whether the index is even or odd in order to change the animation direction:

  if (slideDir === 0) {
    console.log("even");
    console.log(slideIn);
    tl
      // move the new slide (the one about to enter viewport) out of the viewport and add class active
      .set(slideIn, { x: "100%", autoAlpha: 1 })
      // animate active slide up (out of the viewport)
      .to(slideOut, 0.7, { x: "-100%", ease: Power3.easeInOut }, 0)
      // animate new slide up (from out of the viewport)
      .to(slideIn, 0.7, { x: "0%", ease: Power3.easeInOut }, 0)
      // resets slideOut
      .set(slideOut, { x: "0%", autoAlpha: 0 });
  } else {
    console.log("odd");
    console.log(slideIn);
    tl.set(slideIn, { y: "100%", autoAlpha: 1 })
      // animate active slide up (out of the viewport)
      .to(slideOut, 0.7, { y: "-100%", ease: Power3.easeInOut }, 0)
      // animate new slide up (from out of the viewport)
      .to(slideIn, 0.7, { y: "0%", ease: Power3.easeInOut }, 0)
      // resets slideOut
      .set(slideOut, { y: "0%", autoAlpha: 0 });
  }
};

// Start continuous slideshow:
setInterval(goToNextSlide, 2500);
