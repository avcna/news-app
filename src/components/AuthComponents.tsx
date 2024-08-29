import styled from "styled-components";
import visual from "../assets/auth.svg";
import brand from "../assets/navbrand.svg";

export const AuthBase = styled.section`
  margin-top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

   @media (max-width: 600px) {
   transform: scale(0.7);
  }
`;

const VisualImgWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

`;

export const Title = styled.h3`
  font-size: 24px;
  margin: 0;
`;

export const Form = styled.form`
  width: 350px;
  margin-top: 24px;
`;

export const Input = styled.input`
  border-radius: 8px;
  border: 1px solid gray;
  width: 100%;
  padding: 4px;
  margin-bottom: 8px;
`;

export const Button = styled.button`
  background-color: #ff5757;
  color: white;
  border: none;
  width: 100%;
  border-radius: 8px;
  padding: 4px;

  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

export const TextRedirect = styled.p`
  font-size: 12px;
`;

export const AuthVisual = () => {
  return (
    <VisualImgWrapper>
      <img src={visual} alt="" width={200} fetchPriority="high"/>
      <img src={brand} alt="" fetchPriority="high"/>
    </VisualImgWrapper>
  );
};
