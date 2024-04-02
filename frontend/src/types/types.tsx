export interface Team {
    id: number;
    name: string;
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
    teams: Team[]; // Use the Team interface here
}
