import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { AlertService } from './../../../shared/services/alert.service';
import { Observable } from 'rxjs/Observable';
@Component({
	selector: 'app-alert',
	templateUrl: './alert.component.html',
	styleUrls: ['./alert.component.css'],
	animations: [
		trigger('alert', [
			state('hidden', style({
				opacity: 0,
				bottom: '0px'
			})),
			state('visible', style({
				opacity: 1,
				bottom: '30px'
			})),
			transition('hidden=>visible', animate('500ms 0s ease-in')),
			transition('visible=>hidden', animate('500ms 0s ease-out'))
		])
	]
})
export class AlertComponent implements OnInit {

	constructor(private _alertService: AlertService) { }
	public message: string = '';
	public alert: string = 'hidden';
	ngOnInit() {
		this._alertService.connector.subscribe((msg)=>{
			this.message = msg;
			this.alert = 'visible';
			setTimeout(()=>{
				this.alert = 'hidden';	
			},1000);
		});
	}

}
