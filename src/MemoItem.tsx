interface MemoItemProps {
    text: string
    createdAt: string
    onDelete: () => void
}

function MemoItem({ text, createdAt, onDelete }: MemoItemProps) {
    return (
        <li>
            {text} ({createdAt})
            <button onClick={onDelete}>削除</button>
        </li>
    )
}

export default MemoItem