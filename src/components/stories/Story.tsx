import React from "react";
import { useFetchStory } from "./hooks";

/**
 *
 * {
  "by" : "dhouston",
  "descendants" : 71,
  "id" : 8863,
  "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
  "score" : 111,
  "time" : 1175714200,
  "title" : "My YC app: Dropbox - Throw away your USB drive",
  "type" : "story",
  "url" : "http://www.getdropbox.com/u/2/screencast.html"

  My first game with Carimbo, my homemade engine (nullonerror.org)
72 points by delduca 1 hour ago | hide | 37 comments
}
 * @returns fetch individual story
 */

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
