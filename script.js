//gameBoard module to create a gameBoardArr function
const gameBoard = (() => {
    let gameBoardArr = [null, null, null, null, null, null, null, null, null];
    //return an object
    return { 
        gameBoardArr
    };
})(); 

console.log(gameBoard.gameBoardArr); // to delete later

//Player object factory
const playerFactory = (x) => {
    const player = x;
    const symbol = (x == 'A')? 'X' : 'O';
    //return an object
    return {
        player: player,
        symbol: symbol
    }
}

//controller object module with several methods stored in it
const controller = (() => {

    let _playerA = playerFactory('A'); 
    let _playerB = playerFactory ('B'); 
    let _player = _playerA;
    let cells = document.querySelectorAll('.cell');
    let id;
    let announcement = document.getElementById('announcement');

    function _togglePlayer () {
        (_player == _playerA)? _player = _playerB : _player = _playerA;
    }

    function putSymbol () {

        cells.forEach((cell) => {
            cell.addEventListener('click', (e) => {

                id = e.target.getAttribute('id');
                gameBoard.gameBoardArr[id] = _player.symbol;
                console.log(gameBoard.gameBoardArr);
                e.target.textContent = gameBoard.gameBoardArr[id];
                _togglePlayer();

                if (gameBoard.gameBoardArr.includes(null) == false) {
                    announcement.textContent = 'gameover';
                }
            })
        })
    }

    return {
        putSymbol
    }
})();

controller.putSymbol();
