export interface Player {
    name: string;
}

export interface Team {
    id: number;
    name: string;
    wins: number;
    loses: number;
    ties: number;
    games_played: number;
    players: Player[]
}

export interface League {
    id: number;
    title: string;
    content: string;
    max_teams: number;
    location: string;
    game_time: string;
    league_start_date: Date;
    game_day: string;
    teams: Team[];
}
