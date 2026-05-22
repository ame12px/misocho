interface MemoSearchProps {
	search: string
	onSearchChange: (value: string) => void
}

function MemoSearch({ search, onSearchChange }: MemoSearchProps) {
	return (
		<input
			placeholder="検索"
			value={search}
			onChange={(e) => onSearchChange(e.target.value)}
		/>
	)
}

export default MemoSearch