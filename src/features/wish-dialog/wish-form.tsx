import { DialogWishAtom } from "@/atoms/dialog-wish-atom";
import { DialogFooter } from "@/components/ui/dialog";
import { Schema, Wish } from "@/entities/wish";
import { useAtom } from "jotai";
import { useAppForm } from "../app-form";

type Props = {
    disabled: boolean,
    onSubmit: (value: Wish) => Promise<void>
}

export function WishForm({ disabled, onSubmit }: Props) {
    const [wish, setWish] = useAtom(DialogWishAtom)

    const form = useAppForm({
        defaultValues: wish,
        validators: {
            onChange: Schema
        },
        onSubmit: async ({ value, formApi }) => {
            await onSubmit(value)
            formApi.reset()
            //close dialog
            setWish(undefined)

        },
    })

    return (
        <form.AppForm>
            <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-6 text-sm">
                <form className="flex flex-col gap-4"
                    onSubmit={e => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}>

                    <form.AppField name="completed" children={(field) => <field.CheckboxField label="Completed" disabled={disabled} />} />
                    <form.AppField name="title" children={(field) => <field.TextField label="Title" disabled={disabled} />} />
                    <form.AppField name="url" children={(field) => <field.TextField label="Link" disabled={disabled} />} />
                    <form.AppField name="price" children={(field) => <field.TextField label="Price" disabled={disabled} />} />
                    <form.AppField name="description" children={(field) => <field.TextAreaField label="Description" disabled={disabled} />} />
                    <DialogFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                        <form.SubmitButton disabled={disabled} />
                    </DialogFooter>
                </form>
            </div>
        </form.AppForm>
    )
}