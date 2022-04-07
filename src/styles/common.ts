import styled from 'styled-components';
export const H1 = styled.h1`
  font-size: ${(props) => props.theme.h1}px;
`;
export const H2 = styled.h2`
  font-size: ${(props) => props.theme.h2}px;
`;
export const H3 = styled.h3`
  font-size: ${(props) => props.theme.h3}px;
`;
export const H4 = styled.h4`
  font-size: ${(props) => props.theme.h4}px;
`;
export const Text = styled.p`
  font-size: ${(props) => props.theme.regular}px;
`;
export const TextBold = styled.p`
  font-size: ${(props) => props.theme.regular}px;
  font-weight: bold;
`;
export const Btn = styled.button`
  background-color: transparent;
  outline: none;
  padding: 0.75rem 1.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  font-size: ${(props) => props.theme.btn}px;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
`;

export const BtnSm = styled(Btn)`
  font-size: ${(props) => props.theme['btn-sm']}px;
  padding: 0.5rem 1rem;
`;
