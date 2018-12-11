import { Injectable } from '@angular/core';
import { Game } from './game';
import { Card } from './card';
import { Bot } from './bot';
import { game } from './mock_game'; 

@Injectable({
  providedIn: 'root'
})

export class GameService {
	history: Array<Game>;
	botBrain: Bot;
	selected: Card;
	selIndex: number;
	validTargets: Card[];

	get legalMoves() {
		let moves = [];
		this.validTargets = [];
		if (this.selected) {
			console.log("finding legal moves");
			switch (this.selected.rank) {
				case 1:
				case 3:
				case 4:
				case 5:
				case 6:
				case 7:
					moves.push("field");
					moves.push("scrap");
					// Determine legal scuttles
					this.game.bot.points.forEach(card => {
						if (card.rank < this.selected.rank || (card.rank == this.selected.rank && card.suit <= this.selected.suit) ) {
							console.log(`Found legal scuttle: ${card.name} with ${this.selected.name}`);
							// Add point to list of scuttles
							this.validTargets.push(card);
						}
					});
					console.log("Valid targets:" );
					console.log(this.validTargets);
					break;

				case 2:
				case 9:
					// Determine legal scuttles
					this.game.bot.points.forEach(card => {
						if (card.rank < this.selected.rank || (card.rank == this.selected.rank && card.suit <= this.selected.suit) ) {
							console.log(`Found legal scuttle: ${card.name} with ${this.selected.name}`);
							// Add point to list of scuttles
							this.validTargets.push(card);
						}
					});
					moves.push("field");
					break;
				case 8:
					// Determine legal scuttles
					this.game.bot.points.forEach(card => {
						if (card.rank < this.selected.rank || (card.rank == this.selected.rank && card.suit <= this.selected.suit) ) {
							console.log(`Found legal scuttle: ${card.name} with ${this.selected.name}`);
							// Add point to list of scuttles
							this.validTargets.push(card);
						}
					});
					moves.push("field");
					break;
				case 10:
					// Determine legal scuttles
					this.game.bot.points.forEach(card => {
						if (card.rank < this.selected.rank || (card.rank == this.selected.rank && card.suit <= this.selected.suit) ) {
							console.log(`Found legal scuttle: ${card.name} with ${this.selected.name}`);
							// Add point to list of scuttles
							this.validTargets.push(card);
						}
					});
					moves.push("field");
					break;
				case 11:
					if (this.game.bot.numQueens < 1) {
						this.game.bot.points.forEach(card => {
							this.validTargets.push(card);
						});
					} 
					break;
				case 12:
				case 13:	
					break;
			}
		}
		return moves;
	}

	// Current game is the last in the history
	get game() {
		return this.history[this.history.length - 1];
	}

	update(game: Game) {
		this.history.push(game);
	} 

	undo() {
		if (this.history.length > 1) {
			this.history.pop();
		} else {
			alert("We are back at the beginning of the game! Try making a move");
		}
	}

	constructor() {
		this.history = new Array<Game>();
		this.validTargets = new Array<Card>();
		this.history.push(game);
		this.selIndex = null;
		this.selected = null;
		this.botBrain = new Bot();
	}
}