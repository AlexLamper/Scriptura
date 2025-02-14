import { useTranslation } from '../../../i18n'
import { FooterBase } from './FooterBase'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}