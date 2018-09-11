import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ShopsService } from '../../services/shops.service';
import { OffersService } from '../../services/offers.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit {
  usersCount: Number;
  productsCount: Number;
  offersCount: Number;
  orderOffersCount: Number;
  orderAll: Number;
  orderPindding: Number;
  orderAccepted: Number;
  orderRejected: Number;
  orderOnTheWay: Number;
  orderDone: Number;
  orderCancle: Number;
  constructor(private usersService: UsersService, private shopsService: ShopsService, private offersService: OffersService) { }

  ngOnInit() {
    // fetch users count
    this.usersService.getUsersCount()
    .subscribe(
      (users: any) => {
        // console.log(users);
        this.usersCount = users['count'];
      },
      (error) => console.log(error)
    );

    // fetch products count
    this.shopsService.getProductsCount()
    .subscribe(
      (products: any) => {
        // console.log(products);
        this.productsCount = products['count'];
      },
      (error) => console.log(error)
    );

    // fetch offers count
    this.offersService.getOffersCount()
    .subscribe(
      (offers: any) => {
        // console.log(users);
        this.offersCount = offers['count'];
      },
      (error) => console.log(error)
    );

    // fetch order offers count
    this.shopsService.getOrderOffersCount()
    .subscribe(
      (orderOffers: any) => {
        // console.log(users);
        this.orderOffersCount = orderOffers['count'];
      },
      (error) => console.log(error)
    );

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
  }


}
