import { Component, OnInit } from '@angular/core';
import { PatientsFull } from './../patients.model';
import { PatientsService } from "./../patients.service";
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.css'],
    providers: [MessageService]
})

export class PatientsListComponent implements OnInit {

    patientsFull: PatientsFull[];  

    constructor(private patientsService: PatientsService, private messageService: MessageService ) { 
        
        setTimeout(() => {
            this.patientsService.read().subscribe({
                next: (patientsFull) => {
                    this.patientsFull = patientsFull;
                },
                error: (e) => {
                    this.messageService.add({ severity: 'error', summary: 'Erro ', detail: 'erro' });
                }                        
            });  
        },200)      
    }

    ngOnInit(): void {} 
    
    customSort(event: SortEvent) {
        event.data.sort((data1, data2) => {
            let value1 = data1[event.field];
            let value2 = data2[event.field];
            let result = null;

            if (value1 == null && value2 != null) result = -1;
            else if (value1 != null && value2 == null) result = 1;
            else if (value1 == null && value2 == null) result = 0;
            else if (typeof value1 === 'string' && typeof value2 === 'string') result = value1.localeCompare(value2);
            else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

            return event.order * result;
        });
    }     
}