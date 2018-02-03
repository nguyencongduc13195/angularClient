import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'summary'
})
export class SummaryPipe implements PipeTransform {

	transform(value: any, end: number = 20): any {
		if(value.length>30){
			return `${value.slice(0,end)} ...`;
		}else{
			return value;
		}
	}

}
