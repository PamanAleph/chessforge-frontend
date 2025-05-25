export type Move = {
    id: number
    gameId: string
    moveNumber: number
    color: 'white' | 'black'
    from: string
    to: string
    san: string
    fen: string
    createdAt: string
  }
  