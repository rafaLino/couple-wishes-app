import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useCreateDefaultMutation } from "@/queries/useUsersMutation"
import { Link } from "@tanstack/react-router"
import { LoaderCircle } from "lucide-react"

export function CreateDefaultUser() {
    const mutation = useCreateDefaultMutation()
    const handleCreate = () => mutation.mutate()
    return (
        <div className='w-screen h-screen flex justify-center items-center'>
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create default user</CardTitle>
                    <CardDescription>Create your default user, manage others with them</CardDescription>
                </CardHeader>
                <CardContent>
                    <div
                        className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                    >
                        <span className={cn("flex h-2 w-2 translate-y-1 rounded-full", mutation.isError ? 'bg-red-500' : 'bg-sky-500')} />
                        <div className="flex flex-col space-y-4 justify-center">
                            <p className="text-sm font-medium leading-none">
                                {mutation.isError ? mutation.failureReason?.message : 'Your default user has been created!'}
                            </p>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex">
                    {mutation.isSuccess ? (
                        <Button variant='outline' className='w-full' asChild>
                            <Link to='/login'>Return to login</Link>
                        </Button>
                    ) : (
                        <Button className='w-full' onClick={handleCreate}>
                            {mutation.isPending ? (<LoaderCircle className='w-4 h-4 animate-spin' />) : 'Create'}
                        </Button>
                    )}
                </CardFooter>
            </Card>

        </div>
    )
}