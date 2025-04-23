import { SideMenu } from "@/components/sideMenu";
import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Container } from "@mui/material";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className={styles["admin-wrapper"]}>
      <SideMenu />
      <Container maxWidth="lg" className={styles["admin-container"]}>
        {children}
      </Container>
    </div>
  );
}
