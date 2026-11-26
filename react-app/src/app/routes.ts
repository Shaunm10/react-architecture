import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  route('/ideas/:id', './routes/ideas/idea.tsx'),
  index('routes/home.tsx'),
  // the 1st param is the url, the 2nd is the component that gets loaded.
  route('components', 'routes/components.tsx'),
] satisfies RouteConfig;
