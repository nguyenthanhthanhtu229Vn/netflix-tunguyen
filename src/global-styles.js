import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
 html,body{
     font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
     -webkit-font-smoothing: antialiased;
     -moz-osx-font-smoothing: grayscale;
     background-color: black;
     color: #333333;
     font-size:16px;
 };
 ::-webkit-scrollbar {
  width: 10px;
};
/* Handle */
::-webkit-scrollbar-thumb {
  background: #e50914; 
  border-radius: 10px;
}
;
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
};
`;
