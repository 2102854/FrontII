import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vlibras',
  templateUrl: './vlibras.component.html',
  styleUrls: ['./vlibras.component.css']
})
export class VLibrasComponent implements OnInit {
  private widgetSrc = 'https://vlibras.gov.br/app';
  private scriptSrc = 'https://vlibras.gov.br/app/vlibras-plugin.js';

  constructor() { 
  }

  init() {
    setTimeout(() => {
    const script = document.createElement('script');
    script.src = this.scriptSrc;
    script.async = true;
    script.onload = () => {
      // @ts-ignore
      new window.VLibras.Widget(this.widgetSrc);
    };
    document.head.appendChild(script);
    }, 1000)	
  }

  ngOnInit() {
    this.init();
  }
}