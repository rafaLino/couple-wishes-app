import { DialogWishAtom } from "@/atoms/dialog-wish-atom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useAddUrlWishMutation } from "@/queries/useWishesMutation";
import { useSetAtom } from "jotai";
import { LoaderCircle } from "lucide-react";
import { KeyboardEvent, useState } from "react";


export function AddWishByUrl() {
    const mutation = useAddUrlWishMutation()
    const [value, setValue] = useState<string>('')
    const setSelectedWish = useSetAtom(DialogWishAtom)

    const save = async () => {
        await mutation.mutateAsync(value)
        setValue('')

        //close modal
        setSelectedWish(undefined)
    }
    const handleEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key !== 'Enter')
            return

        save()
    }

    const handleClick = () => save

    return (
        <>
            <div className="flex flex-col space-y-2">
                <label
                    htmlFor="edit"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Paste a wish url here!
                </label>
                <Input
                    className={cn(mutation.isError && 'border-red-400')}
                    type="text"
                    name="byurl"
                    value={value}
                    disabled={mutation.isPending}
                    onChange={(event) => setValue(event.target.value)} onKeyDown={handleEnter}
                />
                <span className="text-sm text-red-500">{mutation.error?.message}</span>
            </div>
            <Button onClick={handleClick}>
                {mutation.isPending && (<LoaderCircle className="w-4 h-4 animate-spin" />)}
                Submit
            </Button>
        </>
    )
}