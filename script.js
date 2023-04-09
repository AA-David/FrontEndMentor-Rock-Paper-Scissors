const win = document.querySelector('.win');
const lose = document.querySelector('.lose');
const tie = document.querySelector('.tie');
const playAgain = document.querySelector('.play-again');

const rulesBtn = document.querySelector('.rules-btn');
const closeRules = document.querySelector('.close-rules');
const closeRulesModal = document.querySelector('.close-modal');
const rules = document.querySelector('.rules');
const rulesModal = document.querySelector('.rules-modal');

const score = document.querySelector('.score');
const triangle = document.querySelector('.triangle');

const scissors = document.querySelector('.scissors');
const paper = document.querySelector('.paper');
const rock = document.querySelector('.rock');

const computerScissors = document.querySelector('.computer-scissors');
const computerPaper = document.querySelector('.computer-paper');
const computerRock = document.querySelector('.computer-rock');

const computerChoices = [computerScissors, computerPaper, computerRock];
const computerChoice = computerChoices[Math.floor(Math.random() * 3)];
let choice;

let scoreNum = 0;

function getScore() {
    if (!localStorage.getItem('score')) {
        score.innerHTML = '0';
    } else {
        scoreNum = localStorage.getItem('score');
        score.innerHTML = localStorage.getItem('score');
    }
} 

function hideAll() {
    triangle.classList.toggle('hidden');
    scissors.classList.toggle('hidden');
    paper.classList.toggle('hidden');
    rock.classList.toggle('hidden');
    win.parentElement.style.position = 'relative';

    showComputerChoice();
}

clicked(scissors);
clicked(paper);
clicked(rock);

function clicked(type) {
    type.addEventListener('click', () => {
        if (choice === undefined) {
            if (type === scissors) { choice = 1; }
            else if (type === paper) { choice = 2; } 
            else { choice = 3; }
            hideAll();
            logic();
            setTimeout(() => {
                if (type === rock) {
                    if (window.matchMedia('(min-width: 930px)').matches) {
                        type.style.top = '-66px';
                    } else if (window.matchMedia('(min-width: 600px)').matches) {
                        type.style.top = '-53px';
                    } else {
                        type.style.top = '-47px';
                    }
                    type.style.left = '-25px';
                } else if (type === scissors) {
                    return;
                } else {
                    type.style.left = '-25px';
                } 
                type.style.transition = '1s ease-in-out';
            }, 500);
            type.classList.toggle('hidden');
        }
    });
}

const delay = n => new Promise(r => setTimeout(r, n));

async function showComputerChoice() {
    await delay(1700);
    computerChoice.style.transition = '0.2s';
    computerChoice.style.opacity = '1';
}

async function logic() {
    switch(choice) {
        case 1: // Scissors
            // if paper, +1p, if rock, -1p
            if (computerChoice === computerPaper) {
                scoreNum++;
                winLoseTie(win);
            } else if (computerChoice === computerRock) {
                scoreNum--;
                winLoseTie(lose);
            } else {
                scoreNum = scoreNum;
                winLoseTie(tie);
            }
            break;
        case 2: // Paper
            // if rock, +1p, if scissors, -1p
            if (computerChoice === computerRock) {
                scoreNum++;
                winLoseTie(win);
            } else if (computerChoice === computerScissors) {
                scoreNum--;
                winLoseTie(lose);
            } else {
                scoreNum = scoreNum;
                winLoseTie(tie);
            }
            break;
        case 3: // Rock
            // if scissors, +1p, if paper, -1p
            if (computerChoice === computerScissors) {
                scoreNum++;
                winLoseTie(win);
            } else if (computerChoice === computerPaper) {
                scoreNum--;
                winLoseTie(lose);
            } else {
                scoreNum = scoreNum;
                winLoseTie(tie);
            }
            break;
    }

    scoreNum < 0 ? scoreNum = 0 : localStorage.setItem('score', scoreNum);

    await delay(2000);
    score.innerHTML = scoreNum;
}

async function winLoseTie(outcome) {
    await delay(2000);
    outcomeFunc();
    function outcomeFunc() {
        outcome.style.transition = '0.2s';
        outcome.style.visibility = 'visible';
        outcome.style.opacity = '1';
    }
}

rulesBtn.addEventListener('click', () => {
    if (window.matchMedia('(min-width: 1270px)').matches) {
        rulesModal.style.top = '50%';
        rulesModal.style.transform = 'translate(-50%, -50%)';
        document.querySelector('.dim-page').style.opacity = '1';
    } else {
        rules.style.top = '0';
    }
});

closeRules.addEventListener('click', () => {
    rules.style.top = '100vh';
});

closeRulesModal.addEventListener('click', () => {
    document.querySelector('.dim-page').style.opacity = '0';
    rulesModal.removeAttribute('style');
});
