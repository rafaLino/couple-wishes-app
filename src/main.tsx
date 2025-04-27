import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { useAuth } from './features/auth/index.tsx'
import './index.css'
import { routeTree } from './routeTree.gen.ts'

const twentyMinutes = 1000 * 60 * 20;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: twentyMinutes,
      refetchOnWindowFocus: false,
      retry: 2
    }
  }
})

const router = createRouter({
  routeTree,
  context: {
    queryClient,
    auth: undefined!
  },
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
  scrollRestoration: true
})

// Register things for typesafety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
)
