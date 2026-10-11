import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function SalesCrmPage() {
  return (
    <ModulePlaceholder
      moduleId="sales-crm"
      name="Sales & CRM"
      category="operations"
      description="Pipeline tracking, contacts, deal stages, client communications and lead intelligence."
      subfeatures={['Deal Stage Pipelines', 'Contact Directory & History', 'Opportunity Forecasting']}
    />
  );
}
