import { Button } from "../../../components/ui/button"
import { Switch } from "../../../components/ui/switch"
import { Label } from "../../../components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"

export default function SettingsPage() {
  return (
    <div className="min-h-screen">
      <div className="mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="dark:bg-[#292b2f] dark:border-none">
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email Notifications</Label>
                <Switch id="emailNotifications" className="dark:bg-[#18181a] border dark:border-[#ffffff2b]" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="pushNotifications">Push Notifications</Label>
                <Switch id="pushNotifications" className="dark:bg-[#18181a] border dark:border-[#ffffff2b]" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                <Switch id="weeklyDigest" className="dark:bg-[#18181a] border dark:border-[#ffffff2b] " />
              </div>
            </CardContent>
          </Card>
          <Card className="dark:bg-[#292b2f] dark:border-none">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="dark:bg-[#18181a] dark:border-[#ffffff2b] w-full">
                Change Password
              </Button>
              <Button variant="outline" className="dark:bg-[#18181a] dark:border-[#ffffff2b] w-full">
                Connected Accounts
              </Button>
              <Button variant="destructive" className="w-full">
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}