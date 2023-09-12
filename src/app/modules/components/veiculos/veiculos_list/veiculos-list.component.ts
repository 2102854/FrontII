import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Veiculos } from './../veiculos.model';
import { VeiculosService } from "./../veiculos.service";

import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-veiculos-list',
    templateUrl: './veiculos-list.component.html',
    styleUrls: ['./veiculos-list.component.css'],
    providers: [MessageService]
})

export class VeiculosListComponent implements OnInit {

    veiculos: Veiculos[];
    constructor(private veiculosService: VeiculosService, private messageService: MessageService ) { 
        setTimeout(() => {
            this.veiculosService.read().subscribe({
                next: (veiculos) => {
                    this.veiculos = veiculos;
                },
                error: (e) => {
                    console.log(e.error['message'])
                    this.messageService.add({ severity: 'error', summary: 'Erro ', detail: 'erro' });
                }
                        
            });  
        },300)
    }

    ngOnInit(): void {
        
    }  
}