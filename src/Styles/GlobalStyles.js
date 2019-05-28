import {
  createGlobalStyle
} from "styled-components";
import reset from "styled-reset";

export default createGlobalStyle `
  ${reset}
  @import url('https://fonts.googleapis.com/css?family=Cookie&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700&display=swap');
  * {
      box-sizing: border-box;
  }
  body {
      background-color:${props => props.theme.bgColor};
      color: ${props => props.theme.blackColor};
      font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
      font-size: 14px;
      line-height: 18px;
  }
  a {
      color: ${props => props.theme.darkBlueColor};
      text-decoration: none;
  }
`;
