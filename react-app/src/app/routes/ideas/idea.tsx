import type { Route } from './+types/idea';

const Idea = (props: Route.ComponentProps) => {
  const ideaId = props.params.id;
  return <div>idea{ideaId}</div>;
};

export default Idea;
