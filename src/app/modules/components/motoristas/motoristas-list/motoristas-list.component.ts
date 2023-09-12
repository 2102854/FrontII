import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Motorista } from './../motoristas.model';
import { MotoristasService } from "./../motoristas.service";

import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-motoristas-list',
    templateUrl: './motoristas-list.component.html',
    styleUrls: ['./motoristas-list.component.css'],
    providers: [MessageService]
})

export class MotoristasListComponent implements OnInit {

    motoristas: Motorista[];
    constructor(private motoristasService: MotoristasService, private messageService: MessageService ) { 
        setTimeout(() => {
            this.motoristasService.read().subscribe({
                next: (motoristas) => {
                    this.motoristas = motoristas;
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