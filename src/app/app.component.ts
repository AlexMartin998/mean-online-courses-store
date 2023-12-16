import { Component, OnInit } from '@angular/core';

////* init home js
declare function homeInit([]): any;
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'online-courses';

  ngOnInit(): void {
    setTimeout(() => {
      homeInit($);
    }, 50);
  }
}
