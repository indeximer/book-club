import { Typography } from "@mui/material";

export function Logo() {
  return (
    <div>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          color: "inherit",
          textDecoration: "none",
        }}
      >
        BookClub
      </Typography>
    </div>
  );
}
