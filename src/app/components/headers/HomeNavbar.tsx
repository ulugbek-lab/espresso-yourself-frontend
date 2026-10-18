import {
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Stack,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import Basket from "./Basket";
import React, { useState } from "react";
import { CartItem } from "../../../lib/types/search";
import { useGlobals } from "../../hooks/useGlobals";
import { LogOut } from "lucide-react";
import MenuIcon from "@mui/icons-material/Menu";

interface HomeNavbarProps {
  cartItems: CartItem[];
  onAdd: (item: CartItem) => void;
  onRemove: (item: CartItem) => void;
  onDelete: (item: CartItem) => void;
  onDeleteAll: () => void;
  setSignupOpen: (isOpen: boolean) => void;
  setLoginOpen: (isOpen: boolean) => void;
  handleLogoutClick: (e: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleCloseLogout: () => void;
  handleLogoutRequest: () => void;
}

export default function HomeNavbar(props: HomeNavbarProps) {
  const {
    cartItems,
    onAdd,
    onRemove,
    onDelete,
    onDeleteAll,
    setSignupOpen,
    setLoginOpen,
    handleLogoutClick,
    anchorEl,
    handleCloseLogout,
    handleLogoutRequest,
  } = props;

  const { authMember } = useGlobals();
  const [mobileOpen, setMobileOpen] = useState(false);

  /** HANDLERS */

  return (
    <div className="home-navbar">
      <Container className="navbar-container">
        <Stack className="menu">
          <Box>
            <NavLink to="/">
              <img
                className="brand-logo"
                src="/icons/espresso.png"
                alt="Espresso Yourself"
                style={{ width: 230, height: 30 }}
              />
            </NavLink>
          </Box>
          <Stack className="links">
            <Box className={"hover-line"}>
              <NavLink to="/" activeClassName="underline">
                HOME
              </NavLink>
            </Box>
            <Box className={"hover-line"}>
              <NavLink to="/products" activeClassName="underline">
                PRODUCTS
              </NavLink>
            </Box>
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/orders" activeClassName="underline">
                  ORDERS
                </NavLink>
              </Box>
            ) : null}
            {authMember ? (
              <Box className={"hover-line"}>
                <NavLink to="/member-page" activeClassName="underline">
                  MY PAGE
                </NavLink>
              </Box>
            ) : null}
            <Box className={"hover-line"}>
              <NavLink to="/help" activeClassName="underline">
                HELP
              </NavLink>
            </Box>
            {/*BASKET*/}
            <Basket
              cartItems={cartItems}
              onAdd={onAdd}
              onRemove={onRemove}
              onDelete={onDelete}
              onDeleteAll={onDeleteAll}
            />
            {!authMember ? (
              <Stack className="home-auth-actions" direction="row" alignItems="center">
                <Button
                  className="signup-nav-button"
                  onClick={() => setSignupOpen(true)}
                >
                  Sign Up
                </Button>
                <Button
                  className="login-button"
                  variant="contained"
                  onClick={() => setLoginOpen(true)}
                >
                  LOGIN
                </Button>
              </Stack>
            ) : (
              <button
                type="button"
                className="navbar-avatar-button"
                aria-label="Open account menu"
                aria-haspopup="menu"
                aria-controls={anchorEl ? "account-menu" : undefined}
                aria-expanded={Boolean(anchorEl)}
                onClick={handleLogoutClick}
              >
                <img
                  className="user-avatar"
                  src={
                    authMember?.memberImage
                      ? authMember?.memberImage
                      : "/icons/default-user.svg"
                  }
                  alt=""
                />
              </button>
            )}

            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={Boolean(anchorEl)}
              onClose={handleCloseLogout}
              onClick={handleCloseLogout}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleLogoutRequest}>
                <ListItemIcon>
                  <LogOut size={18} color="#B5563C" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Stack>
        </Stack>
        <Stack className="mobile-menu-bar">
          <NavLink to="/" aria-label="Espresso Yourself home">
            <img className="brand-logo" src="/icons/espresso.png" alt="Espresso Yourself" />
          </NavLink>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} onDelete={onDelete} onDeleteAll={onDeleteAll} />
            <IconButton className="mobile-menu-button" aria-label="Open navigation menu" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </IconButton>
          </Stack>
        </Stack>
        <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)} PaperProps={{ className: "mobile-nav-drawer" }}>
          <Stack className="mobile-nav-content">
            <img className="mobile-nav-logo" src="/icons/espresso.png" alt="Espresso Yourself" />
            <NavLink exact to="/" onClick={() => setMobileOpen(false)}>Home</NavLink>
            <NavLink to="/products" onClick={() => setMobileOpen(false)}>Menu</NavLink>
            {authMember && <NavLink to="/orders" onClick={() => setMobileOpen(false)}>Orders</NavLink>}
            {authMember && <NavLink to="/member-page" onClick={() => setMobileOpen(false)}>My account</NavLink>}
            <NavLink to="/help" onClick={() => setMobileOpen(false)}>Help</NavLink>
            <Box className="mobile-nav-divider" />
            {!authMember ? <Stack className="mobile-auth-actions"><Button className="mobile-signup-button" onClick={() => { setMobileOpen(false); setSignupOpen(true); }}>Sign up</Button><Button className="mobile-login-button" onClick={() => { setMobileOpen(false); setLoginOpen(true); }}>Log in</Button></Stack> : <Button className="mobile-logout-button" onClick={() => { setMobileOpen(false); handleLogoutRequest(); }}>Log out</Button>}
          </Stack>
        </Drawer>
      </Container>
    </div>
  );
}
