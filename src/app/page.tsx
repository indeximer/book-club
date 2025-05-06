import Banner from "@/components/banner";
import bannerImage from "../../public/images/banner.jpg";

export default function Home() {
  return (
    <>
      <Banner
        title="BookClub"
        subtitle="O seu site de livros"
        image={bannerImage}
      />
    </>
  );
}
