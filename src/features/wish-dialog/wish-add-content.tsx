import { Checkbox } from "@/components/ui/checkbox";
import { Wish } from "@/entities/wish";
import { useAddWishMutation } from "@/queries/useWishesMutation";
import { useState } from "react";
import { AddWishByUrl } from "./add-wish-by-url";
import { WishForm } from "./wish-form";


export function WishAddContent() {
    const [isByUrl, setIsByUrl] = useState(false)
    const mutation = useAddWishMutation()

    const handleSubmit = async (wish: Wish) => {
        await mutation.mutateAsync(wish)
    }

    return (
        <>
            <div className="flex items-center space-x-2">
                <Checkbox id="edit" checked={isByUrl} onCheckedChange={(e) => setIsByUrl(e === true)} />
                <label
                    htmlFor="edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    By Url
                </label>
            </div>
            {isByUrl ? <AddWishByUrl /> : <WishForm disabled={false} onSubmit={handleSubmit} />}
        </>
    )
}