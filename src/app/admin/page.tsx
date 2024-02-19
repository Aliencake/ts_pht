'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import Loading from '../components/Loading';
import NavBar from '../components/adminComponents/AdminNavBar';
import LinksBoard from '../components/adminComponents/LinksBoard';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import CategoriesBoard from '../components/adminComponents/CategoriesBoard';

const queryClient = new QueryClient();

export default function Page() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/admin/login');
    },
  });
  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <main className="flex flex-col sm:items-center h-full space-y-6">
        <NavBar />
        <Tabs defaultValue="categories">
          <div className="overflow-auto flex flex-col items-center">
            <TabsList>
              <TabsTrigger value="categories">Категорії та медіа</TabsTrigger>
              <TabsTrigger value="links">Посилання</TabsTrigger>
              <TabsTrigger value="activity">Активність</TabsTrigger>
            </TabsList>
          </div>
          <div className="overflow-auto">
            <TabsContent value="categories">
              <CategoriesBoard queryClient={queryClient} />
            </TabsContent>
            <TabsContent value="links">
              <LinksBoard queryClient={queryClient} />
            </TabsContent>
            <TabsContent value="activity">
              Тут буде активність сайту
            </TabsContent>
          </div>
        </Tabs>
      </main>
    </QueryClientProvider>
  );
}
