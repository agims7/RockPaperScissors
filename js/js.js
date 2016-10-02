//---------------VARIABLES---------------//

var newGameBtn = document.getElementById('js-newGameButton');
var newGameElem = document.getElementById('js-newGameElement');
var pickElem = document.getElementById('js-playerPickElement');
var resultsElem = document.getElementById('js-resultsTableElement');
var headElement = document.getElementById('js-headElement');

var pickRock = document.getElementById('js-playerPick_rock');
var pickPaper = document.getElementById('js-playerPick_paper');
var pickScissors = document.getElementById('js-playerPick_scissors');

var playerPickElem = document.getElementById('js-playerPick');
var computerPickElem = document.getElementById('js-computerPick');
var playerResultElem = document.getElementById('js-playerResult');
var computerResultElem = document.getElementById('js-computerResult');

var playerPointsElem = document.getElementById('js-playerPoints');
var playerNameElem = document.getElementById('js-playerName');
var computerPointsElem = document.getElementById('js-computerPoints');

var gameState = 'notStarted',  //started // ended
    player = {
        name: '',
        score: 0
    },
    computer = {
        score: 0
    };

//---------------FUNCTIONS---------------//

function setGameElements() {
  switch(gameState) {
    case 'started':
        newGameElem.style.display = 'none';
        pickElem.style.display = 'block';
        resultsElem.style.display = 'block';
        headElement.style.display = 'none';
      break;
    case 'ended':
        newGameBtn.innerText = 'Jeszcze raz';
    case 'notStarted':
    default:
        newGameElem.style.display = 'block';
        pickElem.style.display = 'none';
        resultsElem.style.display = 'none';
  }
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function setGamePoints() {
    playerPointsElem.innerHTML = player.score;
    computerPointsElem.innerHTML = computer.score;
}

function updateGameState() {
	if (player.score === 10) {
		alert('10 punktów zdobyte! Wygrał gracz: ' + player.name);
		gameState = 'ended';
	}
	else if (computer.score === 10) {
		alert('10 punktów zdobyte! Wygrał komputer');	
		gameState = 'ended';
	}
}

function setWinner(winner, winnersElement) {
	winnersElement.innerHTML = 'Wygrana';
	winner.score++;
	setGamePoints();
}

function checkRoundWinner(playerPick, computerPick) {
  playerResultElem.innerHTML = computerResultElem.innerHTML = '';
  
  var winnerIs = '';

  if (playerPick == computerPick) {
    winnerIs = "Remis!";
    playerResultElem.innerHTML = winnerIs;
    playerResultElem.style.color = 'red';
    computerResultElem.innerHTML = winnerIs;
    computerResultElem.style.color = 'red';
  }
	else if ((computerPick == 'rock' &&  playerPick == 'scissors') ||
        (computerPick == 'scissors' &&  playerPick == 'paper') ||
        (computerPick == 'paper' &&  playerPick == 'rock')) {
    computerResultElem.style.color = 'red';
  	return setWinner(computer, computerResultElem);
  }
  else {
    playerResultElem.style.color = 'red';
		return setWinner(player, playerResultElem);  	
  }
}

function playerPick(playerPick) {
    var computerPick = getComputerPick();
    
    playerPickElem.innerHTML = playerPick;
    computerPickElem.innerHTML = computerPick;

    checkRoundWinner(playerPick, computerPick);
    updateGameState();
    setGameElements();
}

function newGame() {
  player.name = prompt('Graczu, wpisz swoje imię', 'imię gracza');
  if (player.name) {
    player.score = computer.score = 0;
    gameState = 'started';
    setGameElements();

    playerNameElem.innerHTML = player.name;
    setGamePoints();
  }
}

//---------------ACTION---------------//

pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

newGameBtn.addEventListener('click', newGame);

setGameElements();