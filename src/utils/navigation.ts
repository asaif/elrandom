import { ui } from '@/i18n/ui'
import { getPageInfo } from '@/utils/page'

export interface NavItem {
  href: string
  label: string
  isActive: boolean
}

export interface NavItemWithClass extends NavItem {
  className: string
}

/**
 * Get navigation items with active states
 */
export function getNavigationItems(pathname: string): NavItem[] {
  const { currentLang, isHome, isPost, isTag, isAbout } = getPageInfo(pathname)
  const currentUI = ui[currentLang as keyof typeof ui] ?? {}
  
  // Check if current page is archive
  const isArchive = pathname.includes('/archive')
  
  const isPostActive = isHome || isPost
  const isTagActive = isTag
  const isAboutActive = isAbout
  const isArchiveActive = isArchive

  return [
    {
      href: '/',
      label: currentUI.posts,
      isActive: isPostActive,
    },
    {
      href: '/tags/',
      label: currentUI.tags,
      isActive: isTagActive,
    },
    {
      href: '/about/',
      label: currentUI.about,
      isActive: isAboutActive,
    },
    {
      href: '/archive/',
      label: currentUI.archive || 'Archive',
      isActive: isArchiveActive,
    },
  ]
}

/**
 * Get navigation items with CSS classes for desktop navbar
 */
export function getNavigationItemsWithClasses(pathname: string): NavItemWithClass[] {
  const navItems = getNavigationItems(pathname)
  
  return navItems.map(item => ({
    ...item,
    className: getNavItemClass(item.isActive)
  }))
}

/**
 * Generate CSS class for navigation items
 */
function getNavItemClass(isActive: boolean): string {
  return isActive
    ? 'highlight-static c-primary font-bold after:bottom-0.15em'
    : 'highlight-hover transition-[colors,font-weight] after:bottom-0.15em hover:(c-primary font-bold)'
}
