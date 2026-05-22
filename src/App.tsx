import { useReducer, useEffect, useState } from "react"
import { memoReducer } from "./memoReducer"
import type { Memo } from "./memoReducer"
import MemoItem from "./MemoItem"
import MemoInput from "./MemoInput"
import MemoSearch from "./MemoSearch"

function App() {
  const [input, setInput] = useState("")
  const [memos, dispatch] = useReducer(memoReducer, [], () => {
    const saved = localStorage.getItem("memo")
    return saved ? JSON.parse(saved) : []
  })
  const [search, setSearch] = useState("")

  useEffect(() => {
    localStorage.setItem("memo", JSON.stringify(memos))
  }, [memos])

  const filteredMemos = memos.filter((m) =>
    m.text.toLowerCase().includes(search.toLowerCase())
  )

  const addMemo = () => {
    if (input.trim() === "") return
    const newMemo: Memo = {
      id: Date.now(),
      text: input,
      createdAt: new Date().toLocaleString("ja-JP"),
    }
    dispatch({ type: "ADD", payload: newMemo })
    setInput("")
  }
  
  return (
    <div>
      <h1>misocho</h1>
      <MemoInput
        input={input}
        onInputChange={setInput}
        onAdd={addMemo}
      />
      <MemoSearch
        search={search}
        onSearchChange={setSearch}
      />
      <ul>
        {filteredMemos.map((memo) => (
          <MemoItem
            key={memo.id}
            text={memo.text}
            createdAt={memo.createdAt}
            onDelete={() => dispatch({ type: "DELETE", payload: memo.id })}
          />
        ))}
      </ul>
    </div>
  )
}

export default App