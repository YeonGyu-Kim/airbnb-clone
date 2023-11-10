import { getCat } from '@/data/catApi';

export default async function Cat() {
  const data = await getCat();
  return <div>{data}</div>;
}
