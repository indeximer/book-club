import { CircularProgress } from "@mui/material";
import styles from "./styles.module.scss";

export function Splash() {
  return (
    <div className={styles.backdrop}>
      <CircularProgress />
    </div>
  );
}
