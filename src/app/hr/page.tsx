import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function HrPage() {
  return (
    <ModulePlaceholder
      moduleId="hr"
      name="HR"
      category="management"
      description="Employee profiles, leave management, onboarding workflows and payroll sync."
      subfeatures={['Employee Directory & Profiles', 'Holiday & Leave Approvals', 'Talent Recruitment Pipeline']}
    />
  );
}
