interface MemoSearchProps {
  search: string
  onSearchChange: (value: string) => void
}

function MemoSearch({ search, onSearchChange }: MemoSearchProps) {
  return (
    <input
      className="memo-search"
      placeholder="検索..."
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
    />
  )
}

export default MemoSearch
