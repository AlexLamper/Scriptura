import { Metadata } from 'next';

interface PageMetadataConfig {
  titleKey: string;
  descriptionKey: string;
  path: string;
  type?: string;
}

const pageConfigs: Record<string, PageMetadataConfig> = {
  dashboard: {
    titleKey: 'dashboard',
    descriptionKey: 'Access your personalized dashboard on Scriptura to manage courses, track progress, and engage with the community.',
    path: '/dashboard',
    type: 'website'
  },
  study: {
    titleKey: 'study',
    descriptionKey: 'Explore and study the Bible online with advanced tools. Scriptura offers the best study bible online experience.',
    path: '/study',
    type: 'website'
  },
  plans: {
    titleKey: 'plans',
    descriptionKey: 'Discover and follow Bible reading plans. Enhance your spiritual journey with Scriptura bible study plans.',
    path: '/plans',
    type: 'website'
  },
  notes: {
    titleKey: 'notes',
    descriptionKey: 'Manage all your Bible study notes and highlights in one place.',
    path: '/notes',
    type: 'website'
  },
  quizzes: {
    titleKey: 'quizzes',
    descriptionKey: 'Engage with interactive Bible quizzes. Test your biblical knowledge with Scriptura\'s online bible courses and quizzes.',
    path: '/quizzes',
    type: 'website'
  },
  profile: {
    titleKey: 'profile',
    descriptionKey: 'Manage your Scriptura user profile, track your progress, and personalize your experience.',
    path: '/profile',
    type: 'profile'
  },
  resources: {
    titleKey: 'resources',
    descriptionKey: 'Explore a comprehensive collection of Bible study resources. Your go-to for biblical education and study bible online materials.',
    path: '/resources',
    type: 'website'
  },
  settings: {
    titleKey: 'settings',
    descriptionKey: 'Manage your Scriptura account settings and preferences.',
    path: '/settings',
    type: 'website'
  },
  read: {
    titleKey: 'study',
    descriptionKey: 'Read and study the Bible online. Use our interactive tools for deep scriptura bible study.',
    path: '/read',
    type: 'website'
  },
  community: {
    titleKey: 'community',
    descriptionKey: 'Join the Scriptura community. Connect with fellow learners for bible study online and spiritual growth.',
    path: '/community',
    type: 'website'
  },
  admin: {
    titleKey: 'admin',
    descriptionKey: 'Admin dashboard for managing Scriptura platform.',
    path: '/admin',
    type: 'website'
  },
  subscribe: {
    titleKey: 'subscribe',
    descriptionKey: 'Subscribe to Scriptura for exclusive biblical learning resources. Unlock the full potential of your study bible online.',
    path: '/subscribe',
    type: 'website'
  },
  success: {
    titleKey: 'success',
    descriptionKey: 'Subscription successful! Welcome to Scriptura.',
    path: '/success',
    type: 'website'
  }
};

export function generatePageMetadata(
  pageKey: string, 
  lng: string = 'en', 
  customTitle?: string,
  customDescription?: string
): Metadata {
  const config = pageConfigs[pageKey];
  
  if (!config) {
    return {
      title: 'Scriptura',
      description: 'Interactive Bible Learning Platform'
    };
  }

  const titleTranslations: Record<string, Record<string, string>> = {
    en: {
      dashboard: 'Dashboard',
      study: 'Study',
      plans: 'Reading Plans',
      notes: 'Notes',
      quizzes: 'Quizzes',
      profile: 'Profile',
      resources: 'Resources',
      settings: 'Settings',
      community: 'Community',
      admin: 'Admin',
      read: 'Read',
      subscribe: 'Subscribe',
      success: 'Success'
    },
    nl: {
      dashboard: 'Dashboard',
      study: 'Studie',
      plans: 'Leesplannen',
      notes: 'Notities',
      quizzes: 'Quizzen',
      profile: 'Profiel',
      resources: 'Hulpbronnen',
      settings: 'Instellingen',
      community: 'Gemeenschap',
      admin: 'Beheer',
      read: 'Lezen',
      subscribe: 'Abonneren',
      success: 'Succes'
    },
    de: {
      dashboard: 'Dashboard',
      study: 'Studium',
      plans: 'Lesepläne',
      notes: 'Notizen',
      quizzes: 'Quizze',
      profile: 'Profil',
      resources: 'Ressourcen',
      settings: 'Einstellungen',
      community: 'Gemeinschaft',
      admin: 'Verwaltung',
      read: 'Lesen',
      subscribe: 'Abonnieren',
      success: 'Erfolg'
    }
  };

  const pageTitle = customTitle || titleTranslations[lng]?.[config.titleKey] || titleTranslations['en'][config.titleKey] || 'Scriptura';
  const baseUrl = 'https://scriptura.cloud';
  const fullUrl = `${baseUrl}${config.path}`;

  return {
    title: {
      absolute: `Scriptura | ${pageTitle}`,
    },
    description: customDescription || config.descriptionKey,
    openGraph: {
      title: `Scriptura | ${pageTitle}`,
      description: customDescription || config.descriptionKey,
      url: fullUrl,
      siteName: 'Scriptura',
      images: [
        {
          url: `${baseUrl}/og-image.svg`,
          width: 1200,
          height: 630,
          alt: `Scriptura - ${pageTitle}`,
        },
      ],
      locale: lng === 'en' ? 'en_US' : lng === 'nl' ? 'nl_NL' : 'de_DE',
      type: (config.type as 'website' | 'profile') || 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Scriptura | ${pageTitle}`,
      description: customDescription || config.descriptionKey,
      site: '@ScripturaEdu',
      creator: '@ScripturaEdu',
      images: [`${baseUrl}/og-image.svg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}
