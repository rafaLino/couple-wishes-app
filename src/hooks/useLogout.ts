import { clearLocalStorageAsync } from "@/lib/utils"
import { useNavigate } from "@tanstack/react-router";


export function useLogout() {
    const navigate = useNavigate()
    const logout = async () => {
        await clearLocalStorageAsync();
        navigate({ to: '/login' })
    }

    return logout
}