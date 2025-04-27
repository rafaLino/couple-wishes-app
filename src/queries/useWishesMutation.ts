import { Wish } from "@/entities/wish";
import api from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";


export function useAddWishMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.wishes.addWish,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['wishes'] })
    })
}

export function useAddUrlWishMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.wishes.addWishByUrl,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['wishes'] })
    })
}

export function useUpdateWishMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.wishes.updateWish,
        onMutate: async (newWish) => {
            await queryClient.cancelQueries({ queryKey: ['wishes'] })

            const previous = queryClient.getQueryData(['wishes']) as Wish[]
            const index = previous.findIndex(item => item.id === newWish.id)

            queryClient.setQueryData(['wishes'], (old: Wish[]) => {
                const curr = [...old]
                curr[index] = newWish
                return curr
            })

            return { previous }
        },

        onError: (_err, _new, context) => {
            queryClient.setQueryData(['wishes'], context?.previous)
        },

        onSettled: () => queryClient.invalidateQueries({ queryKey: ['wishes'] }),
    })
}

export function useDeleteWishMutation() {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: api.wishes.deleteWish,
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['wishes'] }),
        mutationKey: ['removeWish']
    })
}