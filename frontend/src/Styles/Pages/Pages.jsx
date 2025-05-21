import { memo } from "react";
import styled from "styled-components";


export const StyledPagesTitle = memo(styled.h2`
text-align:center;
margin:1% 0 1% 0;

  @media (max-width: 768px) {
    padding: 5px;
  }`);

export const StyledPagesWrapper = memo(styled.div`
padding: 20px;`);

export const StyledLayoutWrapper = memo(styled.div`
margin-left: ${({ $isLeftNavbarOpen, $isLayoutShown }) => !$isLayoutShown ? "0px" : $isLeftNavbarOpen ? "240px" : "65px"};
transition: margin-left 0.3s ease;

  @media (max-width: 768px) {
    margin-left: ${({ $isLayoutShown }) => !$isLayoutShown ? "0px" : "57px"};
  }`);


export const StyledLoginWrapper = memo(styled.div`
height: 500px;
width: 35%;
border-radius: .25rem;
max-width: 28rem;
margin: auto;
margin-top: 5%;
display: flex;
flex-direction: column;
align-items: center;
background: white;
// border-radius: 10px;
box-shadow: 0 10px 15px -3px #0000001a,0 4px 6px -4px #0000001a;
padding: 20px;
gap: 30px;

    body.dark & {
        // background: #1F1F35;
        background: #1c1c2b;
    }
        
  @media (max-width: 768px) {
    width: 80%;
  }`);

export const StyledLoginLinks = memo(styled.div`
display: flex;
flex-direction: column-reverse;
gap: 25px;
margin-top: auto;
margin-bottom: 35px;`);

export const StyledLogo = memo(styled.h1`
font-size: 1.8rem;
font-weight: 700;
text-align: center;
margin: 0;
color:#3d55b7;`);


export const StyledButtonsWrapper = memo(styled.div`
display: flex;
gap: 10px;
padding: 15px;
overflow: auto;`);

export const Styled404Container = memo(styled.div`
width:40%;
height:40%;
display: flex;
flex-direction: column;
gap:15px;
justify-content: center;
align-items:center;
position: absolute;
left: 50%;
top:50%;
transform: translate(-50%,-50%);

  @media (max-width: 768px) {
    width: 80%;
    text-align: center;
  }`);