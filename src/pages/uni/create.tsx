import { UniForm } from '@/components/UniForm';
import Link from 'next/link';
import styled from 'styled-components';

export default function CreateUniversity() {
  return (
    <$Container>
      <Link href="/">Go Back</Link>
      <UniForm />
    </$Container>
  );
}

const $Container = styled.div`
  margin-inline: 2rem;
`;
