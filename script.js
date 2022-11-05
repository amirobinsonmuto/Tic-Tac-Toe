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

    //Get elements
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

    //private functions
    function _winPlayer() {
        _cells.forEach((cell) => {
            cell.style.pointerEvents = 'none';
        })
        _announcement.textContent = `${_currentPlayer.playerName} wins`;
    }
    
    function _togglePlayer () {
        (_currentPlayer == _playerA)? _currentPlayer = _playerB : _currentPlayer = _playerA;
        _announcement.textContent = 
        `${_currentPlayer.playerName}'s turn (Symbol: ${_currentPlayer.symbol})`
    }

    function _checkTie () {
        if (gameBoard.arr.includes(null) == false) {
            _announcement.textContent = 'Tie!';
        }
    }

    function _checkWinner () {
        if(_winCombinations.filter((_winCombination) => _winCombination.includes(_index))
                        .some((possibleCombination) => 
                            possibleCombination.every((index) => 
                            gameBoard.arr[index] == _currentPlayer.symbol))) {
                    _winPlayer();
                } else {
                    _togglePlayer();
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
            _announcement.textContent = 
            `${_playerA.playerName}'s turn (Symbol: ${_playerA.symbol})`

            //display the grid
            _hide.classList.remove('d-none');
            _form.classList.add('d-none');
        })
    }

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
