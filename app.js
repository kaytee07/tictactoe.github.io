const Player = (sign, name) => {
  let _playerName = name;
  let _playerSign = sign;
  let = _notHuman = false;
  const getSymbol = (_) => _playerSign;
  const getName = (_) => _playerName;
  const getType = _ => _notHuman;
  const setType = (_) => {
    if(_playerName === "Computer"){
      _notHuman = true
    }
  }
  setType()
  return {
    getSymbol,
    getName,
    getType,
  };
};


//Game Board
const gameBoard = ((_) => {
  let _gameB = ["", "", "", "", "", "", "", "", ""];
  const _Players = [];

  const getGameB = _ => {
      return _gameB
  }

  const setGameB = (index, currentPlayer) => {
      _gameB[index] = currentPlayer
      console.log(getGameB())
  }

  resetGameB = _ => {
    _gameB = ["", "", "", "", "", "", "", "", ""];
  }

  const selectPlayer = (player) => {
    _Players.push(player)
  };

  const getPlayers = _ => {
    return _Players
  }

  
 
  return {
    getGameB,
    setGameB,
    resetGameB,
    selectPlayer,
    getPlayers
  };
})();


//choose who to play with
const PlayWith = (_=>{
const board = document.querySelector(".App");
   const init = _ => {
     render();
    listeners();
   }

   const render = _ => {
      let markup = ""
      markup += `
      <div class="choose">
       <h2>TicTacToe<h2>
       <div>
        <p>choose play mode<p>
        <button class="friend">Play with a friend</button>
        <button class="AI">Play with AI</button>
       </div>
      </div>
      `
     board.innerHTML = markup
   }

   const listeners = _ => {
     document.querySelector(".friend").addEventListener("click", _=> {
        playFriend.init()
     })

    //  document.querySelector(".AI").addEventListener("click", (_) => {
    //     playAI.init();
    //   });
   }

   return {
     init
   }
})()

PlayWith.init()


const playFriend = (_=> {
  const app = document.querySelector(".App");
  const init = _ => {
    render();
    listeners();
  };

  const render = _ => {
    
    let markup = "";
    markup += `
      <div>
        <h2>choose player</h2>
        <section>
        <div class="player1">
        <h1>X</h1>
        <input class="player" placeholder="player1" type="text">
        </div>
        <div class="player2">
        <h1>Y</h1>
        <input class="player" placeholder="player2" type="text">
        </div>
        </section>
        <div>
        <button class="start">Start</button>
        <button class="return">Back</button>
        <div>
      </div>
    `;

    app.innerHTML = markup;
  }

  const listeners = _ => {
    document.querySelector(".start").addEventListener("click", (e)=>{
       [...e.target.parentElement.previousElementSibling.children].map(elem=> {
         gameBoard.selectPlayer(Player(
           elem.firstElementChild.innerHTML,
           elem.lastElementChild.value
         ))
       })
       Display.setCurrentPlayer(gameBoard.getPlayers()[0])
       Display.init()
    })
  }


  return {
    init
  }
})()

const playAI = ((_) => {
  const app = document.querySelector(".App");
  const init = (_) => {
    render();
    listeners();
  };

  const render = (_) => {
    let markup = "";
    markup += `
      <div>
        <h2>choose player</h2>
        <section>
        <div class="player1">
        <h1>X</h1>
        <input class="player" placeholder="player1" type="text">
        </div>
        <div class="player2">
        <h1>Y</h1>
        <input class="player" value="Computer" placeholder="Computer" type="text">
        </div>
        </section>
        <div>
        <button class="start">Start</button>
        <button class="return">Back</button>
        <div>
      </div>
    `;

    app.innerHTML = markup;
  };

  const listeners = (_) => {
    document.querySelector(".start").addEventListener("click", (e) => {
      [...e.target.parentElement.previousElementSibling.children].map(
        (elem) => {
          gameBoard.selectPlayer(
            Player(
              elem.firstElementChild.innerHTML,
              elem.lastElementChild.value,
              "Computer"
            )
          );
        }
      );
      Display.setCurrentPlayer(gameBoard.getPlayers()[0]);
      Display.init();
    });
  };

  return {
    init,
  };
})();


//Main Gmae Control
const Display = ((_) => {
  const app = document.querySelector(".App");
  let message = null;
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
    message = "it's a tie"
  }
}

function checkforWinner(){
  let i = 0;
  while(i < winningMatch.length){   
         if (
           gameBoard.getGameB()[winningMatch[i][0]] ===
             currentPlayer.getSymbol() &&
           gameBoard.getGameB()[winningMatch[i][1]] ===
             currentPlayer.getSymbol() &&
           gameBoard.getGameB()[winningMatch[i][2]] ===
             currentPlayer.getSymbol()
         ) {
           win++;
          message = `${currentPlayer.getName()} is the winner`;
          return true
         }
         i++;   
  }
  return false
}

const displayOutcome = _ => {
  if(message){
    document.querySelector(".final").classList.add("active");
  }
}

  const init = (_) => {
    render();
    listeners();
  };

  const initPlayer = (_) => {
    renderPlayers()
  }


   const render = () => {
    let markUp1 = `<div class="board">`;
    let markUp2 = ` <div class="players">`;

    gameBoard.getPlayers().map(players => {
      markUp2 += `
      <div class="final">
            <div class="mess">
              <p>${message}</p>
            </div>
            <p class="restart">restart game</p>
        </div>
      <div>
        <p>${players.getName()}</p><span>${players.getSymbol()}</span>
       </div>
      `;
    })
   
    gameBoard.getGameB().map((boxes, index) => {
      markUp1 += `
                <p id="${index}" class="box">${boxes}</p>
            `;
    });
    markUp2 += `
     </div>
    `;
    markUp1 += `
        <button class="home">Home</button> 
    </div>
    `;
  
    app.innerHTML = markUp2;
    app.innerHTML += markUp1;
  };

  const timeToPlay = (currentPlayer) => {
    gameBoard.getPlayers().map((player) => {
      if (currentPlayer.getSymbol() !== player.getSymbol()) {
        setCurrentPlayer(player)
      }
    });
  };

  const alreadyfilled = (spotmark) => {
      if(spotmark){
          return true
      }
  }

  const reset = _ => {
    gameBoard.resetGameB()
    numberOfPlays = 0;
    setCurrentPlayer(gameBoard.getPlayers()[0]);
    win = 0
    message = null;
  }
  const aiPlay = _ => {

      gameBoard.setGameB(bestSpot(),currentPlayer.getSymbol())
      numberOfPlays++
      checkforWinner();
      checkForDraw();
      timeToPlay(currentPlayer);
       displayOutcome(); 
      init();
  }

  const empSpaces = () => {
    let emptySpaces = [];
     for(let i= 0 ; i <= gameBoard.getGameB().length; i++){
        if(gameBoard.getGameB()[i] === ""){
          emptySpaces.push(i)
        }
     }
   return {
     emptySpaces
    }
  }

  const bestSpot = _ =>{
    return minimax(gameBoard.getGameB()).index
  }

  

  const listeners = _ => {
    let restart = document.querySelector(".restart")
    let boxes = document.querySelectorAll(".box");
    let final = document.querySelector(".final");
    boxes.forEach((box)=>{
        box.addEventListener("click", (e)=> {
          if(!alreadyfilled(box.innerHTML)){
              numberOfPlays++
              gameBoard.setGameB(box.id, currentPlayer.getSymbol())
              checkforWinner()
              checkForDraw()
              displayOutcome(); 
              init();
              timeToPlay(currentPlayer);

              if(currentPlayer.getType()){
                aiPlay()
              }
          }
        })
    })

    document.querySelector(".restart").addEventListener("click", _=> {
          reset();
          init();
    })

    document.querySelector(".home").addEventListener("click",_=>{
      PlayWith.init()
    } )
   
  }

  return {
    setCurrentPlayer,
    gamePlayers,
    init,
    initPlayer
  };
})();



