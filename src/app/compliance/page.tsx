import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function CompliancePage() {
  return (
    <ModulePlaceholder
      moduleId="compliance"
      name="Compliance & Risk"
      category="management"
      description="Regulatory audit readiness, risk registers, security certifications and GDPR checks."
      subfeatures={['Enterprise Risk Matrix', 'Regulatory Audit Logs', 'Policy Versioning & Sign-offs']}
    />
  );
}
