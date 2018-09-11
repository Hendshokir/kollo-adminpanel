import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { AuthService } from '../../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit {
  users = [];
  User: {
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
  usersCount: Number;

  constructor(private http: HttpClient, private usersService: UsersService) {}


  ngOnInit() {
    // fetch all user
    this.usersService.getUsers()
    .subscribe(
      (users: any) => {
        // console.log(users);
        this.users = users;
      },
      (error) => console.log(error)
    );

    // fetch users count
    this.usersService.getUsersCount()
    .subscribe(
      (users: any) => {
        // console.log(users);
        this.usersCount = users['count'];
      },
      (error) => console.log(error)
    );
  }
}
