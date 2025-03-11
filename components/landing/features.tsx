"use client"

// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
// import { Book, Users, Lightbulb, Compass } from "lucide-react"
import { Brain, FileText, Zap, BarChart } from "lucide-react"
import { useTranslation } from "../../app/i18n/client"

interface FeaturesProps {
  params: {
    lng: string
  }
}

export function Features({ params: { lng } }: FeaturesProps) {
  const { t } = useTranslation(lng, "features")

//   const features = [
//     {
//       icon: <Brain className="h-8 w-8" />,
//       title: t("feature_1_title"),
//       description: t("feature_1_description"),
//     },
//     {
//       icon: <FileText className="h-8 w-8" />,
//       title: t("feature_2_title"),
//       description: t("feature_2_description"),
//     },
//     {
//       icon: <Zap className="h-8 w-8" />,
//       title: t("feature_3_title"),
//       description: t("feature_3_description"),
//     },
//     {
//       icon: <BarChart className="h-8 w-8" />,
//       title: t("feature_4_title"),
//       description: t("feature_4_description"),
//     },
//   ]

//   return (
//     <section id="features" className="py-24 bg-white dark:bg-[#1a232f]">
//       <div className="container mx-auto px-4">
//         <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">{t("heading")}</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//           {features.map((feature, index) => (
//             <Card key={index} className="dark:bg-gray-700 dark:border-gray-600">
//               <CardHeader>
//                 <feature.icon className="w-10 h-10 mb-4 text-red-500 dark:text-red-400" />
//                 <CardTitle className="dark:text-white">{feature.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     </section>
//   )
// }


// export default function FeaturesSection() {
  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t("feature_1_title"),
      description: t("feature_1_description"),
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: t("feature_2_title"),
      description: t("feature_2_description"),
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t("feature_3_title"),
      description: t("feature_3_description"),
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: t("feature_4_title"),
      description: t("feature_4_description"),
    },
  ]

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <p className="text-sm font-semibold uppercase text-[#111828]">{t("heading")}</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Your Personal Learning Platform</h2>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600">
            {/* {feature.description} */}
            Scriptura combines the power of AI with proven study techniques to create a personalized learning experience.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col rounded-lg border border-gray-200 p-6 transition-all hover:shadow-md"
            >
              <div className="mb-4 rounded-lg bg-[#111828] p-3 text-white w-fit">{feature.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

