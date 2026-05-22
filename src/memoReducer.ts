export interface Memo {
  id: number
  text: string
  createdAt: string
}

type MemoAction =
  | { type: "ADD"; payload: Memo }
  | { type: "DELETE"; payload: number }

export function memoReducer(state: Memo[], action: MemoAction): Memo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload]
    case "DELETE":
      return state.filter((m) => m.id !== action.payload)
    default:
      return state
  }
}