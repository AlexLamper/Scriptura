'use client'

import { FooterBase } from './FooterBase'
import { useTranslation } from '../../app/i18n/client'

export const Footer = ({ lng }) => {
  const { t } = useTranslation(lng, 'footer')
  return <FooterBase t={t} lng={lng} />
}