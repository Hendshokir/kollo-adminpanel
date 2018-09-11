import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { ShopsService } from '../../services/shops.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.less']
})
export class OrdersComponent implements OnInit {

  orderAll: Number;
  orderPindding: Number;
  orderAccepted: Number;
  orderRejected: Number;
  orderOnTheWay: Number;
  orderDone: Number;
  orderCancle: Number;
  orders = [];
  orderStatus;
  constructor(private http: HttpClient, private orderService: OrderService, private shopsService: ShopsService) { }

  ngOnInit() {

    // fetch order Statistic count
    this.shopsService.getOrderStatisticCount()
    .subscribe(
      (orderStatistic: any) => {
        // console.log(users);
        this.orderAll = orderStatistic['countAll'];
        this.orderPindding = orderStatistic['Pindding'];
        this.orderAccepted = orderStatistic['Accepted'];
        this.orderRejected = orderStatistic['Rejected'];
        this.orderOnTheWay = orderStatistic['OnTheWay'];
        this.orderDone = orderStatistic['Done'];
        this.orderCancle = orderStatistic['Cancle'];
      },
      (error) => console.log(error)
    );

    // fetch all Orders
    this.orderService.getOrders()
    .subscribe(
      (orders: any) => {
        console.log(orders);
        this.orders = orders;
      },
      (error) => console.log(error)
    );
  }

  updateStatus(status) {
    console.log(status);
    this.orderStatus = status;
    console.log(this.orderStatus);
  }

}
