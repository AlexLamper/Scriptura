import { ReadingPreferencesCard } from "../../components/settings/ReadingPreferencesCard"
import { GeneralSettingsCard } from "../../components/settings/GeneralSettingsCard"

export default function SettingsPage() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-full p-6">
        <div className="mb-8">
          <h1 className="font-['Merriweather'] text-2xl lg:text-3xl font-bold text-[#262626] dark:text-white mb-2">
            Settings
          </h1>
          <p className="font-['Inter'] text-gray-600 dark:text-gray-300">
            Manage your application preferences and account settings
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* General Settings */}
          <GeneralSettingsCard />
          
          {/* Reading Preferences */}
          <ReadingPreferencesCard />
        </div>
      </div>
    </div>
  )
}