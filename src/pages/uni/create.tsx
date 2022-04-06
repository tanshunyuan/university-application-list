import { UniForm } from '@/components/UniForm';
import Link from 'next/link';

export default function CreateUniversity() {
  return (
    <div>
      <Link href="/">Go Back</Link>
      <UniForm />
    </div>
  );
}
