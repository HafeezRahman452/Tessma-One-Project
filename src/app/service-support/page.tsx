import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function ServiceSupportPage() {
  return (
    <ModulePlaceholder
      moduleId="service-support"
      name="Service & Support"
      category="operations"
      description="Helpdesk tickets, SLA tracking, customer satisfaction scores and incident management."
      subfeatures={['Helpdesk Ticket Triage', 'SLA Response Tracking', 'Customer Satisfaction Analytics']}
    />
  );
}
