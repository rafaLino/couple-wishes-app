import api from "@/lib/api";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";


export function useWishesQuery() {
    return useSuspenseQuery({
        queryKey: ['wishes'],
        queryFn: api.wishes.getWishes
    })
}

export function loader({ context }: { context: { queryClient: QueryClient } }) {
    context.queryClient.fetchQuery({
        queryKey: ['wishes'],
        queryFn: api.wishes.getWishes
    })
}
