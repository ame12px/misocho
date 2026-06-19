import { useReducer, useEffect, useState } from "react"
import { memoReducer } from "../types/memo"
import type { Memo } from "../types/memo"

const API_URL = import.meta.env.VITE_API_URL

export function useMemos(token: string) {
  const [memos, dispatch] = useReducer(memoReducer, [])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`${API_URL}/memos`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data: (Memo & { tags: string })[]) => {
        const parsed = data.map((m) => ({
          ...m,
          tags: JSON.parse(m.tags),
        }))
        dispatch({ type: "INIT", payload: parsed })
        setLoading(false)
      })
  }, [token])

  const addMemo = async (title: string, text: string) => {
    const newMemo = {
      title,
      text,
      createdAt: new Date().toLocaleString("ja-JP"),
      updatedAt: new Date().toLocaleString("ja-JP"),
      tags: [],
      starred: false,
    }
    const res = await fetch(`${API_URL}/memos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newMemo),
    })
    const saved = await res.json()
    dispatch({
      type: "ADD",
      payload: { ...saved, tags: JSON.parse(saved.tags) },
    })
  }

  const deleteMemo = async (id: number) => {
    await fetch(`${API_URL}/memos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
    dispatch({ type: "DELETE", payload: id })
  }

  const updateMemo = async (id: number, title: string, text: string) => {
    const updatedAt = new Date().toLocaleString("ja-JP")
    const memo = memos.find((m) => m.id === id)
    if (!memo) return
    await fetch(`${API_URL}/memos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...memo, title, text, updatedAt }),
    })
    dispatch({ type: "EDIT", payload: { id, title, text, updatedAt } })
  }

  const addTag = async (id: number, tag: string) => {
    const memo = memos.find((m) => m.id === id)
    if (!memo) return
    const newTags = [...memo.tags, tag]
    await fetch(`${API_URL}/memos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...memo, tags: newTags }),
    })
    dispatch({ type: "ADD_TAG", payload: { id, tag } })
  }

  const removeTag = async (id: number, tag: string) => {
    const memo = memos.find((m) => m.id === id)
    if (!memo) return
    const newTags = memo.tags.filter((t) => t !== tag)
    await fetch(`${API_URL}/memos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...memo, tags: newTags }),
    })
    dispatch({ type: "REMOVE_TAG", payload: { id, tag } })
  }

  const toggleStar = async (id: number) => {
    const memo = memos.find((m) => m.id === id)
    if (!memo) return
    await fetch(`${API_URL}/memos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ ...memo, starred: !memo.starred }),
    })
    dispatch({ type: "TOGGLE_STAR", payload: id })
  }

  return {
    memos,
    dispatch,
    addMemo,
    deleteMemo,
    updateMemo,
    addTag,
    removeTag,
    toggleStar,
    loading,
  }
}
