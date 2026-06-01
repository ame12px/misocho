import { createContext, useContext } from "react"
import type { Memo } from "../types/memo"

type MemoAction =
  | { type: "ADD"; payload: Memo }
  | { type: "DELETE"; payload: number }
  | { type: "ADD_TAG"; payload: { id: number; tag: string } }
  | { type: "REMOVE_TAG"; payload: { id: number; tag: string } }
  | { type: "EDIT"; payload: { id: number; title: string; text: string } }
  | { type: "TOGGLE_STAR"; payload: number }

type MemoContextType = {
  memos: Memo[]
  dispatch: React.ActionDispatch<[action: MemoAction]>
}

export const MemoContext = createContext<MemoContextType | null>(null)

export function useMemoContext() {
  const context = useContext(MemoContext)
  if (!context) throw new Error("MemoContextが見つかりません")
  return context
}
