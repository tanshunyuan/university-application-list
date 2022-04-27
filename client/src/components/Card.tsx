import styled from 'styled-components';
import { Text } from '@/styles/common';
import Link from 'next/link';
import { IUniversity } from '@/helpers/types';
import { useRouter } from 'next/router';
type CardData = Pick<IUniversity, '_id' | 'name' | 'country'>;
export const Card = ({ name, _id: id, country }: CardData) => {
  const { query } = useRouter();
  return (
    <$Card>
      <Text>{name}</Text>
      <Link
        href={{
          pathname: `/details/${id}`,
          query: { country, page: query.page, limit: query.limit },
        }}
      >
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
