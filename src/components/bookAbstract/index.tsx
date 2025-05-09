import { Heading } from "@/components/heading";
import { Typography } from "@mui/material";

interface BookAbstractProps {
  title: string;
  abstract: string;
}

export function BookAbstract({ title, abstract }: BookAbstractProps) {
  return (
    <div>
      <Heading text={`Resumo de ${title}`} />
      <Typography variant="body1" sx={{ marginBottom: 3 }}>
        {abstract}
      </Typography>
    </div>
  );
}
