import { DialogUserAtom } from "@/atoms/dialog-user-atom"
import { DialogFooter } from "@/components/ui/dialog"
import { useLogout } from "@/hooks/useLogout"
import { useChangePasswordMutation } from "@/queries/useUsersMutation"
import { useSetAtom } from "jotai"
import z from "zod"
import { useAppForm } from "../app-form"
import { toast } from "sonner"

const formSchema = z.object({
    password: z.string().min(4)
})

export function UserChangePasswordContent() {
    const mutation = useChangePasswordMutation()
    const setUser = useSetAtom(DialogUserAtom)
    const logout = useLogout()
    const form = useAppForm({
        defaultValues: {
            password: ''
        },
        validators: {
            onChange: formSchema
        },
        onSubmit: async ({ value, formApi }) => {
            try {
                await mutation.mutateAsync(value.password)
                formApi.reset()

                // close dialog
                setUser(undefined)
                logout()
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message)
                }
            }
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
                    <form.AppField name="password" children={(field) => <field.TextField label="New Password" type="password" />} />
                    <DialogFooter className="mt-auto flex gap-2 sm:flex-col sm:space-x-0">
                        <form.SubmitButton />
                    </DialogFooter>
                </form>
            </div>
        </form.AppForm>
    )
}