//cards are nice, let's make it possible to create them
const cards = 	['fa-diamond', 'fa-diamond',
				'fa-paper-plane-o', 'fa-paper-plane-o',
				'fa-anchor', 'fa-anchor',
				'fa-bolt', 'fa-bolt',
				'fa-cube', 'fa-cube',
				'fa-leaf', 'fa-leaf',
				'fa-bicycle', 'fa-bicycle',
				'fa-bomb', 'fa-bomb',
				 ];

function cardCreation(card) {
	return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

//variables for later use
let flipped = [];
let move = 0;
let time = 0;
let good = 13;
let okay = good+6;
const stars = document.querySelector('.stars');
let starnum = 3;
const restart = document.querySelector('.restart');
const dupeMe = document.querySelector('.clone');
let theCards = 0;
let matched = 0;
let timea = 0;
let timeb = 0;
let myTime = 0;

//start the game
 function initiate() {
 	//stops any previously running timers
 	myTimeStop();
 	//create those cards mentioned before and fill the deck
 	const deck = document.querySelector('.deck');
 	let HTMLCards = shuffle(cards).map(function(card){
 		return cardCreation(card);
 	});
 	deck.innerHTML = HTMLCards.join('');
 	//reset variables
 	move = 0;
 	time = 0;
 	flipped = [];
 	matched = 0;
 	timea = 0;
 	timeb = 0;
 	document.getElementById('num').innerText = move;
 	document.getElementById('timer').innerText = time;
 	//reset stars
 	if (starnum < 3) {
 		let dupeOne = dupeMe.cloneNode(true);
 		stars.appendChild(dupeOne);
 		starnum++;
 	};
 	if (starnum < 3) {
 		let dupeTwo = dupeMe.cloneNode(true);
 		stars.appendChild(dupeTwo);
 		starnum++;
 	};
 	//Setup flip; i.e. the whole game
 	theCards = document.querySelectorAll('.card');
 	theCards.forEach(function(card) {
		card.addEventListener('click', function(event){
			//start timer
			if (timea === 0){
				timea = new Date().getTime();
			};
			if (timeb === 0) {
				myTime = setInterval(function(){
					timeb = new Date().getTime();
					let delta = timeb - timea;
					time = Math.floor(delta/1000);
					document.getElementById('timer').innerText = time;
				}, 250)
			};
			//flip card if not already flipped
			if  (!card.classList.contains('match') && !card.classList.contains('open')){
				card.classList.add('open', 'show');
				flipped.push(card);
				//check for match
				if (flipped.length == 2){
					move++;
					document.getElementById('num').innerText = move;
					if (flipped[0].dataset.card == flipped[1].dataset.card){
						flipped.forEach(function(card){
							card.classList.remove('open', 'show');
							card.classList.add('match');
							matched++;
							//check if you won
							setTimeout(function win () {
								if (matched == 16) {
									window.alert(`Congratulations, you won!\nStar Rating: ${starnum}\nYou played for ${time} seconds\nClick "OK" to play again!`)
									initiate();
								};
							 }, 1);
							flipped = [];
						})
					} else {
					setTimeout(function( ){
						flipped.forEach(function(card){
							card.classList.remove('open', 'show');
							flipped = [];
						})
					}, 500)};
					//manage star rating
					if (move < good) {
						return;
					} else if (move >= good && move < okay) {
						if (starnum == 3) {
							stars.removeChild(stars.firstChild);
							stars.removeChild(stars.firstChild);
							starnum--;
						};
					} else if (move >= okay){
						if (starnum == 2) {
							stars.removeChild(stars.firstChild);
							stars.removeChild(stars.firstChild);
							starnum--;
						};
					};
				};
			};
		});
	});
 };

function myTimeStop() {
	clearInterval(myTime);
}

 initiate();
