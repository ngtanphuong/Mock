import { Component } from '@angular/core';
import { Router  } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Film Management';

  constructor(private router: Router) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {

  }

  Logout() {
    localStorage.removeItem('My-Token');
    localStorage.clear();
    this.router.navigateByUrl('login');
  }
}

