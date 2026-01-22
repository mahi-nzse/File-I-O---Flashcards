let flashcards = [];
let index = 0;
let showingAnswer = false;

fetch("flashcards.csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").slice(1); // skip header
        rows.forEach(row => {
            const parts = row.split(",");
            if (parts.length >= 2) {
                const question = parts[0].trim();
                const answer = parts.slice(1).join(",").trim(); // handles commas in answers
                flashcards.push({ question, answer });
            }
        });
        showCard();
    });

function showCard() {
    showingAnswer = false;
    document.getElementById("cardText").innerText = flashcards[index].question;
    updateCounter();
}

function flipCard() {
    document.getElementById("cardText").innerText =
        showingAnswer ? flashcards[index].question : flashcards[index].answer;
    showingAnswer = !showingAnswer;
}

function nextCard() {
    index = (index + 1) % flashcards.length;
    showCard();
}

function prevCard() {
    index = (index - 1 + flashcards.length) % flashcards.length;
    showCard();
}

function updateCounter() {
    document.getElementById("counter").innerText =
        `Card ${index + 1} of ${flashcards.length}`;
}
