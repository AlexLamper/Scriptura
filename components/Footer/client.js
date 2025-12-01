'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../app/i18n/client'

export const Footer = () => {
  const { t, i18n } = useTranslation('footer')
  const lng = i18n.resolvedLanguage
  return <FooterBase t={t} lng={lng} />
}