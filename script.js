//gameBoard module
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

//controller object module
const controller = (() => {

    //get elements
    const _playBtn = document.getElementById('playBtn');
    const _cells = document.querySelectorAll('.cell');
    const _announcement = document.getElementById('announcement');
    const _hide = document.getElementById('hide');
    const _form = document.getElementById('form');
    const _refreshBtn = document.getElementById('refreshBtn');

    //private variables
    let _playerA;
    let _playerB;
    let _index;
    let _currentPlayer;
    let _playerAName;
    let _playerBName;

    //private functions

    //function to get input values. Use default values if fields are left blank.
    function _getName() {
        (document.getElementById('playerA').value == '')? 
            _playerAName = 'First player': 
            _playerAName = document.getElementById('playerA').value;

        (document.getElementById('playerB').value == '')? 
            _playerBName = 'Second player': 
            _playerBName = document.getElementById('playerB').value;

    }

    //make the cells unable to click and announce the winner.
    function _winPlayer() {
        _cells.forEach((cell) => {
            cell.style.pointerEvents = 'none';
        })
        _announcement.textContent = `${_currentPlayer.playerName} wins`;
    }
    
    //togglePlayer from A to B (or B to A). Announce who's turn.
    function _togglePlayer () {
        (_currentPlayer == _playerA)? _currentPlayer = _playerB : _currentPlayer = _playerA;
        _announcement.textContent = 
        `${_currentPlayer.playerName}'s turn (Symbol: ${_currentPlayer.symbol})`
    }

    //if all cells are taken, announce tie.
    function _checkTie () {
        if (gameBoard.arr.includes(null) == false) {
            _announcement.textContent = 'Tie!';
        }
    }

    //check if winning combinations are filled with one symbol.
    function _checkWinner () {
        const _winCombinations = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ]

        if(_winCombinations.filter((_winCombination) => _winCombination.includes(_index))
                        .some((possibleCombination) => 
                            possibleCombination.every((value) => 
                            gameBoard.arr[value] == _currentPlayer.symbol))) {
                    _winPlayer();
        } else {
            _togglePlayer();
        }
    }


    //public functions

    //function to start a game. Hide the name form and display the grid.
    function startGame() {
        _playBtn.addEventListener('click', () => {

            _getName();

            //create objects
            _playerA = playerFactory(_playerAName, 'X');
            _playerB = playerFactory (_playerBName, 'O');
            _currentPlayer = _playerA;
            _announcement.textContent = 
            `${_playerA.playerName}'s turn (Symbol: ${_playerA.symbol})`

            //display the grid
            _hide.classList.remove('d-none');
            _form.classList.add('d-none');
        })
    }

    //function to invoke when a cell is clicked.
    function gameLoop() {
        _cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {
                _index = parseInt(e.target.getAttribute('id'));
                gameBoard.arr[_index] = _currentPlayer.symbol;
                e.target.textContent = gameBoard.arr[_index];
                e.target.style.pointerEvents = 'none';

                _checkTie();
                _checkWinner();

            })
        })
    }

    //function to refresh a game when the refreshBtn is clicked.
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
