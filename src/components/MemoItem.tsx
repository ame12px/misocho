import { useState } from "react"
import { useMemoContext } from "../context/MemoContext"

interface MemoItemProps {
  id: number
  title: string
  text: string
  createdAt: string
  updatedAt: string
  tags: string[]
  starred: boolean
  onTagClick: (tag: string) => void
}

function MemoItem({
  id,
  title,
  text,
  createdAt,
  updatedAt,
  tags,
  starred,
  onTagClick,
}: MemoItemProps) {
  const { dispatch } = useMemoContext()
  const [tagInput, setTagInput] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(title)
  const [editText, setEditText] = useState(text)

  const addTag = () => {
    if (tagInput.trim() === "") return
    if (tags.includes(tagInput.trim())) return
    dispatch({ type: "ADD_TAG", payload: { id, tag: tagInput.trim() } })
    setTagInput("")
  }

  const saveEdit = () => {
    dispatch({
      type: "EDIT",
      payload: { id, title: editTitle, text: editText },
    })
    setIsEditing(false)
  }

  return (
    <li className="memo-item">
      <div
        className="memo-item__header"
        onClick={() => !isEditing && setIsOpen(!isOpen)}
      >
        <div className="memo-item__header-left">
          <span className="memo-item__title">
            {title || "（タイトルなし）"}
          </span>
          <span className="memo-item__date">
            作成: {createdAt}
            {updatedAt !== createdAt && ` ／ 更新: ${updatedAt}`}
          </span>
        </div>
        <div className="memo-item__header-right">
          <button
            className={`memo-item__star ${starred ? "memo-item___star--on" : ""}`}
            onClick={(e) => {
              e.stopPropagation()
              dispatch({ type: "TOGGLE_STAR", payload: id })
            }}
          >
            {starred ? "★" : "☆"}
          </button>
          <span className="memo-item__toggle">{isOpen ? "▲" : "▼"}</span>
        </div>
      </div>

      {isOpen && (
        <div className="memo-item__body">
          {isEditing ? (
            <div className="memo-item__edit">
              <input
                className="memo-item__edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="タイトル..."
              />
              <textarea
                className="memo-item__edit-textarea"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                rows={4}
              />
            </div>
          ) : (
            <div className="memo-item__text">{text}</div>
          )}

          <div className="memo-item__tags">
            {tags.map((tag) => (
              <span key={tag} className="memo-item__tag">
                <span
                  onClick={() => onTagClick(tag)}
                  style={{ cursor: "pointer" }}
                >
                  #{tag}
                </span>
                {isEditing && (
                  <button
                    className="memo-item__tag-remove"
                    onClick={() =>
                      dispatch({ type: "REMOVE_TAG", payload: { id, tag } })
                    }
                  >
                    ✕
                  </button>
                )}
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
            {isEditing ? (
              <div className="memo-item__actions">
                <button onClick={saveEdit}>保存</button>
                <button onClick={() => setIsEditing(false)}>キャンセル</button>
              </div>
            ) : (
              <div className="memo-item__actions">
                <button onClick={() => setIsEditing(true)}>編集</button>
                <button
                  onClick={() => dispatch({ type: "DELETE", payload: id })}
                >
                  削除
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </li>
  )
}

export default MemoItem
