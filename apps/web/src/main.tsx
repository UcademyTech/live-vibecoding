import 'antd/dist/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';

const queryClient = new QueryClient();
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ConfigProvider locale={esES}>
        <App />
      </ConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
);
