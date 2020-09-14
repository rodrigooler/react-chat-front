import React from "react";
import Header from "./header/Header";
import {
  HomeWrapper,
  SearchInputIcon,
  HomeContainer,
  GridSearchInput,
  GridChatPanel,
} from "./HomeStyles";
import SearchInput from "../../components/styled/search-input";
import { InputAdornment, Grid } from "@material-ui/core";
import ChatPanel from "./ChatPanel/ChatPanel";
import ChatConversation from "./ChatConversation/ChatConversation";

const Home = () => {
  return (
    <>
      <Header></Header>
      <HomeWrapper>
        <HomeContainer wrap maxWidth="xl">
          <Grid wrap="wrap" spacing={3} container>
            <Grid wrap="nowrap" item md={4} container direction="column">
              <GridSearchInput item md={12}>
                <SearchInput
                  fullWidth={true}
                  helperText="ex: renatim@hotmail.com.br"
                  label="Procurar usuário"
                  variant="filled"
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchInputIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </GridSearchInput>
              <GridChatPanel item md={12}>
                <ChatPanel />
              </GridChatPanel>
            </Grid>
            <ChatConversation />
          </Grid>
        </HomeContainer>
      </HomeWrapper>
    </>
  );
};

export default Home;
