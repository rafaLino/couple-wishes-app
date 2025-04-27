import { WishList } from '@/features/wish-list'
import { loader } from '@/queries/useWishesQuery'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/')({
  loader: loader,
  component: WishList,
})

