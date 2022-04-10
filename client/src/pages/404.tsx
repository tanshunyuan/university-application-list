import { H1 } from '@/styles/common';
import Link from 'next/link';
import styled from 'styled-components';

export default function Custom404() {
  return (
    <$Container>
      <H1>404 - Page Not Found</H1>
      <Link href="/">Go Back</Link>
    </$Container>
  );
}
const $Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
