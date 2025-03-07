export class Order {
    id: number;
    code: string;
    sentDate: Date;
    totalCost: number;
  
    constructor(id: number, code: string, sentDate: Date, totalCost: number) {
      this.id = id;
      this.code = code;
      this.sentDate = sentDate;
      this.totalCost = totalCost;
    }
  }
  