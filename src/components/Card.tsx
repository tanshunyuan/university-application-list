import styled from 'styled-components';
import { Text } from '@/styles/common';
interface ICard {
  name: string;
  domains: Array<string>;
}
export const Card = ({ name, domains }: ICard) => {
  return (
    <$Card>
      <Text>{name}</Text>
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
  max-width: 54rem;
  width: 100%;
`;
