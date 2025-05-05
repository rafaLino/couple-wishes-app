import { CreateDefaultUser } from '@/features/create-default-user'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/create')({
  component: CreateDefaultUser,
})
