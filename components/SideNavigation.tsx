'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { BarChart, FileText } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export function SideNavigation() {
  const [activeTab, setActiveTab] = useState<'responses' | 'analytics' | 'funnel_stats'>('responses')
  const router = useRouter()

  const handleTabChange = (tab: 'responses' | 'analytics' | 'funnel_stats') => {
    setActiveTab(tab)
    if (tab === 'responses') {
      router.push('/dashboard')
    } else if (tab === 'analytics') {
        router.push('/analytics')
      console.log('Analytics tab clicked')
    }
    else{
      router.push('/funnel_statistics')
    }
  }

  return (
    <Sidebar>
      <SidebarHeader>
        <h2 className="text-xl font-bold px-4 py-2">Admin Dashboard</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleTabChange('responses')}
              isActive={activeTab === 'responses'}
            >
              <FileText className="mr-2" />
              Responses
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleTabChange('analytics')}
              isActive={activeTab === 'analytics'}
            >
              <BarChart className="mr-2" />
              Analytics
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleTabChange('funnel_stats')}
              isActive={activeTab === 'funnel_stats'}
            >
              <FileText className="mr-2" />
              Funnel Statistics
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

