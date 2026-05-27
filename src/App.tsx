import { useState } from "react"
import { useMemos } from "./useMemos"
import { MemoContext } from "./MemoContext"
import MemoItem from "./MemoItem"
import MemoInput from "./MemoInput"
import MemoSearch from "./MemoSearch"
import "./App.css"

function App() {
  const { memos, dispatch, addMemo } = useMemos()
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")

  const filteredMemos = memos.filter((m) =>
    m.text.toLowerCase().includes(search.toLowerCase())
  )

  const handleAdd = () => {
    if (input.trim() === "") return
    addMemo(input)
    setInput("")
  }
  
  return (
    <MemoContext.Provider value={{ memos, dispatch }}>
      <div className="app">
        <h1 className="app-title">misocho</h1>
        <div className="app-controls">
          <MemoInput
            input={input}
            onInputChange={setInput}
            onAdd={handleAdd}
          />
          <MemoSearch
            search={search}
            onSearchChange={setSearch}
          />
        </div>
        <ul className="memo-list">
          {filteredMemos.map((memo) => (
            <MemoItem
              key={memo.id}
              id={memo.id}
              text={memo.text}
              createdAt={memo.createdAt}
            />
          ))}
        </ul>
      </div>
    </MemoContext.Provider>
  )
}

export default App