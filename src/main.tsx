import React from 'react'
import ReactDOM from 'react-dom/client'
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { notification } from 'antd'
import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      notification.error({
        message: 'Error',
        description: (error as Error).message,
      });
    }
  }),
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode >,
)
