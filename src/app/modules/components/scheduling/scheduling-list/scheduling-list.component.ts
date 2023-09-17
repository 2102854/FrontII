import { Component, OnInit } from '@angular/core';
import { SchedulingFull } from './../scheduling.model';
import { SchedulingService } from "./../scheduling.service";
import { MessageService } from 'primeng/api';
import { SortEvent } from 'primeng/api';

@Component({
    selector: 'app-scheduling-list',
    templateUrl: './scheduling-list.component.html',
    styleUrls: ['./scheduling-list.component.css'],
    providers: [MessageService]
})

export class SchedulingListComponent implements OnInit {

    schedulingFull: SchedulingFull[];  

    constructor(private schedulingService: SchedulingService, private messageService: MessageService ) { 
        
        setTimeout(() => {
            this.schedulingService.read().subscribe({
                next: (schedulingFull) => {
                    this.schedulingFull = schedulingFull;
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