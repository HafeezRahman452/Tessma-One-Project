import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function ProcurementPage() {
  return (
    <ModulePlaceholder
      moduleId="procurement"
      name="Procurement"
      category="operations"
      description="Vendor management, purchase orders, approval matrix and RFQ submissions."
      subfeatures={['Purchase Order Approvals', 'Approved Vendor Registry', 'RFQ & Contract Matching']}
    />
  );
}
