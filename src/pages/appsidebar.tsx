import { Avatar } from '@/components/ui/avatar'
import {
  Dropdown,
  DropdownButton,
} from '@/components/ui/dropdown'
import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/ui/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarHeading,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
  SidebarSpacer,
} from '@/components/ui/sidebar'
import { SidebarLayout } from '@/components/ui/sidebar-layout'
import {
  InboxIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  CodeBracketIcon,
  GlobeAltIcon,
  DevicePhoneMobileIcon,
  ShieldCheckIcon as ShieldIcon,
  CpuChipIcon,
  CircleStackIcon,
  CloudIcon,
  WrenchScrewdriverIcon,
  PuzzlePieceIcon,
  ServerIcon,
} from '@heroicons/react/20/solid'
import { Outlet, useLocation } from 'react-router-dom'

const softwareDevItems = [
  { path: '/software_engineer', label: 'Software Engineer', icon: <CodeBracketIcon className="w-5 h-5" /> },
  { path: '/web_developer', label: 'Web Developer', icon: <GlobeAltIcon className="w-5 h-5" /> },
  { path: '/mobile_developer', label: 'Mobile Developer', icon: <DevicePhoneMobileIcon className="w-5 h-5" /> },
  { path: '/cyber_security_specialist', label: 'Cyber Security Specialist', icon: <ShieldIcon className="w-5 h-5" /> },
  { path: '/ai_engineer', label: 'AI Engineer', icon: <CpuChipIcon className="w-5 h-5" /> },
  { path: '/data_scientist', label: 'Data Scientist', icon: <CircleStackIcon className="w-5 h-5" /> },
  { path: '/cloud_engineer', label: 'Cloud Engineer', icon: <CloudIcon className="w-5 h-5" /> },
  { path: '/devops_engineer', label: 'DevOps Engineer', icon: <WrenchScrewdriverIcon className="w-5 h-5" /> },
  { path: '/game_developer', label: 'Game Developer', icon: <PuzzlePieceIcon className="w-5 h-5" /> },
  { path: '/network_engineer', label: 'Network Engineer', icon: <ServerIcon className="w-5 h-5" /> },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <NavbarItem  aria-label="Search">
              <MagnifyingGlassIcon />
            </NavbarItem>
            <NavbarItem  aria-label="Inbox">
              <InboxIcon />
            </NavbarItem>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/profile-photo.jpg" square />
              </DropdownButton>
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <img src="/logo.png" alt="Logo" className="h-12 w-auto mx-auto" />
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarHeading>Software Dev. & Eng.</SidebarHeading>
              {softwareDevItems.map((item) => (
                <SidebarItem 
                  key={item.path}
                  current={pathname.startsWith(item.path)}
                  href={item.path}
                >
                  {item.icon}
                  <SidebarLabel>{item.label}</SidebarLabel>
                </SidebarItem>
              ))}
            </SidebarSection>
            <SidebarSpacer />
            <SidebarSection>
              <SidebarItem 
                current={pathname.startsWith("/lms-features")}
                href="/lms-features"
              >
                <SparklesIcon className="w-5 h-5" />
                <SidebarLabel>LMS Features</SidebarLabel>
              </SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      <Outlet/>
    </SidebarLayout>
  )
}