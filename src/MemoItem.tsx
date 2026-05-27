import { useState } from "react"
import { useMemoContext } from "./MemoContext"

interface MemoItemProps {
  id: number
  text: string
  createdAt: string
  tags: string[]
  onTagClick: (tag: string) => void
}

function MemoItem({ id, text, createdAt, tags, onTagClick }: MemoItemProps) {
  const { dispatch } = useMemoContext()
  const [tagInput, setTagInput] = useState("")

  const addTag = () => {
    if (tagInput.trim() === "") return
    if (tags.includes(tagInput.trim())) return
    dispatch({ type: "ADD_TAG", payload: {id, tag: tagInput.trim() } })
    setTagInput("")
  }
  
  return (
    <li className="memo-item">
      <div className="memo-item__text">{text}</div>
      <div className="memo-item__tags">
        {tags.map((tag) => (
          <span
            key={tag}
            className="memo-item__tag"
            onClick={() => onTagClick(tag)}
            style={{ cursor: "pointer" }}
          >
            #{tag}
          </span>
        ))}
        <input
          className="memo-item__tag-input"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing) addTag()
          }}
          placeholder="タグを追加..."
        />
      </div>
      <div className="memo-item__footer">
        <span className="memo-item__date">{createdAt}</span>
        <button
          className="memo-item__delete"
          onClick={() => dispatch({ type: "DELETE", payload: id})}
        >
          削除
        </button>
      </div>
    </li>
  )
}

export default MemoItem