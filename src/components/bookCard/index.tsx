import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import styles from "./styles.module.scss";

type BookCardProps = {
  title: string;
  imgSrc: string;
};

export function BookCard({ title, imgSrc }: BookCardProps) {
  return (
    <Card>
      <CardMedia component="img" alt={title} image={imgSrc} />
      <CardContent>
        <Typography variant="body2">{title}</Typography>
      </CardContent>
    </Card>
  );
}
