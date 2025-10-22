import { Button } from "./ui/button";

export default function ButtonDemo() {
  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Button Examples</h1>
      
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Button 1 - Dark Button</h2>
          <Button variant="dark" size="default">
            Click me
          </Button>
          <Button variant="dark" size="sm" className="ml-4">
            Small
          </Button>
          <Button variant="dark" size="lg" className="ml-4">
            Large
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Button 2 - Transparent Button</h2>
          <Button variant="transparent" size="default">
            Click me
          </Button>
          <Button variant="transparent" size="sm" className="ml-4">
            Small
          </Button>
          <Button variant="transparent" size="lg" className="ml-4">
            Large
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Custom Sizes</h2>
          <Button variant="dark" className="px-8 py-4 text-lg">
            Custom Large Dark
          </Button>
          <Button variant="transparent" className="px-2 py-1 text-xs ml-4">
            Custom Small Transparent
          </Button>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-2">Disabled States</h2>
          <Button variant="dark" disabled>
            Disabled Dark
          </Button>
          <Button variant="transparent" disabled className="ml-4">
            Disabled Transparent
          </Button>
        </div>
      </div>
    </div>
  );
}