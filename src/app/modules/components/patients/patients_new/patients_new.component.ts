
import { Patients } from './../patients.model';
import { PatientsService } from './../patients.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { Cidade } from '../../cidades/cidades.model';
import { CidadesService } from "../../cidades/cidades.service";
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';


@Component({
    selector: 'app-patients-create',
    templateUrl: './patients_new.component.html',
    styleUrls: ['./patients_new.component.css'],
    providers: [MessageService]
})

export class PatientsNewComponent implements OnInit {
    cidade: Cidade[] = [];
    selectedCidade: Cidade | undefined; 

    formGroup: FormGroup | undefined;    
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    paciente: Patients = {
        paciente_id: null,
        cidade_id: null,
        nome: "",
        data_nasc: null,
        tel_1: null,
        tel_2: null,
        logradouro: "",
        numero: "",
        complemento: "",
        cep: "",
        hygia: "",
        data_cadastro: null
    }
        
    constructor( 
        private config: PrimeNGConfig, private cidadesService: CidadesService,private loginService: LoginService, 
        private patientsService: PatientsService, private router: Router, public messageService: MessageService) 
    {
        setTimeout(() => {
            this.loginService.validateSession()
             if (!this.loginService.sessionIsValid){
                this.messageService.add({ severity: 'error', summary: 'Sessão encerrada', detail: 'Deslogado por inatividade' });
                this.router.navigate(['/auth/login'])
            }
        }, 500)		
    }

    ngOnInit(): void {
        this.config.setTranslation({
            monthNames: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
            monthNamesShort: ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez'],
            today: 'hoje',
            clear: 'limpar',
            dayNamesMin: ['Dom','Seg','Ter','Qua','Qui','Sex','Sab'],
            dayNames: ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
        });      

        this.cidadesService.read().subscribe(cidade => {
            this.cidade = cidade   
        });

        this.formGroup = new FormGroup({
            selectedCidade: new FormControl<object | null>(null)
        });

        // Componente Breadcrumb
        this.items = [{ label: 'Pacientes', routerLink: '/app/pacientes' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {

        this.paciente.nome = this.paciente.nome.toUpperCase().trim();
        this.paciente.cidade_id = this.selectedCidade.cidade_id;
        this.paciente.data_nasc = this.paciente.data_nasc;
        this.paciente.tel_1 = this.paciente.tel_1;
        this.paciente.tel_2 = this.paciente.tel_2;
        this.paciente.logradouro = this.paciente.logradouro.toUpperCase().trim();
        this.paciente.numero = this.paciente.numero.toUpperCase().trim();
        this.paciente.complemento = this.paciente.complemento.toUpperCase().trim();
        this.paciente.cep = this.paciente.cep.toUpperCase().trim();
        this.paciente.hygia = this.paciente.hygia.toUpperCase().trim();
        this.paciente.data_cadastro = this.paciente.data_cadastro;


        this.patientsService.create(this.paciente).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/pacientes'])
                }, 2500)                                
            },
            complete: () => {},
            error: (e) => { 
                if (e.error['message err'] !== undefined) {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: e.error['message err'] });
                } else {
                    this.messageService.add({key: 'tst', severity: 'error', summary: 'ATENÇÃO', detail: 'Não foi possível executar a ação.' });
                }
                
            }	
        })
    }
    
    cancel(): void {       
        this.router.navigate(['/app/pacientes'])
    }
    

}