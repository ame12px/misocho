interface memoInputProps {
 input: string
 onInputChange: (value:string) => void
 onAdd: () => void   
}

function MemoInput({ input, onInputChange, onAdd }: memoInputProps) {
  return (
    <div>
      <input
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.nativeEvent.isComposing) onAdd()
        }}
      />
      <button onClick={onAdd}>追加</button>
    </div>
  )
}

export default MemoInput