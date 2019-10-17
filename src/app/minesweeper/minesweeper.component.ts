import { Component, OnInit } from '@angular/core';
import { FieldService } from '../field.service';

@Component({
  selector: 'app-minesweeper',
  templateUrl: './minesweeper.component.html',
  styleUrls: ['./minesweeper.component.scss']
})
export class MinesweeperComponent implements OnInit {
  //board zlozony z fileds a fields są obiektami
  //czyli tu jakiś make new game
  board = [];
  constructor(private fieldService: FieldService) {}

  newGame(x: number = 9, y: number = 9, mines: number = 10) {
    console.log(`plansza ${x} na ${y} z ${mines} minami`);
    this.fieldService.createNewBoard(x, y, mines);
    this.board = this.fieldService.board;
    //tworzy macierz board z fieldami, każdy field jest obiektem
    //losowo uzupełniane miny z licznikiem min jak dobije do wartości min to przestaje je dodawac
    //wiec macierz z wyzerowanymi obiektami, a potem dodawanie w pętli randomowo miny
    //potem obliczanie scora min sąsiednich
  }

  ngOnInit() {
    this.newGame();
  }
}
