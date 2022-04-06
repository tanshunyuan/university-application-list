import styled from 'styled-components';
export const H1 = styled.h1`
  font-size: ${(props) => props.theme.h1};
`;
export const H2 = styled.h2`
  font-size: ${(props) => props.theme.h2};
`;
export const H3 = styled.h3`
  font-size: ${(props) => props.theme.h3};
`;
export const H4 = styled.h4`
  font-size: ${(props) => props.theme.h4};
`;
export const Text = styled.p`
  font-size: ${(props) => props.theme.regular};
`;
export const TextBold = styled.p`
  font-size: ${(props) => props.theme.regular};
  font-weight: bold;
`;
export const Btn = styled.button`
  font-size: ${(props) => props.theme.btn};
`;
