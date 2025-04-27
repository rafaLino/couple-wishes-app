import { DialogWishAtom } from "@/atoms/dialog-wish-atom"
import { Button } from "@/components/ui/button"
import { useDeleteWishMutation, useUpdateWishMutation } from "@/queries/useWishesMutation"
import { useWishesQuery } from "@/queries/useWishesQuery"
import { useSetAtom } from "jotai"
import { CirclePlus } from "lucide-react"
import { BaseDataTable } from "../data-table"
import { WishDialog } from "../wish-dialog"
import { columns, DataTableActions, filterComponent, filters } from "./table"

export function WishList() {
    const setSelected = useSetAtom(DialogWishAtom)
    const removeMutation = useDeleteWishMutation()
    const updateMutation = useUpdateWishMutation()

    const { data } = useWishesQuery()

    const handleAction = (state: DataTableActions, id: number) => {
        switch (state) {
            case 'openDialog': {
                setSelected(data.find(item => item.id === id))
                return
            }
            case 'complete': {
                const wish = data.find(item => item.id === id)!
                updateMutation.mutate({ ...wish, completed: true })
                return
            }
            case 'copy': {
                const item = data.find(item => item.id === id)!;
                const copy = { ...item, id: 0 }
                setSelected(copy)
                return
            }
            case 'remove': {
                removeMutation.mutate(id)
                return
            }
            case 'edit': {
                setSelected(data.find(item => item.id === id))
                return
            }
        }
    }

    const handleAddAction = () => {
        setSelected({
            id: 0, //fake wish
            title: '',
            url: '',
            description: '',
            price: '',
            completed: false
        })
    }

    return (
        <div className='flex flex-col mt-20 gap-2'>
            <div className="flex justify-end">
                <Button onClick={handleAddAction}>
                    <CirclePlus />
                    Add new wish
                </Button>
            </div>
            <BaseDataTable name="wishes" data={data} columns={columns} filters={filters} filterComponent={filterComponent} onAction={handleAction} />
            <WishDialog />
        </div>
    )
}