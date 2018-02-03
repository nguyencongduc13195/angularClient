import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'app-rating',
	templateUrl: './rating.component.html',
	styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit, OnChanges {

	constructor() { }
	@Input('rated') rated;
	ngOnInit() {
	}
	ngOnChanges(){
		if(this.rated == 0){
			this.rate = 0;
		}
	}
	@Output('rating') connector = new EventEmitter<number>();
	public stars : number[] = [1,2,3,4,5];
	public rate: number = 0;
	public previousRate: number = 0;
	setRate(star: number){
		if(this.previousRate === undefined){
			this.previousRate = this.rate;
		}
		this.rate = star;
	}
	clearRate(){
		if(this.previousRate !== undefined){
			this.rate = this.previousRate;
			this.previousRate = undefined;
		}
	}
	onRate(star: number){
		this.rate = star;
		this.previousRate = undefined;
		this.connector.emit(this.rate);
	}
}
