import { Component, OnInit } from '@angular/core';

////* init home js
declare function homeInit([]): any;
declare var $: any;

@Component({
  selector: 'home-home-page',
  templateUrl: './home-page.component.html',
  styles: [],
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    setTimeout(() => {
      homeInit($);
    }, 50);
  }
}
