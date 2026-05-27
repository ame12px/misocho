import { useMemoContext } from "./MemoContext"

interface MemoItemProps {
  id: number
  text: string
  createdAt: string
}

function MemoItem({ id, text, createdAt }: MemoItemProps) {
  const { dispatch } = useMemoContext()
  
  return (
    <li className="memo-item">
      <div className="memo-item__text">{text}</div>
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