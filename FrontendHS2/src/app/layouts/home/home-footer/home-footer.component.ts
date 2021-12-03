import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-footer',
  templateUrl: './home-footer.component.html',
  styleUrls: ['./home-footer.component.scss']
})
export class HomeFooterComponent implements OnInit {

  test : Date = new Date();

  constructor(private router: Router ) {}

  ngOnInit() {

  }
  getPath(){
    return this.router.url;
  }
}
