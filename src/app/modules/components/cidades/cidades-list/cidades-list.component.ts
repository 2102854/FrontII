import { Component, Input , AfterViewInit, ViewChild,OnInit } from '@angular/core';
import { Cidade } from './../cidades.model';
import { CidadesService } from "./../cidades.service";
import { Pais } from '../../paises/paises.model';
import { PaisesService } from '../../paises/paises.service';
import { Estado } from '../../estados/estados.model';
import { EstadosService } from '../../estados/estados.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-cidades-list',
    templateUrl: './cidades-list.component.html',
    styleUrls: ['./cidades-list.component.css'],
    providers: [MessageService]
})

export class CidadesListComponent implements OnInit {

    paises: Pais[];
    estados: Estado[];
    cidades: Cidade[];

    get_pais_name(id: number): string {
        let nomePais: string = null;        
        for (let i = 0; i < this.paises.length; i++) {            
            const key = Number(this.paises[i]['pais_id']);
            nomePais = this.paises[i]['nome'];            
            if (key === id) break
         }
        return nomePais
    }

    get_estado_name(id: number): string {
        let nomeEstado: string = null;        
        for (let i = 0; i < this.estados.length; i++) {            
            const key = Number(this.estados[i]['estado_id']);
            nomeEstado = this.estados[i]['nome'];            
            if (key === id) break
         }
        return nomeEstado
    }    

    constructor(private paisesService: PaisesService, private estadosService: EstadosService, private cidadesService: CidadesService, private messageService: MessageService ) { 
        
        this.paisesService.read().subscribe(paises => {
            this.paises = paises;          
        });

        this.estadosService.read().subscribe(estados => {
            this.estados = estados;          
        });


        setTimeout(() => {
            this.cidadesService.read().subscribe({
                next: (cidades) => {
                    console.log(cidades)
                    this.cidades = cidades;
                },
                error: (e) => {
                    console.log('aqui deu erro')
                    console.log(e.error['message'])
                    this.messageService.add({ severity: 'error', summary: 'Erro ', detail: 'erro' });
                }
                        
            });  
        },300)
      
    }

    ngOnInit(): void {
        
    }  
}