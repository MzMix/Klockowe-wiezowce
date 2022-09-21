/**
* @description Calculate position of a cell on a 4x4 board.
* @param {number} id
* @return {{x: number, y: number}}
*/
export function CalculateBoardPosition(id) {
    let x = id % 4;
    if (x == 0) x = 4;

    let y;

    if (id >= 1 && id <= 4) y = 1;
    if (id >= 5 && id <= 8) y = 2;
    if (id >= 9 && id <= 12) y = 3;
    if (id >= 13 && id <= 16) y = 4;

    return {
        x: x,
        y: y,
    };
}

/**
 * @description Creates id for cell based on its position 
 * @param {{x: number, y: number}} position
 * @return {string}
*/
export function GetId(position) {
    return `(${position.x}, ${position.y})`
}