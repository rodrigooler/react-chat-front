import styled from 'styled-components';
import { ListItemText, ListItem, List } from '@material-ui/core';

const ChatPanelWrapper = styled.div`
  width: 100%;
  background-color: #5c4f82;
  height: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

const UserNameAndLastMessageTextWrapper = styled(ListItemText)`
  && {
    .MuiListItemText-primary {
      color: #fafafa;
      opacity: 90%;
    }
    .MuiTypography-colorTextPrimary {
      color: #bfbaba;
    }
  }
`;

const MessageList = styled(List)`
  padding-top: 0px;
  padding-bottom: 0px;
`;

const ListItemUserChat = styled(ListItem)`
  && {
    padding-bottom: 0;
    padding-top: 0;
    .MuiListItemText-root {
      padding-bottom: 15px;
    }
    :not(:last-of-type) .MuiListItemText-root {
      border-bottom: 1px solid #b5b5b52e;
    }
  }
`;

const InlineWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  justify-content: space-between;
`;

const TypographyDate = styled.p`
  font-size: 13px;
  color: #fafafa;
  opacity: 70%;
  margin: 0;
`;

export {
  ChatPanelWrapper,
  UserNameAndLastMessageTextWrapper,
  ListItemUserChat,
  InlineWrapper,
  TypographyDate,
  MessageList,
};
