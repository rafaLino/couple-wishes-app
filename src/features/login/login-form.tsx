import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/queries/useLoginMutation";
import { AnyFieldApi, useForm } from "@tanstack/react-form";
import { useNavigate } from "@tanstack/react-router";
import { LoaderCircle, MessageCircleWarning } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { z } from "zod";


const formSchema = z.object({
    username: z.string().regex(/^@\w*/, { error: 'username should start with "@"' }).min(2).max(10),
    password: z.string().min(4)
})

const isError = (field: AnyFieldApi) => {
    return field.state.meta.isTouched && field.state.meta.errors.length
}

export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const mutation = useLoginMutation()
    const navigate = useNavigate()
    const form = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        validators: {
            onChange: formSchema
        },
        onSubmit: async ({ value }) => {
            try {
                await mutation.mutateAsync(value)
                navigate({ to: '/' })
            } catch (err) {
                const error = err as Error
                toast.error(error.message, {
                    dismissible: true,
                    icon: <MessageCircleWarning />,
                })
            }
        }
    })

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        event.stopPropagation()
        form.handleSubmit()
    }
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your username below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <form.Field
                                name="username"
                                children={(field) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}>Username</Label>
                                        <Input
                                            id={field.name}
                                            type="text"
                                            placeholder="@"
                                            required
                                            onBlur={field.handleBlur}
                                            onChange={e => field.handleChange(e.target.value)}
                                            className={cn(isError(field) && 'border-red-400 focus-visible:ring-red-400 focus-visible:ring')}
                                        />
                                    </div>
                                )}
                            />
                            <form.Field
                                name="password"
                                children={(field) => (
                                    <div className="grid gap-2">
                                        <Label htmlFor={field.name}>Password</Label>
                                        <Input
                                            id={field.name}
                                            type="password"
                                            value={field.state.value}
                                            required
                                            onBlur={field.handleBlur}
                                            onChange={e => field.handleChange(e.target.value)}
                                            className={cn(isError(field) && 'border-red-400 focus-visible:ring-red-400 focus-visible:ring')}
                                        />
                                    </div>
                                )}
                            />
                            <form.Subscribe
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([canSubmit, isSubmitting]) => (
                                    <Button type="submit" className="w-full cursor-pointer" disabled={!canSubmit}>
                                        {isSubmitting ? <LoaderCircle className="animate-spin" /> : 'Login'}
                                    </Button>
                                )}
                            />
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}