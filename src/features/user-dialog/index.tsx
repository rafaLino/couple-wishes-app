import { DialogUserAtom } from "@/atoms/dialog-user-atom";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "@/components/ui/sidebar";
import { useAtom } from "jotai";
import { useMemo, useState } from "react";
import { UserDialogContent } from "./dialog";
import { cn } from "@/lib/utils";


export function UserDialog() {
    const [user, setUser] = useAtom(DialogUserAtom)
    const open = Boolean(user)
    const [activeOption, setActiveOption] = useState(0)

    const isEdition = !!user?.id

    const navigation = useMemo(() => [
        { name: isEdition ? 'Edit' : 'Create' },
        { name: "Update Password", disabled: !isEdition }
    ], [isEdition])

    const close = () => setUser(undefined)

    return (
        <Dialog open={open} onOpenChange={close}>
            <DialogContent className="overflow-hidden p-4 md:max-h-[500px] md:max-w-[700px] lg:max-w-[900px]">
                <DialogTitle className="sr-only">{isEdition ? 'Edit' : 'Create'} User</DialogTitle>
                <DialogDescription className="sr-only">
                    Customize your users here.
                </DialogDescription>
                <SidebarProvider className="items-start">
                    <Sidebar collapsible="none" className="hidden md:flex">
                        <SidebarContent>
                            <SidebarGroup>
                                <SidebarGroupContent>
                                    <SidebarMenu>
                                        {navigation.map((item, index) => (
                                            <SidebarMenuItem key={item.name}>
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={index === activeOption}
                                                    disabled={item.disabled}
                                                >
                                                    <a aria-disabled={item.disabled} className={cn((item.disabled && 'text-gray-400'))} onClick={() => setActiveOption(index)}>
                                                        <span>{item.name}</span>
                                                    </a>
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </SidebarGroupContent>
                            </SidebarGroup>
                        </SidebarContent>
                    </Sidebar>
                    <main className="flex h-[480px] flex-1 flex-col overflow-hidden">
                        <div className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 pt-0">
                            <UserDialogContent activeOption={activeOption} isEdition={isEdition} open={open} />
                        </div>
                    </main>
                </SidebarProvider>
            </DialogContent>
        </Dialog>
    )
}