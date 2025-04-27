import { DialogUserAtom } from "@/atoms/dialog-user-atom"
import { Button } from "@/components/ui/button"
import { useDeleteUserMutation, useLinkUserMutation, useUnLinkUserMutation } from "@/queries/useUsersMutation"
import { useUsersQuery } from "@/queries/useUsersQuery"
import { useSetAtom } from "jotai"
import { CirclePlus } from "lucide-react"
import { BaseDataTable } from "../data-table"
import { UserDialog } from "../user-dialog"
import { columns, DataTableActions } from "./table"
import { RefreshUserDialog } from "./refresh-user-dialog"
import { useState } from "react"
import api from "@/lib/api"

export function UserList() {
    const setSelected = useSetAtom(DialogUserAtom)
    const [confirmDialogOpened, setConfirmDialogOpened] = useState(false)

    const removeMutation = useDeleteUserMutation()
    const linkMutation = useLinkUserMutation()
    const unlinkMutation = useUnLinkUserMutation()

    const { data } = useUsersQuery()

    const handleAction = async (state: DataTableActions, id: number) => {
        switch (state) {
            case 'remove': {
                removeMutation.mutate(id)
                return
            }
            case 'edit': {
                setSelected(data.find(item => item.id === id))
                return
            }
            case 'link': {
                const username = data.find(item => item.id === id)?.username
                linkMutation.mutate(username!, {
                    onSuccess: () => {
                        setConfirmDialogOpened(true)
                    }
                })
                return
            }
            case 'unlink': {
                const couple_id = data.find(item => item.id === id)?.couple_id
                await unlinkMutation.mutateAsync(couple_id!, {
                    onSuccess: () => {
                        setConfirmDialogOpened(true)
                    }
                })

            }
        }
    }


    const handleAddAction = () => {
        setSelected({
            id: 0, //fake user
            couple_id: 0,
            name: '',
            username: '',
        })
    }

    const handleConfirm = async () => {
        await api.users.refresh()
        setConfirmDialogOpened(false)
    }

    return (
        <div className='flex flex-col mt-20 gap-2'>
            <div className="flex justify-end">
                <Button onClick={handleAddAction}>
                    <CirclePlus />
                    Add new user
                </Button>
            </div>
            <BaseDataTable name="users" data={data} columns={columns} onAction={handleAction} />
            <UserDialog />
            <RefreshUserDialog open={confirmDialogOpened} onConfirm={handleConfirm} />
        </div>
    )
}