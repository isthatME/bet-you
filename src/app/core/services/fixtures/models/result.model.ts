import { PredictFixtureResponse } from "../../prediction/models/fixture-predict-response.interface";

export interface Result {
    campeonato: Cameponato;
    data_realizacao: string;
    data_realizacao_iso: string;
    estadio: Estadio
    hora_realizacao: string;
    partida_id: number;
    placar: string;
    placar_mandante: number;
    placar_visitante: number;
    slug: string;
    status: string;
    time_mandante: Team;
    time_visitante: Team;
    number_of_votes: number | null;
    statisticsData: PredictFixtureResponse;
}
interface Cameponato {
    campeonato_id: string;
    nome: string;
    slug: string
}
interface Estadio {
    estadio_id: number;
    nome_popular: string;
}
interface Team {
    escudo: string;
    nome_popular: string;
    sigla: string;
    time_id: number;
}