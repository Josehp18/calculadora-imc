const quotes = [
  "La vida es lo que pasa mientras estás ocupado haciendo otros planes. – John Lennon",
  "El único modo de hacer un gran trabajo es amar lo que haces. – Steve Jobs",
  "No cuentes los días, haz que los días cuenten. – Muhammad Ali",
  "El éxito es la suma de pequeños esfuerzos repetidos cada día. – Robert Collier",
  "Cree que puedes y ya estás a mitad de camino. – Theodore Roosevelt"
];

function generateQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quoteElement = document.getElementById("quote");
  quoteElement.textContent = quotes[randomIndex];
}
