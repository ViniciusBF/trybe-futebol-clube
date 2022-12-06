export interface IMatchid extends IMatchBody {
  id: number,
  inProgress: boolean,
}

export interface IMatch {
  homeTeamGoals: number,
  awayTeamGoals: number,
}

export interface IMatchBody extends IMatch {
  homeTeam: number,
  awayTeam: number,
}

export interface IMatchReturn extends IMatchid {
  teamHome: {
    teamName: string,
  }
  teamAway: {
    teamName: string,
  }
}
