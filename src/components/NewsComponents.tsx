import styled from "styled-components";

export const NewsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 4fr));
  column-gap: 20px;
  row-gap: 20px;
  width: 100%;
`;