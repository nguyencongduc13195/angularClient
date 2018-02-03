import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-function',
	templateUrl: './function.component.html',
	styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

	constructor() { }
	@Output('sort') sort = new EventEmitter<any>();
	@Output('element') element = new EventEmitter<any>();
	@Output('filter') filter = new EventEmitter<any>();
	ngOnInit() {
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
}
