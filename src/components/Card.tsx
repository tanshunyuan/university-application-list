import styled from 'styled-components';
interface ICard {
  name: string;
  domain: string;
}
export const Card = ({ name, domain }: ICard) => {
  return <$Card>{name}</$Card>;
};
const $Card = styled.div`
  border: 1px solid black;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
`;
