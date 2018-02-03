export class Product{
	public _id?: string;
	public name: string;
	public slug: string;
	public body: string;
	public description: string;
	public image: string;
	public price: number;
	public promotion_price: number;
	public category: any;
	public brand: any;
	public author: any;
	public writer_name:string;
	public writer_slug:string;
	public hot_flag : boolean;
	public view_count : number;
	public stockitems: number;
	public likes : number;
	public likeBy : Array<any>;
	public dislikes : number;
	public dislikeBy : Array<any>;
}