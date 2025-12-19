const grandparent = document.getElementById("grandparent");
const parent = document.getElementById("parent");
const child = document.getElementById("child");

grandparent.addEventListener("click", () => {
  console.log("Grandparent clicked");
});

parent.addEventListener("click", () => {
  console.log("Parent clicked");
});

child.addEventListener("click", () => {
  console.log("Child clicked");
});

// Every event listener secretly receives an object.
// child.addEventListener("click", (event) => {
//   console.log(event.target); // actual clicked element
//   console.log(event.currentTarget); // element handling the event
// });

//stopping the bubble
// child.addEventListener("click", (event) => {
//   event.stopPropagation();
//   console.log("Child clicked ONLY");
// });

// Click child → only child fires.

// Real use cases:

// Modal close button shouldn’t close overlay twice

// Dropdown item shouldn’t trigger page click

// Stop accidental navigation

//Capturing Phase
// grandparent.addEventListener(
//   "click",
//   () => {
//     console.log("Grandparent CAPTURE");
//   },
//   true
// );

//Now click child.

// You’ll see:

// Grandparent CAPTURE
// Child clicked
// Parent clicked
// Grandparent clicked

// Key idea:

// true = listen during capturing

// default = bubbling

// Most apps use bubbling. Capturing is for edge control.
