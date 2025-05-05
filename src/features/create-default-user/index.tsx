import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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
                    {mutation.isError && (
                        <div
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className={("flex h-2 w-2 translate-y-1 rounded-full bg-red-500")} />
                            <div className="flex flex-col space-y-4 justify-center">
                                <p className="text-sm font-medium leading-none">
                                    {mutation.failureReason?.message}
                                </p>
                            </div>
                        </div>
                    )}
                    {mutation.isSuccess && (
                        <div
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className={("flex h-2 w-2 translate-y-1 rounded-full bg-sky-500")} />
                            <div className="flex flex-col space-y-4 justify-center">
                                <p className="text-sm font-medium leading-none">
                                    Your default user has been created!
                                </p>
                            </div>
                        </div>
                    )}
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