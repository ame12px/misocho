interface MemoInputProps {
  input: string
  title: string
  onInputChange: (value: string) => void
  onTitleChange: (value: string) => void
  onAdd: () => void
}

function MemoInput({
  input,
  title,
  onInputChange,
  onTitleChange,
  onAdd,
}: MemoInputProps) {
  return (
    <div className="memo-input">
      <div className="memo-input__fields">
        <input
          className="memo-input__field"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="タイトル..."
        />
        <textarea
          className="memo-input__textarea"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.nativeEvent.isComposing && e.ctrlKey)
              onAdd()
          }}
          placeholder="アイディアを入力... (Ctrl+Enterで追加)"
          rows={3}
        />
      </div>
      <button className="memo-input__button" onClick={onAdd}>
        追加
      </button>
    </div>
  )
}

export default MemoInput
