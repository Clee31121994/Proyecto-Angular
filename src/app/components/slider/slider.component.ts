import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import jQuery from 'jquery';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.css'
})
export class SliderComponent implements OnInit{

  @Input() anchura: number = 0;
  @Input('etiquetas') captions: boolean = false;
  @Output() conseguirAutor = new EventEmitter();

  public autor: any;

  constructor() {

    this.autor = {
      nombre: "Cristian Lee",
      linkedin: "linkedin.com/in/cristian-lee-1a28ba206",
      facebook: "Cristian Lee"
    };

  };

  ngOnInit(): void {
        // Verificamos si window y document están disponibles
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          // Ejecutamos el código de jQuery
          jQuery("#logo").click(function (e) {
            jQuery("header")
              .css("background", "green")
              .css("height", "50px");
          });
    
          ($('.galeria') as any).bxSlider({
              mode: 'fade',
              captions: this.captions,
              slideWidth: this.anchura
            });
          }      

  }

  lanzar(event: any){
    this.conseguirAutor.emit(this.autor);
  }

}
