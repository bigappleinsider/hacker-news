import { useState, useEffect } from "react";

import { API_CONFIG } from "../../config/config";

const useFetchStory = (id: number) => {
	const [data, setData] = useState<any>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchData = async (id: number) => {
		try {
			const response = await fetch(`${API_CONFIG.BASE_URL}/item/${id}.json`);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const result = await response.json();
			setData(result);
		} catch (error) {
			setError((error as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData(id);
	}, [id]);

	return { data, loading, error };
};

function useFetchStories() {
	const [results, setResults] = useState<Array<number> | undefined>();
	const [isLoading, setIsLoading] = useState(false);

	async function fetchData() {
		setIsLoading(true);
		try {
			const response = await fetch(`${API_CONFIG.BASE_URL}/topstories.json`);
			const data = await response.json();
			setResults(data as Array<number>);
		} catch (error) {
			console.error("Error fetching stories:", error);
		} finally {
			setIsLoading(false);
		}
	}

	useEffect(() => {
		fetchData();
	}, []);

	return { results, isLoading };
}

function usePagination<T>(items: T[], itemsPerPage: number) {
	const [currentPage, setCurrentPage] = useState(1);

	// Calculate the indices for slicing the items array
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

	// Calculate total pages
	const totalPages = Math.ceil(items.length / itemsPerPage);

	// Handle page change
	const handlePageChange = (newPage: number) => {
		if (newPage > 0 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	return {
		currentItems,
		currentPage,
		totalPages,
		handlePageChange,
	};
}

export { useFetchStories, usePagination, useFetchStory };
