import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import styles from "./styles.module.scss";
import Link from "next/link";

const menuItems = [
  { text: "Livros", link: "/admin/books" },
  { text: "Autores", link: "/admin/authors" },
  { text: "Editoras", link: "/admin/publishers" },
  { text: "Gêneros", link: "/admin/genres" },
];

export function SideMenu() {
  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      className={styles["side-menu"]}
    >
      <List>
        {menuItems.map((item) => (
          <Link key={item.text} href={item.link}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
