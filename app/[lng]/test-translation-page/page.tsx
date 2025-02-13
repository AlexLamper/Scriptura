'use client'

import Link from 'next/link'
import { useTranslation } from '../../i18n/client'
import { Footer } from '../../../components/Footer/client'
import { useState } from 'react'

interface PageParams {
  params: {
    lng: string;
  };
}

export default function Page({ params: { lng } }: PageParams) {
  const { t } = useTranslation(lng, 'client-page')
  const [counter, setCounter] = useState(0)

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-blue-500 to-teal-400 text-white font-mono flex flex-col items-center justify-center p-6 space-y-8">
      <h1 className="text-4xl font-bold text-center animate__animated animate__fadeIn">{t('title')}</h1>

      <p className="text-lg text-center animate__animated animate__fadeIn animate__delay-1s">
        {t('counter', { count: counter })}
      </p>

      <div className="flex space-x-4">
        <button
          onClick={() => setCounter(Math.max(0, counter - 1))}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 duration-300"
        >
          -
        </button>

        <button
          onClick={() => setCounter(Math.min(10, counter + 1))}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105 duration-300"
        >
          +
        </button>
      </div>

      <Link href={`/${lng}`}>
        <button
          type="button"
          className="mt-6 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full shadow-2xl transition transform hover:scale-110 duration-300"
        >
          {t('back-to-home')}
        </button>
      </Link>

      <Footer lng={lng} />
    </div>
  )
}
