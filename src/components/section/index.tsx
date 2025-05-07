import { Container } from "@mui/material";
import styles from "./styles.module.scss";

type SectionProps = {
  children: React.ReactNode;
};

export function Section({ children }: SectionProps) {
  return (
    <section className={styles["section"]}>
      <Container maxWidth="xl">{children}</Container>
    </section>
  );
}
