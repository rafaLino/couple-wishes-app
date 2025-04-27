import { DialogUserAtom } from "@/atoms/dialog-user-atom";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogFooter } from "@/components/ui/dialog";
import { Schema } from "@/entities/user";
import { useUpdateUserMutation } from "@/queries/useUsersMutation";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { useAppForm } from "../app-form";

type Props = {
    open: boolean
}
export function UserEditContent({ open }: Props) {
    const [enableEdition, setEnableEdition] = useState(false)
    const mutation = useUpdateUserMutation()
    const [user, setUser] = useAtom(DialogUserAtom)

    const form = useAppForm({
        defaultValues: user,
        validators: {
            onChange: Schema
        },
        onSubmit: async ({ value, formApi }) => {
            await mutation.mutateAsync(value)
            formApi.reset()
            //close dialog
            setUser(undefined)

        },
    })

    useEffect(() => {
        setEnableEdition(false)
    }, [open])

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
            <form.AppForm>
                <div className="flex flex-1 flex-col gap-4 overflow-y-auto py-6 text-sm">
                    <form className="flex flex-col gap-4"
                        onSubmit={e => {
                            e.preventDefault()
                            e.stopPropagation()
                            form.handleSubmit()
                        }}>

                        <form.AppField name="name" children={(field) => <field.TextField label="Name" disabled={!enableEdition} />} />
                        <form.AppField name="username" children={(field) => <field.TextField label="Username" disabled={!enableEdition} />} />
                        <DialogFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                            <form.SubmitButton disabled={!enableEdition} />
                        </DialogFooter>
                    </form>
                </div>
            </form.AppForm>
        </>
    )
}