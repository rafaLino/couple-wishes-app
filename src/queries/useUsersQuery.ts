import api from "@/lib/api";
import { QueryClient, useSuspenseQuery } from "@tanstack/react-query";


export function useUsersQuery() {
    return useSuspenseQuery({
        queryKey: ['users'],
        queryFn: api.users.getUsers
    })
}

export function loader({ context }: { context: { queryClient: QueryClient } }) {
    context.queryClient.fetchQuery({
        queryKey: ['users'],
        queryFn: api.users.getUsers
    })
}
