import {
    ColumnDef,
    Table
} from "@tanstack/react-table"
import {
    CheckCircle2Icon,
    CircleMinus,
    ExternalLink,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Wish } from "@/entities/wish"
import { DragHandle } from "@/features/data-table/drag-handle"



export type DataTableActions = 'openDialog' | 'edit' | 'copy' | 'remove' | 'complete' | string


export const columns: ColumnDef<Wish>[] = [
    {
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.original.id} />,
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row, table }) => {
            return <Button variant="link" className="w-fit px-0 text-left text-foreground" onClick={() => table.options.meta?.action('openDialog', row.original.id)}>
                {row.original.title}
            </Button>
        },
        enableHiding: false,
    },
    {
        accessorKey: "status",
        header: "Status",
        filterFn: (row, _, filterValue) => {
            if (filterValue === 'all') {
                return true
            }
            const val = row.original.completed;
            return filterValue === 'completed' ? val : !val
        },
        cell: ({ row }) => (
            <Badge
                variant="outline"
                className="flex gap-1 px-1.5 text-muted-foreground [&_svg]:size-3"
            >
                {row.original.completed ? (
                    <CheckCircle2Icon className="text-green-500 dark:text-green-400" />
                ) : (
                    <CircleMinus className="text-red-500 dark:text-red-400" />
                )}
                {row.original.completed ? 'Completed' : 'Incompleted'}
            </Badge>
        ),
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => (
            <div>
                <Badge variant="outline" className="px-1.5 text-muted-foreground">
                    {row.original.price ?? '-'}
                </Badge>
            </div>
        ),
    },
    {
        accessorKey: "url",
        header: "Link",
        cell: ({ row }) => {
            return (
                <Button variant='link' size='icon' className="cursor-pointer hover:text-blue-700" asChild>
                    <a href={row.original.url} target="_blank">
                        <ExternalLink />
                    </a>
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row, table }) => (
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
                    <DropdownMenuItem onClick={() => table.options.meta?.action('complete', row.original.id)}>Complete</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => table.options.meta?.action('copy', row.original.id)}>Copy</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => table.options.meta?.action('edit', row.original.id)}>Edit</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => table.options.meta?.action('remove', row.original.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
]

export const filters = [{
    id: 'status',
    value: 'all'
}]

export const filterComponent = (table: Table<Wish>) => {
    return (
        <div className="flex items-center gap-2 w-32">
            <Select defaultValue='all' onValueChange={(val) => {
                table.getColumn('status')?.setFilterValue(val)
            }}>
                <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">
                        All
                    </SelectItem>
                    <SelectItem value="completed">
                        Completed
                    </SelectItem>
                    <SelectItem value="incompleted">
                        Incompleted
                    </SelectItem>
                </SelectContent>
            </Select>
        </div>
    )
}