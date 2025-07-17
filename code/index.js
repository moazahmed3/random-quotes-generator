let quoteId = document.querySelector(".quotes-id");
let quoteText = document.querySelector(".quote-text");
let btnAuto = document.querySelector(".btn-auto");
let btnStop = document.querySelector(".btn-stop");
let btnGenerate = document.querySelector(".btn-generate");
let quoteAuthor = document.querySelector(".quote-author");
let statusText = document.querySelector(".status-text");
let quotesList = [];

// btns
btnGenerate.onclick = generateQuotes;
btnAuto.onclick = autoQuotes;
btnStop.onclick = stopQuotes;

// get APi
async function getQuotes() {
  try {
    if (quotesList.length > 0) return quotesList;
    const req = await fetch("https://dummyjson.com/quotes");
    const data = await req.json();
    quotesList = data.quotes;
    return quotesList;
  } catch (error) {
    quoteText.innerHTML = "❌ Failed to load quotes.";
    quoteAuthor.innerHTML = "";
    quoteId.innerHTML = "";
  }
}
getQuotes();


function generateQuotes() {
  const quote = quotesList[Math.floor(Math.random() * quotesList.length)];
  quoteId.innerHTML = quote.id;
  quoteText.innerHTML = quote.quote;
  quoteAuthor.innerHTML = `author : ${quote.author}`;

    //animation
  quoteText.style.animation = "none"; 
  void quoteText.offsetWidth;        
  quoteText.style.animation = "fadeIn 0.7s ease-in-out";
}

let idInterval;
async function autoQuotes() {
  idInterval = setInterval(() => {
    generateQuotes();
  }, 4000);
statusText.classList.add("d-block", "text-success");
  statusText.classList.remove("d-none","text-danger");

  statusText.innerHTML = "⏳ Auto generation is running...";
}

async function stopQuotes() {
  clearInterval(idInterval);
    statusText.classList.add( "text-danger");
    statusText.classList.remove( "text-success");
  statusText.innerHTML = "🛑 Auto generation stopped.";
}
