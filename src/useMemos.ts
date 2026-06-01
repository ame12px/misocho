import { useReducer, useEffect } from "react";
import { memoReducer } from "./memoReducer";
import type { Memo } from "./memoReducer"

export function useMemos() {
  const [memos, dispatch] = useReducer(memoReducer, [], () => {
    const saved = localStorage.getItem("memos")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos))
  }, [memos])

  const addMemo = (title: string, text: string) => {
    const newMemo: Memo = {
      id: Date.now(),
      title,
      text,
      createdAt: new Date().toLocaleString("ja-JP"),
      updatedAt: new Date().toLocaleString("ja-JP"),
      tags: [],
      starred: false,
    }
    dispatch({ type: "ADD", payload: newMemo })
  }

  return { memos, dispatch, addMemo }
}