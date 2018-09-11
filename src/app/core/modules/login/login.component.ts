import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showLoader = false;
  user = { 'phone': '', 'password': '' };
  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  DoLogin(): void {
    this.showLoader = true;
    console.log('show loader');
    this.authService.login(this.user).subscribe(
      data => {
        console.log(data);
        this.authService.setUser(data);
        this.router.navigate(['/']);
      }
    );
    console.log('hideloader');

  }

}
