/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

//Extra
1. A player looses his entire scores when he rolls two 6s in a row. Then next players turn.
*/


let scores, activePlayer, roundScore, gamePlaying,previousDice, winnigScore;

init();
//document.querySelector('#current-'+activePlayer).textContent = dice;

document.querySelector('.btn-roll').addEventListener('click', function() {
    
    if(gamePlaying) {
        //add dice value
        let dice = Math.floor(Math.random() * 6) + 1;
        let dice2 = Math.floor(Math.random() * 6) + 1;
        
        //change image
        let diceDom = document.querySelector('.dice');
        diceDom.style.display = 'block';
        diceDom.src = 'dice-'+ dice + '.png';
        
        let diceDom2 = document.querySelector('.dice2');
        diceDom2.style.display = 'block';
        diceDom2.src = 'dice-'+ dice2 + '.png';

        //if value > 1 then 
        if(dice==1 || dice2==1){
            nextPlayer();
        } 
        else if(previousDice==6 && dice==6){
            scores[activePlayer] = 0;
            document.querySelector('#score-'+activePlayer).textContent = 0;
            nextPlayer();
        }
        else if(dice!=1){
            //add score
            roundScore = roundScore +dice + dice2;
            document.getElementById('current-'+activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
        previousDice = dice;
    }
});
    
document.querySelector('.btn-hold').addEventListener('click', function() {
   
    if(gamePlaying) {
        // add score to scores
        scores[activePlayer] += roundScore;

        //update UI
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];
        
        let input = document.querySelector('.final-score').value;
        
        if(input){
            winnigScore = input;
        }
        else{
            winnigScore = 100;
        }
        
        
        //nextPlayer
        if(scores[activePlayer] >=winnigScore){
            document.querySelector('#name-'+ activePlayer).textContent = 'Winner!!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.dice2').style.display = 'none';
            document.querySelector('.player-'+activePlayer+'-panel').classList.add('winner');
            document.querySelector('.player-'+activePlayer+'-panel').classList.remove('active');
            gamePlaying = false;
        }
        else{
            nextPlayer();
        }
    }
    
});

document.querySelector('.btn-new').addEventListener('click', init);


function nextPlayer() {
        activePlayer === 0 ? activePlayer = 1 : activePlayer =0;
        roundScore = 0;
        document.getElementById('current-0').textContent = '0';
        document.getElementById('current-1').textContent = '0';
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');  
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.dice2').style.display = 'none';
}


function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('#name-0').textContent = 'PLAYER 1';
    document.querySelector('#name-1').textContent = 'PLAYER 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

