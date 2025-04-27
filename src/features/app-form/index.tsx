
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { LoaderCircle } from 'lucide-react';

export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts()



export const TextField = ({ label, type = 'text', disabled = false }: { label: string, type?: string, disabled?: boolean }) => {
    const field = useFieldContext<string>()
    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor={field.name}>{label}</Label>
            <Input
                id={field.name}
                type={type}
                name={field.name}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

export const CheckboxField = ({ label, disabled = false }: { label: string, disabled?: boolean }) => {
    const field = useFieldContext<boolean>()
    return (
        <div className="flex flex-row gap-3">
            <Checkbox
                id={field.name}
                name={field.name}
                checked={field.state.value ?? false}
                onCheckedChange={e => field.handleChange(e === true)}
                onBlur={field.handleBlur}
                disabled={disabled}
            />
            <Label htmlFor={field.name}>{label}</Label>
        </div>
    )
}

export const TextAreaField = ({ label, disabled = false }: { label: string, disabled?: boolean }) => {
    const field = useFieldContext<string>()
    return (
        <div className="flex flex-col gap-3">
            <Label htmlFor={field.name}>{label}</Label>
            <Textarea
                id={field.name}
                name={field.name}
                rows={4}
                value={field.state.value ?? ''}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}

export const SubmitButton = ({ label = 'Submit', disabled = false }: { label?: string, disabled?: boolean }) => {
    const form = useFormContext()
    return (
        <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
            {([canSubmit, isSubmitting]) =>
                <Button type='submit' disabled={!canSubmit || isSubmitting || disabled} className="w-full">
                    {isSubmitting && (<LoaderCircle />)}
                    {label}
                </Button>}
        </form.Subscribe>
    )
}

export const { useAppForm } = createFormHook({
    fieldComponents: {
        TextField,
        CheckboxField,
        TextAreaField
    },
    formComponents: {
        SubmitButton
    },
    fieldContext,
    formContext,
})