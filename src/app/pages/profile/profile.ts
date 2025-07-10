import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  username = '';
  email = '';


  ngOnInit() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      console.log(JSON.parse(sessionStorage.getItem('user')!))
      this.username = JSON.parse(sessionStorage.getItem('user')!).name;

      // Example: Get username from session storage instead of local storage
      this.email = JSON.parse(sessionStorage.getItem('user')!).email;
    }
  }

  

}
