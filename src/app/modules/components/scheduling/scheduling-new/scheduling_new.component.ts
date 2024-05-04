
import { Scheduling } from './../scheduling.model';
import { SchedulingService } from './../scheduling.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../auth/login.service';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { CidadesService } from "../../cidades/cidades.service";
import { Tipo_Encaminhamento } from "../../tipo_encaminhamento/tipo_encaminhamento.model";
import { Tipo_EncaminhamentoService } from "../../tipo_encaminhamento/tipo_encaminhamento.service"
import { Tipo_Doenca } from "../../tipo_doenca/tipo_doenca.model";
import { Tipo_Remocao } from "../../tipo_remocao/tipo_remocao.model";
import { Tipo_RemocaoService } from "../../tipo_remocao/tipo_remocao.service";
import { Tipo_DoencaService } from "../../tipo_doenca/tipo_doenca.service";
import { Patients } from "../../patients/patients.model";
import { PatientsService} from "../../patients/patients.service";
import { Hospital } from "../../hospitals/hospitals.model";
import { HospitalsService } from "../../hospitals/hospitals.service";
import { Veiculos } from "../../veiculos/veiculos.model";
import { VeiculosService } from "../../veiculos/veiculos.service";
import { Motoristas } from "../../motoristas/motoristas.model";
import { MotoristasService} from "../../motoristas/motoristas.service";
import { FormControl, FormGroup } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';

@Component({
    selector: 'app-patients-create',
    templateUrl: './scheduling_new.component.html',
    styleUrls: ['./scheduling_new.component.css'],
    providers: [MessageService]
})

export class SchedulingNewComponent implements OnInit {
    
    patients: Patients [] = [];
    selectedPatients: Patients | undefined; 

    hospital: Hospital[] = [];
    selectedHospital: Hospital | undefined; 

    tipo_Encaminhamento: Tipo_Encaminhamento [] = [];
    selectedTipoEncaminhamento: Tipo_Encaminhamento | undefined;

    tipo_Doenca: Tipo_Doenca[] = [];
    selectedTipoDoenca: Tipo_Doenca | undefined;

    tipo_Remocao: Tipo_Remocao[] = [];
    selectedTipoRemocao: Tipo_Remocao | undefined;

    motorista: Motoristas[] = []; 
    selectedMotorista: Motoristas | undefined;
    
    veiculos: Veiculos[] = []; 
    selectedVeiculos: Veiculos | undefined;

    observacao!: string;
    ifd: number = 0;
    estadia: number = 0;

    formGroup: FormGroup | undefined;
    
    //Breadcrumb
    items: MenuItem[] | undefined;
    home: MenuItem | undefined;

    //Objeto principal do form
    scheduling: Scheduling = {
        agendamento_id: null,
        paciente_id: null,
        tipo_encaminhamento_id: null,
        tipo_doenca_id: null,
        tipo_remocao_id: null,
        hospital_id: null,
        veiculo_id: null,
        motorista_id: null,
        responsavel_pac: null,
        data_remocao: null,
        saida_prevista: null,
        observacao: null,
        custo_ifd: null,
        custo_estadia: null,
        estado_geral_paciente: null,        
    }
        
    constructor( 
        private config: PrimeNGConfig, private loginService: LoginService, 
        private schedulingService: SchedulingService, private router: Router, private messageService: MessageService
    ) 
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

        this.schedulingService.get_data_form().subscribe(data_form => {
            this.hospital = data_form['hospital'];
            this.patients = data_form['paciente'];
            this.motorista = data_form['motorista'];
            this.tipo_Doenca = data_form['tipoDoenca'];
            this.tipo_Encaminhamento = data_form['tipo_encaminhamento'];
            this.tipo_Remocao = data_form['tipo_remocao'];
            this.veiculos = data_form['veiculo'];            
        });

        this.formGroup = new FormGroup({
            selectedVeiculos: new FormControl<object | null>(null),
            selectedPatients: new FormControl<object | null>(null),
            selectedHospital: new FormControl<object | null>(null),
            selectedTipoEncaminhamento: new FormControl<object | null>(null),
            selectedTipoDoenca: new FormControl<object | null>(null),
            selectedTipoRemocao: new FormControl<object | null>(null),
            selectedMotorista: new FormControl<object | null>(null)
        });

        // Componente Breadcrumb
        this.items = [{ label: 'Agendamentos', routerLink: '/app/agendamento' }, { label: 'Novo Registro' }];
        this.home = { icon: 'pi pi-home', routerLink: '/app/dashboard' };
    }
    
    create(): void {
        this.scheduling.paciente_id = Number(this.selectedPatients.paciente_id);
        this.scheduling.tipo_encaminhamento_id = Number(this.selectedTipoEncaminhamento.tipo_encaminhamento_id);
        this.scheduling.tipo_doenca_id = Number(this.selectedTipoDoenca.tipo_doenca_id);
        this.scheduling.tipo_remocao_id = Number(this.selectedTipoRemocao.tipo_remocao_id);
        this.scheduling.hospital_id = Number(this.selectedHospital.hospital_id);
        this.scheduling.veiculo_id = Number(this.selectedVeiculos.veiculo_id);
        this.scheduling.motorista_id = Number(this.selectedMotorista.motorista_id);
        this.scheduling.responsavel_pac = this.scheduling.responsavel_pac.toUpperCase().trim();
        this.scheduling.estado_geral_paciente = this.scheduling.estado_geral_paciente.toUpperCase().trim();
        this.scheduling.observacao = this.observacao.toUpperCase();
        this.scheduling.custo_ifd = this.ifd;
        this.scheduling.custo_estadia = this.estadia;

        console.log(this.scheduling);
        this.schedulingService.create(this.scheduling).subscribe({
            next: () => {
                this.messageService.add({key: 'tst', severity: 'success', summary: 'SUCESSO', detail: 'Registro gravado com sucesso!' });
                setTimeout(() => {
                    this.router.navigate(['/app/agendamento'])
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
        this.router.navigate(['/app/agendamento'])
    }
    

}