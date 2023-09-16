export interface Patients {
    paciente_id?: number,
    cidade_id: number,
    nome: string, 
    data_nasc: Date,
    tel_1: number,
    tel_2: number,
    logradouro: string,
    numero: string, 
    complemento: string,
    cep: string,
    hygia: string,
    data_cadastro: Date
}

export interface PatientsFull {
    paciente_id?: number,
    cidade_id: number,
    cidade_nome: string,
    nome: string, 
    data_nasc: Date,
    tel_1: number,
    tel_2: number,
    logradouro: string,
    numero: string,
    complemento: string,
    cep: string,
    hygia: string,
    data_cadastro: Date
}