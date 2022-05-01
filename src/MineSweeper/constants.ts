export const config = {
    socketUrl: 'wss://hometask.eg1236.com/game1/'
}

export enum COMMANDS {
    WS_OPEN = 'WS_OPEN',
    WS_SEND = 'WS_SEND',
    WS_MESSAGE = 'WS_MESSAGE',
    WS_ERROR = 'WS_ERROR',
    CREATE_GRID = 'CREATE_GRID'
}

export enum STATUS {
    WON = 'won',
    LOSE = 'lose',
    PLAYING = 'playing'
}