import { useInfiniteQuery } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export interface IEntry {
	vid: string,
	timestamp: string,
	name: string,
	labels: {
		energy: number,
		sharpness: number,
		mood: number,
		color: number,
	}
	video: {
		id: string,
		title: string,
	}
}

export function useInfiniteEntriesQuery(stepSize: number) {
	return useInfiniteQuery({
		queryKey: ['entries'],
		queryFn: async ({pageParam}) => (await apiClient.get<IEntry[]>('/entries', {
			params: {
				depth: pageParam,
				limit: stepSize,
			}
		})).data,
		initialPageParam: 0,
		getNextPageParam: (lastPage, _allPages, lastPageParam) => {
			if (lastPage.length === 0) {
				return undefined;
			}
			return lastPageParam + stepSize;
		}
	});
}