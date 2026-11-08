import Counter from '../components/counter';
import { Welcome } from '../welcome/welcome';

export function meta() {
  return [
    { title: 'New React Router App' },
    { name: 'description', content: 'Welcome to React Router!' },
  ];
}

export default function Home() {
  return (
    <>
      <Welcome />
      <Counter label="Click Counter" initialValue={69} />
    </>
  );
}
