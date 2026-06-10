import { useReducer, useEffect, useState } from "react"
import { memoReducer } from "../types/memo"
import type { Memo } from "../types/memo"

export function useMemos() {
  const [memos, dispatch] = useReducer(memoReducer, [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/memos")
      .then((res) => res.json())
      .then((data: (Memo & { tags: string })[]) => {
        const parsed = data.map((m) => ({
          ...m,
          tags: JSON.parse(m.tags),
        }))
        dispatch({ type: "INIT", payload: parsed })
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

  const deleteMemo = async (id: number) => {
    await fetch(`http://localhost:3000/memos/${id}`, {
      method: "DELETE",
    })
    dispatch({ type: "DELETE", payload: id })
  }

  const updateMemo = async (id: number, title: string, text: string) => {
    const updatedAt = new Date().toLocaleString("ja-JP")
    const memo = memos.find((m) => m.id === id)
    if (!memo) return
    await fetch(`http://localhost:3000/memos/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...memo, title, text, updatedAt }),
    })
    dispatch({ type: "EDIT", payload: { id, title, text, updatedAt } })
  }

  return { memos, dispatch, addMemo, deleteMemo, updateMemo, loading }
}
