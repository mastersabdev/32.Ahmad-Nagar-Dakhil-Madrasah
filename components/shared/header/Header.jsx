import HeaderTopSection from "./HeaderTopSection";
import LatestNews from "./LatestNews";
import Navigation from "./Navigation";

const Header = ({ headerData }) => {
  return (
    <>
      <HeaderTopSection data={headerData} />
      <Navigation />
      <LatestNews data={headerData} />
    </>
  );
};

export default Header;
