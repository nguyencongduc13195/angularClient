import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AlertService {
	public connector = new EventEmitter<string>();
	constructor() { }
	public alert(message: string){
		this.connector.emit(message);
	}
}
