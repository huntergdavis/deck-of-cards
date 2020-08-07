// run a single card game
function runSimulation(level) {
    var deck = Deck();
    deck.shuffle();

    // there are 7 "rounds" for a level
    // level 1 = 1,1,2,2,3,3,boss
    // level 2 = 2,2,3,3,4,4,boss
    // level 3 = 3,3,4,4,5,5,boss
    // level 4 = 4,4,5,5,6,6,boss 
    // etc

    // you initially draw level+1 cards
    // the last card is the 'suit' card, and sets the 'suit' for the level
    // therefore, we can statically pull # of cards based on input level
    // level+1 cards for your team
    // 1 card for boss
    // 12 cards level 1, 18 cards level 2, 24 cards level 3, 30 cards level 4
    // generalize as 6 *+(6*level) 
    // so we have 6 + (6*level) + 1 + level + 1
    // which reduces to 8 + (7*level)
    // meaning our maximum level = (52-8)/7 = 44/7 = level 6! 
    // *note - higher levels towards 6 may be mathematically impossible to win based on card distribution


    // draw our 8+(7*level) cards   
    var playCards = deck.cards.splice(0, (8+(7*level)) );

    // set our commander
    var commander = playCards.shift();

    // get all of our team cards
    var teamCards = playCards.splice(0,level);

    // our suit card sets the level suit, which doubles the values of all cards of that suite this level
    var suitCard = teamCards[teamCards.length-1];
    var suit = suitCard.suit;

    // 7 rounds 
    for(var round = 0;round<7;round++) {
        var roundEnemies;

        if(round == 6) {
            roundEnemies = playCards.splice(0,1);
        }else if(round == 0 || round == 1){
            roundEnemies = playCards.splice(0,level);
        }else if(round == 2 || round == 3){
            roundEnemies = playCards.splice(0,level+1);
        }else if(round == 4 || round == 5){
            roundEnemies = playCards.splice(0,level+2);
        }

        // calculate rank of enemy cards
        var enemyRank = 0;
        for (const card of roundEnemies) {
            if(card.suit == suit) {
                enemyRank += (card.rank * 2);
            }else {
                enemyRank += card.enemyRank;
            }
        }

        // calculate rank of hand cards
        var rank = commander.rank;
        for (const card of teamCards) {
            if(card.suit == suit) {
                rank += (card.rank * 2);
            }else {
                rank += card.rank;
            }
        }

        alert("Toal hand rank: " + rank);
        alert("Total enemy rank" + enemyRank);
    }

}



window.onload = function() {
    document.getElementById("runsim").onclick = function fun() {
        runSimulation(1); 
    }
}