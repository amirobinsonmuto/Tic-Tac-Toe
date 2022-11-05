//gameBoard module to create a gameBoardArr function
const gameBoard = (() => {
    let arr = [null, null, null, null, null, null, null, null, null];
    //return an object
    return { 
        arr
    };
})(); 

//Player object factory
const playerFactory = (name, x) => {
    const playerName = name;
    const symbol = x;
    //return an object
    return {
        playerName,
        symbol
    }
}

//controller object module with several methods stored in it
const controller = (() => {

    //Get elements and declare variables
    const _playBtn = document.getElementById('playBtn');
    const _cells = document.querySelectorAll('.cell');
    const _announcement = document.getElementById('announcement');
    const _hide = document.getElementById('hide');
    const _form = document.getElementById('form');
    const _refreshBtn = document.getElementById('refreshBtn');

    let _playerA;
    let _playerB; 
    let _id;    
    let _currentPlayer;

    //private functions
    function _togglePlayer () {
        (_currentPlayer == _playerA)? _currentPlayer = _playerB : _currentPlayer = _playerA;
        _announcement.textContent = `${_currentPlayer.playerName}'s turn (Symbol: ${_currentPlayer.symbol})`
    }
    
    function _checkTie () {
        if (gameBoard.arr.includes(null) == false) {
            _announcement.textContent = 'Tie!';
        } 
    }
    
    function _winPlayerA () {
        _announcement.textContent = `${_playerA.playerName} wins`;
        console.log(_playerA.playerName);
        _cells.forEach((cell) => {                
            cell.style.pointerEvents = 'none';
        })
    }
    
    function _winPlayerB () {
        _announcement.textContent = `${_playerB.playerName} wins`;
        _cells.forEach((cell) => {                
            cell.style.pointerEvents = 'none';
        })
    }
    
    //TO IMPROVE THIS SECTION LATER
    function _checkWinner () {
        //horizontal
        if ((gameBoard.arr[0] == gameBoard.arr[1]) &&
            (gameBoard.arr[0] == gameBoard.arr[2])) {
                if (gameBoard.arr[0] == _playerA.symbol) {
                    _winPlayerA();
                } else if (gameBoard.arr[0] == _playerB.symbol) {
                    _winPlayerB();
                }
            }
            
        if ((gameBoard.arr[3] == gameBoard.arr[4]) &&
        (gameBoard.arr[3] == gameBoard.arr[5])) {
            if (gameBoard.arr[3] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[3] == _playerB.symbol) {
                _winPlayerB();
            }
        }
        
        if ((gameBoard.arr[6] == gameBoard.arr[7]) &&
        (gameBoard.arr[6] == gameBoard.arr[8])) {
            if (gameBoard.arr[6] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[6] == _playerB.symbol) {
                _winPlayerB();
            }
        }
        
        //vertical
        if ((gameBoard.arr[0] == gameBoard.arr[3]) &&
        (gameBoard.arr[0] == gameBoard.arr[6])) {
            if (gameBoard.arr[0] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[0] == _playerB.symbol) {
                _winPlayerB();
            }
        }
        
        if ((gameBoard.arr[1] == gameBoard.arr[4]) &&
        (gameBoard.arr[1] == gameBoard.arr[7])) {
            if (gameBoard.arr[1] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[1] == _playerB.symbol) {
                _winPlayerB();
                }
        }

        if ((gameBoard.arr[2] == gameBoard.arr[5]) &&
        (gameBoard.arr[2] == gameBoard.arr[8])) {
            if (gameBoard.arr[2] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[2] == _playerB.symbol) {
                _winPlayerB();
            }
        }
        
        //diagonal
        if ((gameBoard.arr[0] == gameBoard.arr[4]) &&
        (gameBoard.arr[0] == gameBoard.arr[8])) {
            if (gameBoard.arr[0] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[0] == _playerB.symbol) {
                _winPlayerB();
            }
        }
        
        if ((gameBoard.arr[2] == gameBoard.arr[4]) &&
        (gameBoard.arr[2] == gameBoard.arr[6])) {
            if (gameBoard.arr[2] == _playerA.symbol) {
                _winPlayerA();
            } else if (gameBoard.arr[2] == _playerB.symbol) {
                _winPlayerB();
            }
        }
        
    }
    
    //public functions

    function startGame() {
        _playBtn.addEventListener('click', () => {
            //get input name values
            const _playerAName = document.getElementById('playerA').value;
            const _playerBName = document.getElementById('playerB').value;
 
            //create objects
            _playerA = playerFactory(_playerAName, 'X'); 
            _playerB = playerFactory (_playerBName, 'O');
            _currentPlayer = _playerA;
            _announcement.textContent = `${_playerA.playerName}'s turn (Symbol: ${_playerA.symbol})`

            //display the grid
            _hide.classList.remove('d-none');
            _form.classList.add('d-none');
        })
    }

    function gameLoop() {
        _cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {  
                _id = e.target.getAttribute('id');
                gameBoard.arr[_id] = _currentPlayer.symbol;
                e.target.textContent = gameBoard.arr[_id];
                e.target.style.pointerEvents = 'none';
                _togglePlayer();
                _checkTie();
                _checkWinner();   
            })
        })
    }

    function refreshGame() {
        _refreshBtn.addEventListener('click', () => {
            gameBoard.arr = [null, null, null, null, null, null, null, null, null];
            _cells.forEach((cell) => {
                cell.textContent = null;
                cell.style.pointerEvents = 'auto';
            })
            _hide.classList.add('d-none');
            _form.classList.remove('d-none');
        })
    }
    
    return {
        startGame,
        gameLoop,
        refreshGame
    }

})();

controller.gameLoop();
controller.startGame();
controller.refreshGame();
