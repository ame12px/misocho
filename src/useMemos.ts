import { useReducer, useEffect } from "react";
import { memoReducer } from "./memoReducer";
import type { Memo } from "./memoReducer"

export function useMemos() {
  const [memos, dispatch] = useReducer(memoReducer, [], () => {
    const saved = localStorage.getItem("memos")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("memo", JSON.stringify(memos))
  }, [memos])

  const addMemo = (text: string) => {
    const newMemo: Memo = {
      id: Date.now(),
      text,
      createdAt: new Date().toLocaleString("ja-JP"),
    }
    dispatch({ type: "ADD", payload: newMemo })
  }

  return { memos, dispatch, addMemo }
}