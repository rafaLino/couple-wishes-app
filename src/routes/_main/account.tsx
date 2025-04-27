import { UserList } from '@/features/user-list'
import env from '@/lib/env'
import { loader } from '@/queries/useUsersQuery'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_main/account')({
  component: UserList,
  beforeLoad: ({ context }) => {
    const user = context.auth.getUser()
    if (!user || !env.VITE_ALLOWED_USERS.includes(user.username)) {
      throw redirect({
        to: '/',
      })
    }
  },
  loader: loader,
})

