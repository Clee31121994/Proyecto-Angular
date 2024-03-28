import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit{
  public title: string;
  public subtitle: string;
  public web: string;

  constructor(){
    this.title = "Cristian Lee";
    this.subtitle = "Desarrollador y programador web";
    this.web = "udemy.com";
  }

  ngOnInit(): void {
    
  }

}
