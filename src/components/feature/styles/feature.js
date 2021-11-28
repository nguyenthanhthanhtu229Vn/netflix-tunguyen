import styled from "styled-components/macro";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 125px;
  @media (max-width: 600px) {
    margin-top: 50px;
  }
`;
export const Title = styled.h1`
  color: white;
  max-width: 650px;
  font-size: 64px;
  font-weight: 700;
  margin: auto;

  @media (max-width: 600px) {
    font-size: 35px;
  }
`;
export const SubTitle = styled.h2`
  color: white;
  font-size: 26px;
  font-weight: normal;
  margin: auto;
  margin-top: 20px;

  @media (max-width: 600px) {
    font-size: 18px;
    margin-top: 10px;
  }
`;
