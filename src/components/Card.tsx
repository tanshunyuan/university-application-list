import styled from 'styled-components';
import { Text } from '@/styles/common';
import Link from 'next/link';
import { IUniversity } from '@/helpers/types';
type CardData = Pick<IUniversity, 'id' | 'name' | 'country'>;
export const Card = ({ name, id, country }: CardData) => {
  return (
    <$Card>
      <Text>{name}</Text>
      {/* <Link href={`/details/${id}`}>Learn More</Link> */}
      <Link href={{ pathname: `/details/${id}`, query: { country } }}>
        Learn More
      </Link>
    </$Card>
  );
};
const $Card = styled.div`
  border: 1px solid black;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
