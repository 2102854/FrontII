export interface Estado {
    estado_id?: number,
    pais_id: number,
    nome: string, 
    sigla: string
}

export interface EstadoFull {
    estado_id?: number,
    pais_id: number,
    nome: string, 
    sigla: string,
    pais_nome: string
}