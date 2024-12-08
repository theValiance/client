import { useQuery } from "@tanstack/react-query"
import { apiClient } from "../lib/api-client";

export interface ICountEntriesParams {
	vid?: string,
	name?: string,
	labels?: {
		set?: string,
	}
}

export function useCountEntries(params: ICountEntriesParams) {
	return useQuery({
		queryKey: ['count-entries', params],
		queryFn: async () => (await apiClient.get<{count: number}>('/entries/count', {
			params
		})).data
	});
}