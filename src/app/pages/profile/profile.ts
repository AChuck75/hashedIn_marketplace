import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  username = '';
  email = 'chakraborty75@gmail.com';


  ngOnInit() {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.username = localStorage.getItem('username') || '';
      
      
    }
  }

  

}
