import { memo } from "react";
import styled from "styled-components";

export const StyledLoaderWrapper = memo(styled.div`
position:fixed;
top: 0;
left: 0;
z-index:9999;
width:100%;
height:100%;
overflow:hidden;
display:flex;
justify-content:center;
align-items:center;
background: #8a8a8a8f;
backdrop-filter: blur(1px);`);