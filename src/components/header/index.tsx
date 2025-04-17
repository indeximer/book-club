"use client";

import { AppBar, Button, Container, Toolbar } from "@mui/material";
import { Logo } from "../logo";
import { useAuth } from "@/contexts/AuthContext";
import styles from "./styles.module.scss";

export function Header() {
  const { user, logOut } = useAuth();

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar className={styles.toolbox}>
          <Logo />
          {user ? (
            <Button color="inherit" onClick={logOut}>
              Sair
            </Button>
          ) : (
            <Button href="/login" color="inherit">
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
