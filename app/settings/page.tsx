import { Button } from "../../components/ui/button"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { ReadingPreferencesCard } from "../../components/settings/ReadingPreferencesCard"

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
          {/* Reading Preferences */}
          <ReadingPreferencesCard />

          {/* Notification Preferences */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-none rounded-lg bg-white dark:bg-card">
            <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="font-['Merriweather'] text-xl font-bold text-gray-800 dark:text-white">
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications" className="font-['Inter'] text-gray-700 dark:text-gray-300">
                  Email Notifications
                </Label>
                <Switch id="emailNotifications" className="dark:bg-gray-700 border dark:border-gray-600" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications" className="font-['Inter'] text-gray-700 dark:text-gray-300">
                  Push Notifications
                </Label>
                <Switch id="pushNotifications" className="dark:bg-gray-700 border dark:border-gray-600" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyDigest" className="font-['Inter'] text-gray-700 dark:text-gray-300">
                  Weekly Digest
                </Label>
                <Switch id="weeklyDigest" className="dark:bg-gray-700 border dark:border-gray-600" />
              </div>
            </CardContent>
          </Card>

          {/* Account Settings */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-none rounded-lg bg-white dark:bg-card">
            <CardHeader className="pb-4 border-b border-gray-200 dark:border-gray-700">
              <CardTitle className="font-['Merriweather'] text-xl font-bold text-gray-800 dark:text-white">
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <Button 
                className="bg-brand hover:bg-brand/90 dark:bg-[#e0e0e0] dark:hover:bg-[#d0d0d0] text-white dark:text-black font-['Inter'] w-full rounded-md"
              >
                Change Password
              </Button>
              <Button 
                className="bg-brand hover:bg-brand/90 dark:bg-[#e0e0e0] dark:hover:bg-[#d0d0d0] text-white dark:text-black font-['Inter'] w-full rounded-md"
              >
                Connected Accounts
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white font-['Inter'] w-full rounded-md"
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}