import React from "react";
import { useFetchStory } from "./hooks";

const getPostDate = (time: number) => {
	const currentDate = new Date();
	const postDate = new Date(time * 1000);
	const displayTime = currentDate.getTime() - postDate.getTime();

	const minutes = Math.floor(displayTime / (1000 * 60));
	const hours = Math.floor(displayTime / (1000 * 60 * 60));
	const days = Math.floor(displayTime / (1000 * 60 * 60 * 24));

	if (days > 0) {
		return `${days} day${days > 1 ? "s" : ""} ago`;
	} else if (hours > 0) {
		return `${hours} hour${hours > 1 ? "s" : ""} ago`;
	} else {
		return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
	}
};

export default function Story({ id }: { id: number }) {
	const { data: result } = useFetchStory(id);

	return (
		<div>
			{result != null && (
				<div>
					<a href={result.url}>{result.title}</a> | {result.score} |
					{getPostDate(result.time)}
				</div>
			)}
		</div>
	);
}
