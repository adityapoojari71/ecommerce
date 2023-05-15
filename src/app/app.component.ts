import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ecommerce';
  productInformation :any =[];
  cartProduct:any =[];
  productView : boolean = true;
  cartView : boolean = false ;
  totalPayAmount =0;
  selectedProduct:any;
  viewPage:boolean = false;
  constructor(private httpClient:HttpClient,){

  }

  ngOnInit(){
   this.getProduct();
  }

  //method to get product information
  async getProduct(){
    var restAPI:any="https://fakestoreapi.com/products";
    this.productInformation = await this.httpClient.get(restAPI).toPromise().then();

    // this.productInformation.map((val:any) =>{
    //   val['totalPrice'] = 0;
    // })
    console.log(this.productInformation)
  }
  //method the add cart
  addCart(data:any){
    this.cartProduct.push(data);
    
    console.log(this.cartProduct)
    const result = Array.from(this.cartProduct.reduce((
        productArray:any, {id, totalPrice,price,count}: any) =>
        productArray.set(id,(productArray.get(id) || 0) +
        price), new Map),
        ([id, totalPrice]) =>
        ({id, totalPrice})
    );

    this.cartProduct.map((val:any) =>{
      for(var i=0;i< result.length;i++){
        if(result[i].id == val.id){
          val['totalPrice'] = result[i].totalPrice;
          val['count'] = 0;
        }
      }
    })

    //method to remove duplicate
    this.cartProduct = this.cartProduct.filter((value :any, index :any, self :any) => {
      return (
        index ===
        self.findIndex((obj:any) => obj.id === value.id && obj.description === value.description)
      );
    });
    // this.productInformation = Object.entries(result);
    console.log(this.cartProduct);

    //calculate totalpay ammount
    this.cartProduct.map((val:any) =>{
      this.totalPayAmount += val.totalPrice;
    })
  }

  //show tab
  showSelectedTab(data:any){
    this.productInformation = [];
    if(data == 'cart'){
      this.cartView = true;
      this.productView = false;
      this.productInformation = this.cartProduct;
    }
    else{
      this.cartView = false;
      this.productView = true;
      this.getProduct();
    }
  }

  //view product
  viewProduct(product:any){
    this.selectedProduct = product;
    console.log(this.selectedProduct);
    this.viewPage = true;
  }

  backHomePage(){
    this.viewPage = false;
  }
}
