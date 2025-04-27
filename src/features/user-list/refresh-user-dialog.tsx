import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"

type Props = {
    open: boolean;
    onConfirm: () => void;
}
export function RefreshUserDialog({ open, onConfirm }: Props) {
    return (
        <AlertDialog open={open} onOpenChange={onConfirm}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Refresh your user data!</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action will load your current data!
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={onConfirm}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
