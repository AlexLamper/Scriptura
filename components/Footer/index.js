import { useTranslation as getTranslation } from '../../../i18n'
import { FooterBase } from './FooterBase'

export const Footer = async () => {
  const { t, i18n } = await getTranslation('footer')
  const lng = i18n.language
  return <FooterBase t={t} lng={lng} />
}