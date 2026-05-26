import { useMemoContext } from "./MemoContext"

interface MemoItemProps {
  id: number
  text: string
  createdAt: string
}

function MemoItem({ id, text, createdAt }: MemoItemProps) {
  const { dispatch } = useMemoContext()
  
  return (
    <li>
      {text} ({createdAt})
      <button onClick={() => dispatch({ type: "DELETE", payload: id})}>削除</button>
    </li>
  )
}

export default MemoItem