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
    descriptionKey: 'Explore and study the Bible with advanced tools and resources on Scriptura.',
    path: '/study',
    type: 'website'
  },
  plans: {
    titleKey: 'plans',
    descriptionKey: 'Discover and follow Bible reading plans to enhance your spiritual journey.',
    path: '/plans',
    type: 'website'
  },
  notes: {
    titleKey: 'notes',
    descriptionKey: 'Manage all your Bible study notes and highlights in one place.',
    path: '/notes',
    type: 'website'
  },
  courses: {
    titleKey: 'courses',
    descriptionKey: 'Explore comprehensive Bible courses on Scriptura to deepen your understanding.',
    path: '/courses',
    type: 'website'
  },
  quizzes: {
    titleKey: 'quizzes',
    descriptionKey: 'Engage with interactive Bible quizzes to test and deepen your biblical knowledge.',
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
    descriptionKey: 'Explore a comprehensive collection of Bible study resources.',
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
    descriptionKey: 'Read and study the Bible with our interactive reading tools.',
    path: '/read',
    type: 'website'
  },
  community: {
    titleKey: 'community',
    descriptionKey: 'Join the Scriptura community to connect with fellow learners.',
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
    descriptionKey: 'Subscribe to Scriptura for exclusive biblical learning resources.',
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

  // For now, we'll use the sidebar translation keys for titles
  // In a real implementation, you'd want to load the translations server-side
  const titleTranslations: Record<string, Record<string, string>> = {
    en: {
      dashboard: 'Dashboard',
      study: 'Study',
      plans: 'Reading Plans',
      notes: 'Notes',
      courses: 'Courses',
      quizzes: 'Quizzes',
      profile: 'Profile',
      resources: 'Resources',
      settings: 'Settings',
      community: 'Community',
      admin: 'Admin'
    },
    nl: {
      dashboard: 'Dashboard',
      study: 'Studie',
      plans: 'Leesplannen',
      notes: 'Notities',
      courses: 'Bijbelstudies',
      quizzes: 'Quizzen',
      profile: 'Profiel',
      resources: 'Hulpbronnen',
      settings: 'Instellingen',
      community: 'Gemeenschap',
      admin: 'Beheer'
    },
    de: {
      dashboard: 'Dashboard',
      study: 'Studium',
      plans: 'Lesepläne',
      notes: 'Notizen',
      courses: 'Kurse',
      quizzes: 'Quizze',
      profile: 'Profil',
      resources: 'Ressourcen',
      settings: 'Einstellungen',
      community: 'Gemeinschaft',
      admin: 'Verwaltung'
    }
  };

  const pageTitle = customTitle || titleTranslations[lng]?.[config.titleKey] || titleTranslations['en'][config.titleKey] || 'Scriptura';
  const baseUrl = lng === 'en' ? 'https://scriptura-edu.com' : `https://scriptura-edu.${lng}`;
  const fullUrl = `${baseUrl}${lng !== 'en' ? `/${lng}` : ''}${config.path}`;

  return {
    title: `Scriptura | ${pageTitle}`,
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
      languages: {
        en: `https://scriptura-edu.com${config.path}`,
        nl: `https://scriptura-edu.nl/nl${config.path}`,
        de: `https://scriptura-edu.de/de${config.path}`,
      },
    },
  };
}
