import { CreateUserSchema } from "@/entities/user";
import { useAddUserMutation } from "@/queries/useUsersMutation";
import { useAppForm } from "../app-form";
import { DialogFooter } from "@/components/ui/dialog";
import { useSetAtom } from "jotai";
import { DialogUserAtom } from "@/atoms/dialog-user-atom";


export function UserAddContent() {
    const mutation = useAddUserMutation()
    const setUser = useSetAtom(DialogUserAtom)
    const form = useAppForm({
        defaultValues: {
            name: '',
            username: '',
            phone: '',
            password: ''

        },
        validators: {
            onChange: CreateUserSchema
        },
        onSubmit: async ({ value, formApi }) => {
            await mutation.mutateAsync(value)
            formApi.reset()
            // close dialog
            setUser(undefined)
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

                    <form.AppField name="name" children={(field) => <field.TextField label="Name" />} />
                    <form.AppField name="username" children={(field) => <field.TextField label="Username" />} />
                    <form.AppField name="phone" children={(field) => <field.TextField label="Phone" type="number" />} />
                    <form.AppField name="password" children={(field) => <field.TextField label="Password" type="password" />} />
                    <DialogFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                        <form.SubmitButton />
                    </DialogFooter>
                </form>
            </div>
        </form.AppForm>
    )
}