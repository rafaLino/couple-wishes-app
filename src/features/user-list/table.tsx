import {
    ColumnDef,
    Row,
    Table
} from "@tanstack/react-table"
import {
    MoreVerticalIcon
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { User } from "@/entities/user"
import { DragHandle } from "@/features/data-table/drag-handle"
import { useAuthUser } from "../auth"



export type DataTableActions = 'edit' | 'remove' | 'link' | 'unlink' | string

const canBeLinked = (user: User | undefined, row: Row<User>) => {
    if (!user) return false

    return user.username !== row.original.username && user.couple_id === 0
}

const canBeUnlinked = (user: User | undefined, row: Row<User>) => {
    if (!user) return false

    return user.username === row.original.username && user.couple_id === row.original.couple_id
}

const DropdownActions = ({ row, table }: { row: Row<User>, table: Table<User> }) => {
    const user = useAuthUser()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
                    size="icon"
                >
                    <MoreVerticalIcon />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                {canBeLinked(user, row) && (
                    <DropdownMenuItem onClick={() => table.options.meta?.action('link', row.original.id)}>Link</DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => table.options.meta?.action('edit', row.original.id)}>Edit</DropdownMenuItem>
                <DropdownMenuSeparator />
                {canBeUnlinked(user, row) && (
                    <DropdownMenuItem onClick={() => table.options.meta?.action('unlink', row.original.id)}>Unlink</DropdownMenuItem>
                )}
                <DropdownMenuItem disabled={row.original.couple_id > 0} onClick={() => table.options.meta?.action('remove', row.original.id)}>Delete</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>)
}


export const columns: ColumnDef<User>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => {
            return <span className="w-fit px-0 text-left text-foreground">
                {row.original.name}
            </span>
        },
        enableHiding: false,
    },
    {
        accessorKey: "username",
        header: "Username",
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
                {row.original.username}
            </Badge>
        ),
    },
    {
        accessorKey: "partner",
        header: "Partner",
        cell: ({ row }) => (
            <div>
                <Badge variant="outline" className="px-1.5 text-muted-foreground">
                    {row.original.partner ?? '-'}
                </Badge>
            </div>
        ),
    },
    {
        id: "actions",
        cell: ({ row, table }) => (
            <DropdownActions row={row} table={table} />
        ),
    },
]
