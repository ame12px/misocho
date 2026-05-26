import { useState } from "react"
import { useMemos } from "./useMemos"
import { MemoContext } from "./MemoContext"
import MemoItem from "./MemoItem"
import MemoInput from "./MemoInput"
import MemoSearch from "./MemoSearch"

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
      <div>
        <h1>misocho</h1>
        <MemoInput
          input={input}
          onInputChange={setInput}
          onAdd={handleAdd}
        />
        <MemoSearch
          search={search}
          onSearchChange={setSearch}
        />
        <ul>
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