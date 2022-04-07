import { UniForm } from '@/components/UniForm';
import { Btn } from '@/styles/common';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

export default function CreateUniversity() {
  const router = useRouter();
  return (
    <$Container>
      <Btn onClick={() => router.back()}>Back</Btn>
      <UniForm />
    </$Container>
  );
}

const $Container = styled.div`
  margin-inline: 2rem;
`;
