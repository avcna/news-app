import React from 'react';
import styled from 'styled-components';
import { NewsWrapper } from './NewsComponents';

const Div = styled.div`
  background-color: #e0e0e0;
  height: 300px;
`;

export const NewsCardSkeleton: React.FC = () => {
  const skeletonArray = Array.from({ length: 9 });

  return (
    <NewsWrapper>
      {skeletonArray.map((_, index) => (
        <Div key={index} />
      ))}
    </NewsWrapper>
  );
};

