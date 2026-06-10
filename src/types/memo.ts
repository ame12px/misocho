export interface Memo {
  id: number
  title: string
  text: string
  createdAt: string
  updatedAt: string
  tags: string[]
  starred: boolean
}

type MemoAction =
  | { type: "ADD"; payload: Memo }
  | { type: "DELETE"; payload: number }
  | { type: "ADD_TAG"; payload: { id: number; tag: string } }
  | { type: "REMOVE_TAG"; payload: { id: number; tag: string } }
  | {
      type: "EDIT"
      payload: { id: number; title: string; text: string; updatedAt: string }
    }
  | { type: "TOGGLE_STAR"; payload: number }
  | { type: "INIT"; payload: Memo[] }

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
    case "REMOVE_TAG":
      return state.map((m) =>
        m.id === action.payload.id
          ? { ...m, tags: m.tags.filter((t) => t !== action.payload.tag) }
          : m
      )
    case "EDIT": {
      return state.map((m) =>
        m.id === action.payload.id
          ? {
              ...m,
              title: action.payload.title,
              text: action.payload.text,
              updatedAt: action.payload.updatedAt,
            }
          : m
      )
    }
    case "TOGGLE_STAR":
      return state.map((m) =>
        m.id === action.payload ? { ...m, starred: !m.starred } : m
      )
    case "INIT":
      return action.payload
    default:
      return state
  }
}
