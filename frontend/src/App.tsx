import { AppRouterProvider, QueryProvider } from '@app/providers';

function App({ children }: { children: React.ReactNode }) {
    return (
        <QueryProvider>
            <AppRouterProvider>{children}</AppRouterProvider>
        </QueryProvider>
    );
}

export default App;
