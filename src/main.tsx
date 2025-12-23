import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryProvider } from './app/providers/query-provider.tsx'
import { RouterProvider } from 'react-router-dom'
import router from './app/router.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
    <RouterProvider router={router}/>
    </QueryProvider>
  </StrictMode>,
)
