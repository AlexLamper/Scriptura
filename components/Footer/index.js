import { useTranslation } from '../../../i18n'
import { FooterBase } from './FooterBase'

export const Footer = async () => {
  const { t } = await useTranslation('footer')
  const lng = 'en' // Default or get from cookie if needed for display, but FooterBase handles it via client
  return <FooterBase t={t} lng={lng} />
}