import { useState, useEffect } from "react"
import MemoItem from "./MemoItem"
import MemoInput from "./MemoInput"
import MemoSearch from "./MemoSearch"

interface Memo {
  id: number
  text: string
  createdAt: string
}

function App() {
  const [input, setInput] = useState("")
  const [memos, setMemos] = useState<Memo[]>(() => {
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
    setMemos([...memos, newMemo])
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
            onDelete={() => setMemos(memos.filter((m) => m.id !== memo.id))}
          />
        ))}
      </ul>
    </div>
  )
}

export default App