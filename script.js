let cards = [];
let index = 0;
let showAnswer = false;

fetch("flashcards.csv")
    .then(response => response.text())
    .then(data => {
        const rows = data.split("\n").slice(1);
        rows.forEach(row => {
            const [question, answer] = row.split(",");
            cards.push({ question, answer });
        });
        showCard();
    });

function showCard() {
    showAnswer = false;
    document.getElementById("cardText").innerText = cards[index].question;
}

function flipCard() {
    document.getElementById("cardText").innerText =
        showAnswer ? cards[index].question : cards[index].answer;
    showAnswer = !showAnswer;
}

function nextCard() {
    index = (index + 1) % cards.length;
    showCard();
}
