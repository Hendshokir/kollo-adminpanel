import { Component, OnInit, OnChanges } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  checkUser = false;
constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/']);
  }
}
