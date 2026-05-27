export interface Memo {
  id: number
  text: string
  createdAt: string
  tags: string[]
}

type MemoAction =
  | { type: "ADD"; payload: Memo }
  | { type: "DELETE"; payload: number }
  | { type: "ADD_TAG"; payload: {id: number; tag: string }}

export function memoReducer(state: Memo[], action: MemoAction): Memo[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload]
    case "DELETE":
      return state.filter((m) => m.id !== action.payload)
    case "ADD_TAG":
      return state.map((m) =>
        m.id === action.payload.id
          ? { ...m, tags: [...m.tags, action.payload.tag] }
          : m
      )
    default:
      return state
  }
}