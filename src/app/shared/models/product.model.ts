export class Product{
	public _id?: string;
	public name: string;
	public slug: string;
	public body: string;
	public description: string;
	public price: number;
	public promotion_price: number;
	public category: any;
	public brand: any;
	public image: any;
	public tag_array: Array<string>;
	public imageDetail: Array<any>;
	public color: Array<string>;
	public size: Array<string>;
	public gender: Array<string>;
	public hot_flag : boolean;
	public view_count : number;
	public stockitems: number;
	public likes : number;
	public likeBy : Array<any>;
	public dislikes : number;
	public dislikeBy : Array<any>;
}