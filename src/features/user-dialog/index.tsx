import { DialogUserAtom } from "@/atoms/dialog-user-atom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { UserAddContent } from "./user-add-content";
import { UserEditContent } from "./user-edit-content";


export function UserDialog() {
    const [user, setUser] = useAtom(DialogUserAtom)
    const open = Boolean(user)

    const isEdition = !!user?.id

    const close = () => setUser(undefined)

    return (
        <Dialog open={open} onOpenChange={close} >
            <DialogContent className="flex flex-col p-4 min-w-4xl h-[62vh]">
                <DialogHeader className="flex justify-center">
                    <DialogTitle>{isEdition ? 'Edit' : 'Create'} User</DialogTitle>
                    <DialogDescription>Check and Edit your users here</DialogDescription>
                </DialogHeader>
                {isEdition ? <UserEditContent open={open} /> : <UserAddContent />}
            </DialogContent>
        </Dialog>
    )
}