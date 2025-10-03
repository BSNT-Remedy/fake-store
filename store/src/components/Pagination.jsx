import "../css/Pagination.css";

export default function Pagination({page, setPage}) {
	return <div className="pagination">
		<h3>Page {page + 1} of 7</h3>

		<div className="page-buttons">
			<button onClick={() => setPage(0)}>
				{"<<"}
			</button>
			<button onClick={() => setPage(prev => Math.max(prev -1, 0))}>
				{"<"}
			</button>

			<button onClick={() => setPage(prev => Math.min(prev + 1, 6))}>
				{">"}
			</button>
			<button onClick={() => setPage(6)}>
				{">>"}
			</button>
		</div>
  </div>
}