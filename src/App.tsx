import { useState } from "react"
import { useMemos } from "./useMemos"
import { MemoContext } from "./MemoContext"
import MemoItem from "./MemoItem"
import MemoInput from "./MemoInput"
import MemoSearch from "./MemoSearch"
import "./App.css"

function App() {
  const { memos, dispatch, addMemo } = useMemos()
  const [title, setTitle] = useState("")
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredMemos = memos.filter((m) => {
    const matchesSearch = m.text.toLowerCase().includes(search.toLowerCase())
    const matchesTags = selectedTags.every((tag) => m.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const handleAdd = () => {
    if (input.trim() === "" && title.trim() === "") return
    addMemo(title, input)
    setTitle("")
    setInput("")
  }
  
  return (
    <MemoContext.Provider value={{ memos, dispatch }}>
      <div className="app">
        <h1 className="app-title">misocho</h1>
        <div className="app-controls">
          <MemoInput
            input={input}
            title={title}
            onInputChange={setInput}
            onTitleChange={setTitle}
            onAdd={handleAdd}
          />
          <MemoSearch
            search={search}
            onSearchChange={setSearch}
          />
          {selectedTags.length > 0 && (
            <div className="tag-filter">
              {selectedTags.map((tag) => (
                <span key={tag}>
                  #{tag}
                  <button onClick={() => setSelectedTags((prev) => prev.filter((t) => t !== tag))}>✕</button>
                </span>
              ))}
            </div>
          )}
        </div>
        <ul className="memo-list">
          {filteredMemos.map((memo) => (
            <MemoItem
              key={memo.id}
              id={memo.id}
              title={memo.title}
              text={memo.text}
              createdAt={memo.createdAt}
              updatedAt={memo.updatedAt}
              tags={memo.tags}
              onTagClick={(tag) => {
                setSelectedTags((prev) =>
                  prev.includes(tag) ? prev : [...prev, tag]
                )
              }}
            />
          ))}
        </ul>
      </div>
    </MemoContext.Provider>
  )
}

export default App