import { Injectable } from '@angular/core';
import { Field } from './field.interface';

@Injectable({ providedIn: 'root' })
export class FieldService {
  board: Field[][] = [];

  createNewBoard(x: number, y: number, mines: number) {
    this.initializeBoard(x, y);
    this.addMines(this.board, mines);
    this.countScores(this.board);
  }

  initializeBoard(x: number, y: number) {
    for (let i: number = 0; i < x; i++) {
      this.board[i] = [];
      for (let j: number = 0; j < y; j++) {
        this.board[i][j] = { mine: false, flag: false, score: 0 };
      }
    }
  }

  randomizeField(width, height: number) {
    const x = Math.floor(Math.random() * width);
    const y = Math.floor(Math.random() * height);
    return [x, y];
  }

  addMines(board: Field[][], mines: number) {
    let m = 0;
    while (m != mines) {
      const position = this.randomizeField(board.length, board[0].length);
      const field = this.board[position[0]][position[1]];
      if (field.mine != true) {
        field.mine = true;
        m++;
      }
    }
  }

  countScores(board: Field[][]) {
    const width: number = board.length;
    const height: number = board[0].length;
    for (let i = 0, h = width; i < h; i++) {
      for (let j = 0, w = height; j < w; j++) {
        if (board[i][j].mine != true) {
          for (let n: number = i - 1; n < i + 2; n++) {
            if (n < 0 || n >= width) continue;
            for (let m: number = j - 1; m < j + 2; m++) {
              if (m < 0 || m >= height || (j == m && i == n)) continue;
              if (board[n][m].mine === true) board[i][j].score += 1;
            }
          }
        } else {
          board[i][j].score = -1;
        }
      }
    }
  }
}
