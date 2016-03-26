'use strict'

const BOARD_SIZE = 10
const SHIPS = [
    {count: 1, size: 5},
    {count: 1, size: 4},
    {count: 1, size: 3},
    {count: 2, size: 2},
    {count: 2, size: 1},
]
function rand(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

class BattleShip {
    constructor() {
        this.myBoard = new Board()
        this.enemyBoard = new Board()
        this._ships = []
        for (let ship of this.myBoard.ships) {
            this._ships.push({start: {x: ship.x, y: ship.y}, vertical: ship.vertical, length:ship.length})
        }
    }
    get myShips() {
        return this._ships
    }
    fire(x, y) {
        let stuff = this.enemyBoard.fire(x, y)
        let hit = stuff.hit
        let sunk = stuff.sunk
        let playerWins = stuff.allShipsGone
        //let {hit, sunk, allShipsGone: playerWins} 
        let puterWins
        if (!playerWins) {
            let loop = true
            while (loop) {
                loop = false
                try {
                    //let {allShipsGone: puterWins} = this.myBoard.fire(rand(0, BOARD_SIZE), rand(0, BOARD_SIZE))
                    let stuff = this.myBoard.fire(rand(0, BOARD_SIZE), rand(0, BOARD_SIZE))
                    puterWins = stuff.allShipsGone
                } catch(e) {
                    loop = true
                }
            }
        }
        return {
            myBoard: this.myBoard.boardStatus,
            enemyBoard: this.enemyBoard.boardStatus,
            hit,
            sunk,
            youWin: playerWins,
            youLose: puterWins,
        }
    }
}


class Board {
    constructor() {
        this.ships = []
        this.coordToShip = []
        for (let i=0; i < BOARD_SIZE; ++i) {
            this.coordToShip[i] = []
            for (let j=0; j < BOARD_SIZE; ++j) {
                this.coordToShip[i][j] = null
            }
        }
        this.attempts = []
        for (let i=0; i < BOARD_SIZE; ++i) {
            this.attempts[i] = []
            for (let j=0; j < BOARD_SIZE; ++j) {
                this.attempts[i][j] = false
            }
        }
        for (const ship of SHIPS) {
            for (let i=0; i < ship.count; ++i) {
                this._placeShip(ship.size)
            }
        }
    }
    _placeShip(length) {
        let valid = false
        let x,y,vertical
        while (!valid) {
            vertical = !!rand(0,2)
            x = rand(0, BOARD_SIZE - (vertical ? 0 : length))
            y = rand(0, BOARD_SIZE - (vertical ? length : 0))
            if (this._validLocation(x,y,vertical, length)) valid=true
        }
        let ship = new Ship(x, y, vertical, length)
        // set location
        this._setLocation(ship)
        // add to ships
        this.ships.push(ship)
        
    }
    _validLocation(x, y, vertical, length) {
        for (let i=0; i < length; ++i) {
            if (this.coordToShip[y + (vertical ? i : 0)][x + (vertical ? 0 : i)]) return false
        }
        return true
    }
    _setLocation(ship) {
        //let {x, y, vertical, length} = ship
        let x = ship.x
        let y = ship.y
        let vertical = ship.vertical
        let length = ship.length
        for (let i = 0; i < length; ++i) {
            this.coordToShip[y + (vertical ? i : 0)][x + (vertical ? 0 : i)] = ship
        }
    }
    get boardStatus() {
        let ret = []
        for (let i=0; i < BOARD_SIZE; ++i) {
            ret.push([])
            for (let j=0; j < BOARD_SIZE; ++j) {
                if (this.attempts[i][j]) {
                    ret[i][j] = this.coordToShip[i][j] ? 'X' : '/'
                } else {
                    ret[i][j] = null
                }
            } 
        }
        return ret
    }
    fire(x, y) {
        if (this.attempts[y][x]) throw Error('Already fired there')
        this.attempts[y][x] = true
        if (this.coordToShip[y][x]) {
            this.coordToShip[y][x].hit()
        }
        let allShipsGone = true
        for (let ship of this.ships) {
            if (!ship.sunk) allShipsGone = false
        }
        
        return {
            hit: !!this.coordToShip[y][x],
            sunk: !!this.coordToShip[y][x] && this.coordToShip[y][x].sunk,
            allShipsGone,
        }
    }
}
class Ship {
    constructor(x, y, vertical, length) {
        //[this.x, this.y, this.vertical, this.length] = [x, y, vertical, length]
        this.x = x
        this.y = y
        this.vertical = vertical
        this.length = length
        this.hits = 0
        this.sunk = false
    }
    hit() {
        if (++this.hits == this.length) {
            this.sunk = true
        }
    }
}

module.exports = BattleShip
