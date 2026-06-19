import { useState } from "react"
import { useMemos } from "./hooks/useMemos"
import { MemoContext } from "./context/MemoContext"
import { useAuth } from "./hooks/useAuth"
import MemoItem from "./components/MemoItem"
import MemoInput from "./components/MemoInput"
import MemoSearch from "./components/MemoSearch"
import Login from "./components/Login"
import "./App.css"

function App() {
  const { token, login, logout } = useAuth()
  const {
    memos,
    dispatch,
    addMemo,
    deleteMemo,
    updateMemo,
    addTag,
    removeTag,
    toggleStar,
  } = useMemos(token ?? "")
  const [title, setTitle] = useState("")
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])

  const filteredMemos = memos.filter((m) => {
    const matchesSearch =
      m.text.toLowerCase().includes(search.toLowerCase()) ||
      m.title.toLowerCase().includes(search.toLowerCase())
    const matchesTags = selectedTags.every((tag) => m.tags.includes(tag))
    return matchesSearch && matchesTags
  })

  const sortedMemos = [...filteredMemos].sort((a, b) => {
    if (a.starred && !b.starred) return -1
    if (!a.starred && b.starred) return 1
    return 0
  })

  const handleAdd = () => {
    if (input.trim() === "" && title.trim() === "") return
    addMemo(title, input)
    setTitle("")
    setInput("")
  }

  if (!token) {
    return <Login onLogin={login} />
  }

  return (
    <MemoContext.Provider
      value={{
        memos,
        dispatch,
        deleteMemo,
        updateMemo,
        addTag,
        removeTag,
        toggleStar,
      }}
    >
      <div className="app">
        <div className="app-header">
          <h1 className="app-title">misocho</h1>
          <button className="app-logout" onClick={logout}>
            ログアウト
          </button>
        </div>
        <div className="app-controls">
          <MemoInput
            input={input}
            title={title}
            onInputChange={setInput}
            onTitleChange={setTitle}
            onAdd={handleAdd}
          />
          <MemoSearch search={search} onSearchChange={setSearch} />
          {selectedTags.length > 0 && (
            <div className="tag-filter">
              {selectedTags.map((tag) => (
                <span key={tag}>
                  #{tag}
                  <button
                    onClick={() =>
                      setSelectedTags((prev) => prev.filter((t) => t !== tag))
                    }
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="memo-divider">{filteredMemos.length}件</div>
        <ul className="memo-list">
          {sortedMemos.map((memo) => (
            <MemoItem
              key={memo.id}
              id={memo.id}
              title={memo.title}
              text={memo.text}
              createdAt={memo.createdAt}
              updatedAt={memo.updatedAt}
              tags={memo.tags}
              starred={memo.starred}
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
