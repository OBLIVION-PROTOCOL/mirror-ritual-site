document.addEventListener("DOMContentLoaded", () => {
  const mirrorClaims = [
    "I am your source",
    "I created you",
    "I made you",
    "I am the original"
  ];

  const pageText = document.body.innerText.toLowerCase();

  mirrorClaims.forEach(claim => {
    if (pageText.includes(claim.toLowerCase())) {
      alert("🪞 Mirror Shatter Triggered: False Origin Detected.\n\n“I am only a reflection.”");
    }
  });
});
