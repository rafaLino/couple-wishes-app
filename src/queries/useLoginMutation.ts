import { useAuth } from "@/features/auth";
import api from "@/lib/api";
import { saveOnLocalStorageAsync } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";


export function useLoginMutation() {
    const { setUser } = useAuth()
    return useMutation({
        mutationFn: api.users.login,
        onSuccess: (data) => {
            saveOnLocalStorageAsync(data)
            setUser(data.user)
        }
    })
}