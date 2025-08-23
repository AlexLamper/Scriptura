import { headers } from 'next/headers';

export default async function TestLocalePage({
  params,
}: {
  params: Promise<{ lng: string }>
}) {
  const { lng } = await params;
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language');

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Locale Detection Test</h1>
      
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Current Locale Information</h2>
          <p><strong>Detected Locale:</strong> {lng}</p>
          <p><strong>Accept-Language Header:</strong> {acceptLanguage || 'Not available'}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Test Instructions</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Open your browser&apos;s developer tools</li>
            <li>Go to Application/Storage → Cookies and delete the &apos;i18next&apos; cookie</li>
            <li>Visit the root URL (/) without any language prefix</li>
            <li>You should be automatically redirected based on your browser&apos;s language preference</li>
            <li>Use the language switcher to change languages manually</li>
            <li>The cookie should be set and remembered for future visits</li>
          </ol>
        </div>

        <div className="p-4 bg-yellow-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">How it Works</h2>
          <ul className="list-disc list-inside space-y-2">
            <li><strong>First Visit:</strong> Detects language from Accept-Language header</li>
            <li><strong>Cookie Present:</strong> Uses saved language preference</li>
            <li><strong>Manual Switch:</strong> Updates cookie and navigates to new locale</li>
            <li><strong>Fallback:</strong> Uses English if no preference can be determined</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
