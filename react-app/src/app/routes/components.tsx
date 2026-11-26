import { Button } from '@/components/ui/button';

const Components = () => {
  return (
    <div className="container mx-auto py-8 space-y-12">
      <div className="">
        <h1 className="text-3xl font-bold mb-8">Components in Action</h1>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold">Button Component</h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Variants</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="default">Default</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon-sm">⌕</Button>
              <Button size="icon">⌕</Button>
              <Button size="icon-lg">⌕</Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Components;
