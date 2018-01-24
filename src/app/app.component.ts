import { Component,OnInit,ViewChild,EventEmitter,Injectable,OnDestroy } from '@angular/core';
import {BFCServices} from './Services/BFCServices';
// import {Popup} from 'ng2-opd-popup';
import {UserRegistrationComponent} from './userReg/user-registration/user-registration.component';
import {UserProfileComponent} from './userReg/user-profile/user-profile.component';
import {lodash} from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit,OnDestroy {

menuListCollection=[];
heightValue =""+window.innerHeight+"px";
showOrderSummary="none";
shoppingCart=[];
orderModel:any;
subTotalAmount:number;
taxAmount:number;
totalAmount:number;
userReg:UserRegistrationComponent;
uerPRofile:UserProfileComponent;
isUserLoggedin:boolean;
loginUserModel:any;

constructor(private bfcService:BFCServices){

}
// @ViewChild ('popup1') popup1:Popup;

   menuActive = false;

  toggleClass():void{
    this.menuActive = !this.menuActive;
  }

  public handleloginUserDataEmitEvent(loginUserDataEmit:any)
  {
      this.isUserLoggedin = true;
      this.loginUserModel = loginUserDataEmit;
      console.log(this.loginUserModel);
      localStorage.setItem("loginUserModel",JSON.stringify(this.loginUserModel));
      localStorage.setItem("isUserLoggedin",(this.isUserLoggedin).toString());
  }



ngOnInit():void{
  this.getMenuList();

  this.isUserLoggedin = false;
  this.orderModel={
    "userId":0,
    "items":[],
    "subTotal":0,
    "taxAmount":0,
    "totalAmount":0,
    "comments":""
  }

this.loginUserModel={
  "fullname":""
}

if(localStorage.getItem("shouldRemember")=="true"){
  this.isUserLoggedin = true;
  this.loginUserModel = JSON.parse(localStorage.getItem("loginUserModel"));
}

}


ngOnDestroy():void{
  if(localStorage.getItem("shouldRemember")!="true"){
     localStorage.clear();
  }

}


getMenuList():void{
  this.bfcService.makeCommonGetRequest('menuList')
          .subscribe(result => {
            var parsed = result;
          this.menuListCollection = result;
          });
}

logoutApp(event):void{
  localStorage.removeItem("loginUserModel");
  localStorage.removeItem("isUserLoggedin");
  this.isUserLoggedin =false;
  this.loginUserModel={};
}

registerUser():void{
console.log("register User");
}


loginUser():void{
  console.log(" login");
}

makeOrder(item):void{

var orderObj={
  "orderItem":item,
  "quantity":1,
  "amount":parseInt(item.itemPrice)
};

var orderTracker={
  "orderNumber":0
};

var orderIndex = this.precheckOrder(orderObj);
console.log(orderIndex);
if(orderIndex == -1)
{
  this.orderModel.items.push(orderObj);
}else{
  var order = this.orderModel.items[orderIndex];
  order.quantity +=1;
  order.amount = parseInt(order.quantity)* parseInt(order.orderItem.itemPrice);
  this.updateCost();
}

this.showOrderSummary = "block";

this.updateCost();

}


precheckOrder(orderObj):number{
var orderIndex:number = -1;
  for(var index in this.orderModel.items)
  {
    var order = this.orderModel.items[index];
    var orderItem = order.orderItem;
    if(orderObj.orderItem.itemId === orderItem.itemId){
      orderIndex = parseInt(index);
       return orderIndex;
    }
  }
  return orderIndex;
}

calculateCost(item,event):void{
   item.amount=parseInt(event.target.value)* parseInt(item.orderItem.itemPrice);
   this.updateCost();
}

updateCost():void{
  this.totalAmount = 0;
  this.taxAmount = 0;
  this.subTotalAmount = 0;

  for (var object in this.orderModel.items){
    var order = this.orderModel.items[object];
   this.subTotalAmount = this.subTotalAmount+=order.amount
  }
  this.taxAmount = (this.subTotalAmount * 12) / 100;
  this.totalAmount = this.subTotalAmount + this.taxAmount;

}

removeOrderObj(index):void
{
   this.orderModel.items.splice(index,1);

  if(this.orderModel.items.length >=1){
  this.updateCost();
  }else{
    this.showOrderSummary = "none";
  }

}


}
