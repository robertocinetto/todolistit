import React from "react";
import styled from "styled-components";

import Menu from "./menu";

import Grid from "@material-ui/core/Grid";

import { ReactComponent as Logo } from "../00.assets/logo.svg";

export const HeaderWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

function Header() {
  return (
    <HeaderWrapper>
      <Grid container alignItems="center">
        <Grid item xs={12} sm={6}>
          <Logo />
        </Grid>
        <Grid container item xs={12} sm={6} justify="flex-end">
          <Menu />
        </Grid>
      </Grid>
    </HeaderWrapper>
  );
}

export default Header;
