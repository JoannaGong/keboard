import defaultSettings from '@/settings'

const title = defaultSettings.title || '磕board'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
