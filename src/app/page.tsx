import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, LogOut } from 'lucide-react';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Dashboard } from '@/app/dashboard/page';

export default function Home() {
  return (
    <div className="flex min-h-screen">
      <Sidebar>
        <SidebarHeader>
          <h1 className="font-headline text-2xl font-bold text-primary">
            TaskEase
          </h1>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton href="/dashboard" isActive>
                <LayoutDashboard />
                Dashboard
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <Button variant="ghost" className="justify-start">
            <LogOut />
            Logout
          </Button>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <Header>
          <SidebarTrigger />
        </Header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 md:p-12">
            <Dashboard />
        </main>
        <Footer />
      </SidebarInset>
    </div>
  );
}
