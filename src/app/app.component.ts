import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //": Entry [] -> Typescript, dass der Array Elemente dieses Models enhält"
  constructor(private authService: AuthService){}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
