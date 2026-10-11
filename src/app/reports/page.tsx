import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function ReportsPage() {
  return (
    <ModulePlaceholder
      moduleId="reports"
      name="Reports & Analytics"
      category="management"
      description="Cross-module business intelligence, automated scheduled exports and executive reports."
      subfeatures={['Executive Board Packs', 'Cross-Module BI Engine', 'Scheduled Automated CSV/PDF Exports']}
    />
  );
}
