import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu } from "@/components/ui/sidebar"
import { ComponentPropsWithoutRef, FC } from "react"
import { useAuth } from "../auth"
import { NavUser } from "./nav-user"

export const AppSiderBar: FC<ComponentPropsWithoutRef<typeof Sidebar>> = (props) => {
    const { getUser } = useAuth()
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <NavUser user={getUser()} />
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
            </SidebarContent>
            <SidebarFooter>
            </SidebarFooter>
        </Sidebar>
    )
}