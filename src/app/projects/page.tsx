import ModulePlaceholder from '@/components/ModulePlaceholder';

export default function ProjectsPage() {
  return (
    <ModulePlaceholder
      moduleId="projects"
      name="Projects"
      category="operations"
      description="Milestones, Gantt schedules, resource allocation and deliverable tracking."
      subfeatures={['Interactive Milestones', 'Task Dependency Tracking', 'Timesheets & Allocation']}
    />
  );
}
