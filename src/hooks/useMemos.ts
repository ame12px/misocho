import { useReducer, useEffect, useState } from "react"
import { memoReducer } from "../types/memo"
import type { Memo } from "../types/memo"

export function useMemos() {
  const [memos, dispatch] = useReducer(memoReducer, [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/memos")
      .then((res) => res.json())
      .then((data: Memo[]) => {
        dispatch({ type: "INIT", payload: data })
        setLoading(false)
      })
  }, [])

  const addMemo = async (title: string, text: string) => {
    const newMemo: Memo = {
      id: Date.now(),
      title,
      text,
      createdAt: new Date().toLocaleString("ja-JP"),
      updatedAt: new Date().toLocaleString("ja-JP"),
      tags: [],
      starred: false,
    }
    await fetch("http://localhost:3000/memos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMemo),
    })
    dispatch({ type: "ADD", payload: newMemo })
  }

  return { memos, dispatch, addMemo, loading }
}
