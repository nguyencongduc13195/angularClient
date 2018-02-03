class Order{
	// constructor(
	// 	public name: string,
	// public address: string,
	// public phone: string,
	// public note: string,
	// public paymentOption: string,
	// public orderItems: OrderItem[]
	// ){

	// }
	public name: string;
	public address: string;
	public phone: string;
	public note: string;
	public paymentOption: string;
	public total: number;
	public confirm: boolean;
	public orderItems: OrderItem[]
}

class OrderItem{
	constructor(
		public slug: string,
		public quantity: number
		)
	{

	}
	
}

export {Order, OrderItem}