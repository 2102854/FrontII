export interface Dashboard {
    total_pacientes?: number,
    pacientes_cadastrados_mes_corrente?: number,
    total_hospitais?: number,
    total_agendamentos?: number,
    total_veiculos?: number,
    ultimos_agendamentos: [],
    agendamentos_ano: [],
    cadastros_ano: []
}

export interface Ultimos_Agendamentos {
    agendamento_id: number,
    nome:string,
    hospital:string,
    data_nascimento: Date,
    data_remocao: Date
}