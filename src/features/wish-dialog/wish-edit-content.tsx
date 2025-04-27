import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { WishForm } from "./wish-form";
import { Wish } from "@/entities/wish";
import { useUpdateWishMutation } from "@/queries/useWishesMutation";

type Props = {
    open: boolean
}
export function WishEditContent({ open }: Props) {
    const [enableEdition, setEnableEdition] = useState(false)
    const mutation = useUpdateWishMutation()

    useEffect(() => {
        setEnableEdition(false)
    }, [open])

    const handleSubmit = async (wish: Wish) => {
        await mutation.mutateAsync(wish)
    }
    return (
        <>
            <div className="flex items-center space-x-2">
                <Checkbox id="edit" checked={enableEdition} onCheckedChange={(e) => setEnableEdition(e === true)} />
                <label
                    htmlFor="edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Enable edition
                </label>
            </div>
            <WishForm disabled={!enableEdition} onSubmit={handleSubmit} />
        </>
    )
}