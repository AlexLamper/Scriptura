'use client'

import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'
import { languages } from '../../app/i18n/settings'
import { useRouter } from 'next/navigation'

export const FooterBase = ({ t, lng }) => {
  const router = useRouter()
  const currentPath = router.asPath

  return (
    <footer style={{ marginTop: 50 }}>
      <Trans i18nKey="languageSwitcher" t={t}>
        Switch from <strong>{lng}</strong> to:{' '}
      </Trans>
      {languages.filter((l) => lng !== l).map((l, index) => (
        <span key={l}>
          {index > 0 && ' or '}
          <Link href={`/${l}${currentPath}`}>
            {l}
          </Link>
        </span>
      ))}
    </footer>
  )
}
