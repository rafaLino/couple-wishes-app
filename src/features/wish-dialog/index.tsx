import { DialogWishAtom } from "@/atoms/dialog-wish-atom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAtom } from "jotai";
import { WishEditContent } from "./wish-edit-content";
import { WishAddContent } from "./wish-add-content";


export function WishDialog() {
    const [wish, setWish] = useAtom(DialogWishAtom)
    const open = Boolean(wish)

    const isEdition = !!wish?.id

    const close = () => setWish(undefined)

    return (
        <Dialog open={open} onOpenChange={close} >
            <DialogContent className="flex flex-col p-4 min-w-4xl h-[62vh]">
                <DialogHeader className="flex justify-center">
                    <DialogTitle>{isEdition ? 'Edit' : 'Create'} Wish</DialogTitle>
                    <DialogDescription>Check and Edit your wishes here</DialogDescription>
                </DialogHeader>
                {isEdition ? <WishEditContent open={open} /> : <WishAddContent />}
            </DialogContent>
        </Dialog >
    )
}