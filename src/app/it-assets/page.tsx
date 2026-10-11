import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function ItAssetsPage() {
  return (
    <ModulePlaceholder
      moduleId="it-assets"
      name="IT & Assets"
      category="operations"
      description="Hardware tracking, software licenses, lifecycle replacements and device assignments."
      subfeatures={['Hardware Asset Registry', 'SaaS License Optimization', 'Security Compliance & MDM']}
    />
  );
}
