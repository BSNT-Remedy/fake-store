import "../css/Pagination.css";

export default function Pagination({page, setPage, maxPage}) {
	console.log("Max Page: ", maxPage);

	return <div className="pagination">
		<h3>Page {page} of {maxPage}</h3>

		<div className="page-buttons">
			<button onClick={() => setPage(1)} disabled={page===1}>
				{"<<"}
			</button>
			<button onClick={() => setPage(prev => Math.max(prev -1, 1))} disabled={page===1}>
				{"<"}
			</button>

			<button onClick={() => setPage(prev => Math.min(prev + 1, maxPage))} disabled={page===maxPage}>
				{">"}
			</button>
			<button onClick={() => setPage(maxPage)} disabled={page===maxPage}>
				{">>"}
			</button>
		</div>
  </div>
}