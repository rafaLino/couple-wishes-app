import { UserAddContent } from "./user-add-content";
import { UserChangePasswordContent } from "./user-change-password-content";
import { UserEditContent } from "./user-edit-content";

type Props = {
    isEdition: boolean;
    open: boolean;
    activeOption: number;
}



export function UserDialogContent({ activeOption, isEdition, open }: Props) {

    switch (activeOption) {
        case 0: {
            return isEdition ? <UserEditContent open={open} /> : <UserAddContent />
        }
        case 1: {
            return <UserChangePasswordContent />
        }
    }
}
