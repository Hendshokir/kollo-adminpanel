import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { OffersService } from '../../services/offers.service';
@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.less']
})
export class UserDetailsComponent implements OnInit {
  users;
  usersOrders;
  UserOrdersProducts;
  orderStatus;
  User = {
    poients: Number,
    img: String,
    creationDate: String,
    _id: String,
    name: String,
    phone: String,
    email: String,
    password: String,
    __v: Number,
  };

  constructor(private http: HttpClient, private route: ActivatedRoute,
    private usersService: UsersService, private offersService: OffersService) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.usersService.userDetails(id).subscribe((data) => {
          this.users = data;
          console.log(data);
        });
      }
    );

    this.route.params.subscribe(
      (params) => {
        // console.log(params); // log the entire params object
        // console.log(params['id']); // log the value of id
        const id = params['id'];
        this.usersService.userOfferOrders(id).subscribe((data) => {
          this.usersOrders = data;
          console.log(data);
        });
      }
    );

    this.route.params.subscribe(
      (params) => {
        const id = params['id'];
        this.usersService.userOrders(id).subscribe((data) => {
          this.UserOrdersProducts = data;
          console.log(data);
        });
      }
    );
  }

  updatePoint() {
    $('.input-point').focus();

    this.usersService.updateUserPoints(this.users).subscribe(
      user => {
        console.log(this.users.poients);
      }
    );
  }

  updateStatus(status) {
    console.log(status);
    this.orderStatus = status;
    console.log(this.orderStatus);
  }
}
