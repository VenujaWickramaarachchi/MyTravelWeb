export interface BreadcrumbItem {
  label: string
  href?: string
}

const SITE_URL = 'https://vioralanka.com'

export function createBreadcrumbs(
  sectionLabel: string,
  sectionPath: string,
  currentLabel: string,
): BreadcrumbItem[] {
  return [
    {
      label: 'Home',
      href: `${SITE_URL}/`,
    },
    {
      label: sectionLabel,
      href: `${SITE_URL}/${sectionPath}`,
    },
    {
      label: currentLabel,
    },
  ]
}
