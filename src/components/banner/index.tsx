import Image, { StaticImageData } from "next/image";
import styles from "./styles.module.scss";

import { Container, Grid, Typography } from "@mui/material";

export interface BannerProps {
  title: string;
  subtitle: string;
  image: StaticImageData | string;
}

export default function Banner({ title, subtitle, image }: BannerProps) {
  return (
    <section className={styles["banner-container"]}>
      <Image
        src={image}
        alt="BookClub Banner"
        width={1920}
        height={770}
        priority={true}
        className={styles["banner-image"]}
      />
      <Container
        maxWidth="xl"
        sx={{ justifyContent: "end" }}
        className={styles["banner-text"]}
      >
        <Grid size={12}>
          <Typography variant="h1" component="h1">
            {title}
          </Typography>
          <Typography variant="h2" component="h2">
            {subtitle}
          </Typography>
        </Grid>
      </Container>
    </section>
  );
}
