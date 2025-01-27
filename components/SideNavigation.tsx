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
  const [activeTab, setActiveTab] = useState<'responses' | 'analytics' | 'statistics' | 'purchase'>('responses')
  const router = useRouter()

  const handleTabChange = (tab: 'responses' | 'analytics' | 'statistics' | 'purchase') => {
    setActiveTab(tab)
    if (tab === 'responses') {
      router.push('/dashboard')
    } else if (tab === 'analytics') {
        router.push('/analytics')
      console.log('Analytics tab clicked')
    }
    else if(tab === 'statistics'){
      router.push('/statistics')
      console.log('Statistics tab clicked')
    }
    else{
      router.push('/purchase')
      console.log('Statistics tab clicked')
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
              onClick={() => handleTabChange('statistics')}
              isActive={activeTab === 'statistics'}
            >
              <FileText className="mr-2" />
              Funnel Statistics
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleTabChange('purchase')}
              isActive={activeTab === 'purchase'}
            >
              <FileText className="mr-2" />
              Purchase Statistics
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

