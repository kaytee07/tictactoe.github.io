const Player = (sign) => {
  let _playerSign = sign;
  const getPlayer = (_) => _playerSign;
  gameBoard.selectPlayer(getPlayer())
  return {
    getPlayer,
  };
};



const gameBoard = ((_) => {
  const _gameB = ["", "", "", "", "", "", "", "", ""];
  const choosePlayer = ["X", "O"];

  const getGameB = _ => {
      return _gameB
  }

  const setGameB = (index, currentPlayer) => {
      _gameB[index] = currentPlayer
      console.log(getGameB())
  }

  const selectPlayer = (player) => {
    let player1 = player;
    let player2 = null;
    choosePlayer.map((nextP) => {
      if (player1 !== nextP) {
        player2 = nextP;
      }
    });
      [player1, player2].forEach((key)=>{
        Display.gamePlayers(key)
      })
      Display.setCurrentPlayer(player1);
  };

  
 
  return {
    getGameB,
    setGameB,
    choosePlayer,
    selectPlayer,
  };
})();

const Display = ((_) => {
  const board = document.querySelector(".board");
  const players = document.querySelector(".xplayer");
  const allPlayers = [];
  let numberOfPlays = 0;
  let currentPlayer = "";
  let win = 0;

  const setCurrentPlayer = player => {
    currentPlayer = player
  }

  const gamePlayers = players => {
      allPlayers.push(players)
  }

  winningMatch = [
      [0, 1, 2],
      [0, 4, 8],
      [3, 4, 5],
      [6, 7, 8],
      [6, 4, 2],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8]
  ]

function checkForDraw(){
  if(numberOfPlays >= 9 && !win){
    console.log("it's a tie")
  }
  console.log(numberOfPlays)
}

function checkforWinner(){
  let i = 0;
  while(i < winningMatch.length){
       while (i < winningMatch.length) {
         if (
           gameBoard.getGameB()[winningMatch[i][0]] === currentPlayer &&
           gameBoard.getGameB()[winningMatch[i][1]] === currentPlayer &&
           gameBoard.getGameB()[winningMatch[i][2]] === currentPlayer
         ) {
           win++;
         }
         i++;
       }   
  }

  if(win > 0){
    console.log(`${currentPlayer} is the winner`)
  }

}



  const init = (_) => {
    renderPlayers();
    render();
    choosePlayerDOM();
    Play();
  };

  const renderPlayers = (_) => {
    let markUp2 = "";

     gameBoard.choosePlayer.map((player, index) => {
       markUp2 += `
            <p class="player">${player}</p>
          `;
     });

     players.innerHTML = markUp2;

  }

   const render = () => {
    let markUp1 = "";
    gameBoard.getGameB().map((boxes, index) => {
      markUp1 += `
                <p id="${index}" class="box">${boxes}</p>
            `;
    });
    board.innerHTML = markUp1;
  };

  const timeToPlay = (currentPlayer) => {
    allPlayers.map((player) => {
      if (currentPlayer !== player) {
        setCurrentPlayer(player);
      }
    });
  };

  const choosePlayerDOM = (_) => {
    let player = document.querySelectorAll(".player");
    player.forEach((playa) => {
      playa.addEventListener("click", (e) => {
          Player(e.target.innerHTML);
      });
    });
  };

  const alreadyfilled = (spotmark) => {
      if(spotmark){
          return true
      }
  }

  const playerSelected = () => {
    if(allPlayers.length) return true
  }



  const Play = _ => {
    let boxes = document.querySelectorAll(".box");
    boxes.forEach((box)=>{
        box.addEventListener("click", (e)=> {
          if(!alreadyfilled(box.innerHTML)){
             if(!playerSelected()){
                return alert("select player fool")
             }
              numberOfPlays++
              gameBoard.setGameB(box.id, currentPlayer)
              init()
              checkforWinner()
              checkForDraw()
              timeToPlay(currentPlayer);
          }
        })
    })
   
  }

  return {
    setCurrentPlayer,
    gamePlayers,
    init
  };
})();

Display.init();
