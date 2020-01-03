import defaultSettings from '@/settings'

const title = defaultSettings.title || '家政预约平台 Template'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
