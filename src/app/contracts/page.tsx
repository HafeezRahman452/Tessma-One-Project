import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function ContractsPage() {
  return (
    <ModulePlaceholder
      moduleId="contracts"
      name="Contracts & Documents"
      category="management"
      description="Master agreements, NDAs, SLA renewals, e-signatures and clause repository."
      subfeatures={['Document Lifecycle & Expiry Alerts', 'Clause Template Library', 'Audit Log & E-Signatures']}
    />
  );
}
