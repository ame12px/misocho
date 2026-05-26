import { createContext, useContext } from "react";
import type { Memo } from "./memoReducer"

type MemoAction =
  | { type: "ADD"; payload: Memo }
  | { type: "DELETE"; payload: number }

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