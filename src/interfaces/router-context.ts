import { AuthClient } from "@/features/auth";
import { QueryClient } from "@tanstack/react-query";


export interface RouterContext {
    queryClient: QueryClient
    auth: AuthClient
}