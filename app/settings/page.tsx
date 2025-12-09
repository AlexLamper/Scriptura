import { Button } from "../../components/ui/button"
import { Switch } from "../../components/ui/switch"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="w-full px-4 py-8">
        <h1 className="text-4xl font-['Merriweather'] font-bold text-gray-800 dark:text-white mb-8">Settings</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Notification Preferences */}
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm rounded-none">
            <CardHeader className="pb-4">
              <CardTitle className="font-['Merriweather'] text-xl font-bold text-gray-800 dark:text-white">
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
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
          <Card className="border border-gray-200 dark:border-gray-700 shadow-sm rounded-none">
            <CardHeader className="pb-4">
              <CardTitle className="font-['Merriweather'] text-xl font-bold text-gray-800 dark:text-white">
                Account Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="bg-brand hover:bg-brand/90 dark:bg-[#e0e0e0] dark:hover:bg-[#d0d0d0] text-white dark:text-black font-['Inter'] w-full rounded-none"
              >
                Change Password
              </Button>
              <Button 
                className="bg-brand hover:bg-brand/90 dark:bg-[#e0e0e0] dark:hover:bg-[#d0d0d0] text-white dark:text-black font-['Inter'] w-full rounded-none"
              >
                Connected Accounts
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700 text-white font-['Inter'] w-full rounded-none"
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