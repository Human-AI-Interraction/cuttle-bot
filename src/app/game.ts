import { Card } from './card';
import { Player } from './player';

export class Game {
	players: Player[];
	deck: Card[];
	turn: number;
	// Shuffles deck
	shuffle() {
		for (let i=this.deck.length - 1; i> 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
		}
	}

	constructor() {
		this.deck = new Array<Card>();
		this.players = new Array<Player>();
		this.players.push(new Player(true)); //Bot goes first
		this.players.push(new Player(false)); //Human player second
		this.turn = 0;

		// Create deck
		for (let suit=0; suit<4; suit++) {
			for (let rank=0; rank<14; rank++) {
				this.deck.push(new Card(suit, rank));
			}
		}
		this.shuffle(); // Shuffle deck

		// Deal
		this.players[1].hand.push(this.deck.shift()); //Extra card to player
		// Player gets 6, Bot gets 5 and goes first
		for (let i=0; i<5; i++) {
			this.players[0].hand.push(this.deck.shift());
			this.players[1].hand.push(this.deck.shift());
		}
	}
}