import { User } from "@/entities/user";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useAddUserMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.users.addUser,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] })
    })
}


export function useUpdateUserMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.users.updateUser,
        onMutate: async (newUser) => {
            await queryClient.cancelQueries({ queryKey: ['users'] })

            const previous = queryClient.getQueryData(['users']) as User[]
            const index = previous.findIndex(item => item.id === newUser.id)

            queryClient.setQueryData(['users'], (old: User[]) => {
                const curr = [...old]
                curr[index] = newUser
                return curr
            })

            return { previous }
        },

        onError: (_err, _new, context) => {
            queryClient.setQueryData(['Useres'], context?.previous)
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    })
}

export function useDeleteUserMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.users.deleteUser,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
        mutationKey: ['removeUser']
    })
}

export function useLinkUserMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.users.addCouple,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
        mutationKey: ['linkUser']
    })
}

export function useUnLinkUserMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.users.removeCouple,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
        mutationKey: ['unlinkUser']
    })
}