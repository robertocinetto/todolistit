import React from "react";
import styled from "styled-components";
import MuiPaper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import Header from "../03.organisms/header";
import Footer from "../03.organisms/footer";

const Paper = styled(MuiPaper)`
  padding: 20px;
  height: 100%;
`;

function Base({ children }) {
  return (
    <Paper>
      <Container fixed>
        <Grid container direction="column" alignItems="center">
          <Header />
          {children}
          <Footer />
        </Grid>
      </Container>
    </Paper>
  );
}

export default Base;
