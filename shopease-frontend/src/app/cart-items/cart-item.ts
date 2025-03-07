export class CartItem {
    id: number;
    quantity: number;
    productId: number;
  
    constructor(id: number, quantity: number, productId: number) {
      this.id = id;
      this.quantity = quantity;
      this.productId = productId;
    }
  }