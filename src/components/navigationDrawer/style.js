import styled from "styled-components";

export const ProfileHeader = styled.div`
  &.MuiListItem-root .MuiListItemAvatar-root .MuiAvatar-root {
    height: 38px;
    width: 38px;
  }
  &.MuiListItem-root .MuiListItemText-root .MuiListItemText-primary {
    font-size: 13px !important;
    color: black;
  }
`;

export const MenuItemStyle = styled.div`
  font-size: 12px !important;
`;

export const NavigationStyle = styled.div`
  &.MuiListItem-root .MuiListItemIcon-root {
    min-width: 40px !important;
  }
  &.MuiListItem-root .MuiListItemIcon-root .MuiIcon-root {
    font-size: 20px !important;
    color: black;
  }
  &.MuiListItem-root .MuiListItemText-root .MuiListItemText-primary {
    font-size: 13px !important;
    color: black;
  }
`;

export const DrawerStyle = styled.div`
  background: Red;
`;

export const CustomCard = styled.div`
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  box-shadow: none;
  background-image: none;
  border-radius: 12px;
  color: rgb(255, 255, 255);
  overflow: hidden;
  position: relative;
`;

export const ActiveBtn = styled.button`
  line-height: 1.75;
  min-width: 64px;
  padding: 4px 10px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
              border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
              color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: rgb(33, 150, 243);
  box-shadow: none;
  font-weight: 500;
  border-radius: 4px;
  color: #fff;
  text-transform: capitalize;
  font-family: Roboto, sans-serif;
  margin: 0 5px;
  &:hover {
    background: none;
  }
`;

export const InactiveBtn = styled.button`
  line-height: 1.75;
  min-width: 64px;
  padding: 4px 10px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
              box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
              border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, 
              color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: transparent;
  box-shadow: none;
  font-weight: 500;
  border-radius: 4px;
  color: #fff;
  text-transform: capitalize;
  font-family: Roboto, sans-serif;
  margin: 0 5px;
  &:hover {
    background: none;
  }
`;

export const Count = styled.div`
  margin: 14px 8px 6px 0px !important;
  line-height: 1.334em !important;
  font-family: Roboto, sans-serif !important;
  font-size: 2.125rem !important;
  font-weight: 500;
`;

export const AvatarStyle = styled.div`
  background: rgb(179, 157, 219) !important;
  cursor: pointer !important;
  width: 22px !important;
  height: 22px !important;
  margin-left: 10px;
  font-size: 1rem !important;
  color: rgb(94, 53, 177) !important;
`;

export const Title = styled.div`
  margin: 0px;
  line-height: 1.334em;
  font-family: Roboto, sans-serif;
  color: rgb(179, 157, 219);
  font-size: 1rem;
  font-weight: 600;
`;

export const GlobalBtnStyle = styled.button`
  text-transform: none !important;
  background: #5769f3!important;
`;

export const GlobalInputLabel = styled.label`
  font-size: 13px !important;
  margin: 5px 0;
`;

export const GlobalDialogContentStyle = styled.div`
  background: red;
`;
