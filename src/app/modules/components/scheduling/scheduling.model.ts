import { Patients } from "../patients/patients.model";
import { Veiculos } from "../veiculos/veiculos.model";
import { Motorista } from "../motoristas/motoristas.model";
import { Hospital } from "../hospitals/hospitals.model";
import { Tipo_Doenca } from "../tipo_doenca/tipo_doenca.model";
import { Tipo_Remocao } from "../tipo_remocao/tipo_remocao.model";
import { Tipo_Encaminhamento } from "../tipo_encaminhamento/tipo_encaminhamento.model";

export interface data_form {
    patients: Patients,
    veiculos: Veiculos,
    motorista: Motorista,
    hospital: Hospital,
    tipo_Doenca: Tipo_Doenca,
    tipo_Remocao: Tipo_Remocao,
    tipo_Encaminhamento: Tipo_Encaminhamento
}

export interface Scheduling {
    agendamento_id?: number,
    paciente_id: number,
    tipo_encaminhamento_id: number,
    tipo_doenca_id: number,
    tipo_remocao_id: number,
    hospital_id: number,
    veiculo_id: number,
    motorista_id: number,
    responsavel_pac: string,
    data_remocao: Date,
    saida_prevista: Date,
    observacao: string,
    custo_ifd: number,
    custo_estadia: number,
    estado_geral_paciente: string,
}

export interface SchedulingFull {
    agendamento_id?: number,
    nome: string,
    hygia: string,
    tel_1: string,
    data_nascimento: Date,
    data_remocao: Date,
    saida_prevista: Date,
    hospital: string,
    tipo_encaminhamento: string,
    tipo_doenca: string,
    tipo_remocao: string,
    veiculo_modelo: string,
    veiculo_placa: string,
    veiculo_capacidade: string,
    veiculo_media_consumo: string,
    usuario: string,
    motorista: string,
    responsavel_pac: string,
    estado_geral_paciente: string,
    observacao: string,
    custo_ifd: number,
    custo_estadia: number
}