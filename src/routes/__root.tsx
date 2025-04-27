import { RouterContext } from '@/interfaces/router-context'
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import * as React from 'react'
import { Toaster } from 'sonner'

export const Route = createRootRouteWithContext<RouterContext>()({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            <Outlet />
            <Toaster richColors />
        </React.Fragment>
    )
}
