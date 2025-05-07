import { Typography } from "@mui/material";
import styles from "./styles.module.scss";

type HeadingProps = {
  text: string;
};

export function Heading({ text }: HeadingProps) {
  return (
    <Typography
      variant="h4"
      component="h2"
      gutterBottom
      className={styles["heading"]}
    >
      {text}
    </Typography>
  );
}
