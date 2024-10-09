import Story from "./Story";
import { useFetchStories, usePagination } from "./hooks";
import Pagination from "./Pagination";

export default function Stories() {
	const { isLoading, results } = useFetchStories();
	const itemsPerPage = 10; // You can adjust this number as needed

	const {
		currentItems: currentResults,
		currentPage,
		totalPages,
		handlePageChange,
	} = usePagination(results || [], itemsPerPage);

	return (
		<div>
			{isLoading === true && <div>Loading...</div>}
			{currentResults != null && (
				<div>
					{currentResults.map((result) => (
						<Story id={result} key={result} />
					))}
					<Pagination
						currentPage={currentPage}
						onPageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			)}
		</div>
	);
}
