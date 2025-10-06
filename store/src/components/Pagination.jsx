import "../css/Pagination.css";

export default function Pagination({page, setPage, maxPage}) {
	console.log("Max Page: ", maxPage);

	return <div className="pagination">
		<h3>Page {page + 1} of {maxPage+1}</h3>

		<div className="page-buttons">
			<button onClick={() => setPage(0)} disabled={page===0}>
				{"<<"}
			</button>
			<button onClick={() => setPage(prev => Math.max(prev -1, 0))} disabled={page===0}>
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