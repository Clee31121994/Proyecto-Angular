import { Component, OnInit, ViewChild, ElementRef, Inject, AfterViewInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, AfterViewInit {
  public widthSlider: number = 0;
  public anchuraToSlider: any;
  public captions: boolean;
  public autor: any;

  @ViewChild('textos', { static: true }) textos!: ElementRef;

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.captions = false;
  }

  ngOnInit(): void {
    // No se accede al elemento aquí
  }

  ngAfterViewInit(): void {
    console.log('ContactComponent ngAfterViewInit');
    if (this.textos) {
      //alert(this.textos.nativeElement.textContent);
    } else {
      console.error('El elemento con #textos no fue encontrado.');
    }
  }

  cargarSlider() {
    this.anchuraToSlider = this.widthSlider;
  }

  resetearSlider() {
    this.anchuraToSlider = false;
  }

  getAutor(event: any) {
    this.autor = event;
  }
}