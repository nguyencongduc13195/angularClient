import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';

@Component({
	selector: 'app-function',
	templateUrl: './function.component.html',
	styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit, OnChanges {

	constructor() { }
	@Output('sort') sort = new EventEmitter<any>();
	@Output('element') element = new EventEmitter<any>();
	@Output('filter') filter = new EventEmitter<any>();
	@Input('reset') reset;
	ngOnInit() {
	}
	ngOnChanges(){
		// console.log(this.reset);
	}
	selectSort(value){
		this.sort.emit(value);
	}
	selectElement(value){
		this.element.emit(value);
	}
	public filterName: string;
	onFilter(){
		this.filter.emit(this.filterName);
	}

	// 
	currentMoney: number = 0;
	onChangePrice(event){
		this.currentMoney = event.target.value;
	}
}
