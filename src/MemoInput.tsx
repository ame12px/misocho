interface memoInputProps {
 input: string
 onInputChange: (value:string) => void
 onAdd: () => void   
}

function MemoInput({ input, onInputChange, onAdd }: memoInputProps) {
  return (
    <div className="memo-input">
      <input
        className="memo-input__field"
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) onAdd()
        }}
        placeholder="アイディアを入力..."
      />
      <button className="memo-input__button" onClick={onAdd}>追加</button>
    </div>
  )
}

export default MemoInput