export interface Player {
    id: number;
    name: string;
}

export interface Team {
    id: number;
    name: string;
    wins: number;
    loses: number;
    ties: number;
    games_played: number;
    players: Player[];
    associated_league?: number;
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
    participating_teams: Team[];
}
