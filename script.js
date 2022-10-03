const startGameEl = document.getElementById('start-game')
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const startGameCon = document.getElementById('start-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of words for game
// const words = ['sigh', 'tense', 'airplane', 'ball', 'pies', 'juice', 'warlike', 'bad', 'north', 'dependent', 'steer', 'silver', 'highfalutin', 'superficial', 'quince', 'eight', 'feeble', 'admit', 'drag', 'loving'];

let randomWord;
let score = 0;
let time;

let difficulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';
difficultySelect.value = difficulty;

let maxScore = localStorage.getItem('maxScore') !== null ? localStorage.getItem('maxScore') : 0;

function startGame() {
    time = 10;
    startGameCon.style.display = 'none';

    //focus on text/input element on reload
    text.focus();
}

//start counting down
const timeInterval = setInterval(updateTime, 1000);

function addWordToDOM() {
    // randomWord = words[Math.floor(Math.random() * words.length)];
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '8a3ae32fdamsh3f69042bdb0c81ap103d85jsnb58c0de7942e',
            'X-RapidAPI-Host': 'random-word-generator2.p.rapidapi.com'
        }
    };

    fetch('https://random-word-generator2.p.rapidapi.com/word.php?generator=words&api_key=5w36eV0FZJu9QIPlpR18', options)
        .then(response => response.json())
        .then(data => {
            word.innerHTML = data.word;
            randomWord = word.innerHTML;
        });
}

addWordToDOM();

function updateScore() {
    score++;
    scoreEl.innerHTML = score;
}

function updateTime() {
    time--;
    timeEl.innerHTML = time + 's';

    if (time === 0) {
        clearInterval(timeInterval);

        gameOver();
    }
}

function gameOver() {
    if (score > maxScore) {
        localStorage.setItem('maxScore', score);
    }

    endgameEl.innerHTML = `
        <h1>Time ran out <i class="fa-solid fa-hourglass-end"></i></h1>
        <h3>Your final score: ${score}</h3>
        <h3>Your highest score: ${score > maxScore ? score : maxScore}</h3>
        <button onclick="window.location.reload()">Play Again</button>
    `;

    endgameEl.style.display = 'flex';
}

//Event Listeners
startGameEl.addEventListener('click', startGame);

text.addEventListener('input', e => {
    const insertedText = e.target.value;

    if (insertedText === randomWord) {
        addWordToDOM();
        updateScore();

        e.target.value = '';

        //add time according to difficulty
        if (difficulty === 'easy') {
            time += 5; //adds 4 sec to timer
        }
        else if (difficulty === 'medium') {
            time += 4; //adds 3 sec
        }
        else {
            time += 3; //adds 2 sec
        }

        updateTime();
    }
});

settingsBtn.addEventListener('click', () => settings.classList.toggle('hide'));

//set difficulty
settingsForm.addEventListener('change', e => {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})