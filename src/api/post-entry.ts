import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../lib/api-client";

export interface IPostEntryParams {
	vid: string,
	name: string,
	labels: {
		set: 'A',
		energy: number,
		sharpness: number,
		mood: number,
		color: number,
	},
};

export function useUpdateEntry(vid: string) {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (params: IPostEntryParams) => apiClient.post('/entries', params),
		mutationKey: ['entry', vid],
		onSuccess: () => queryClient.invalidateQueries({
			queryKey: ['entries'],
		}),
	});
}