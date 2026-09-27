"use client";

const LatestNews = ({ data }) => {
  const newsText = data?.latest_news || "Welcome to our website!";

  return (
    <div className="bg-primary border-y border-primary-800">
      <div className="container flex items-stretch min-h-[36px]">
        <div className="news-label flex items-center px-3 py-1.5 text-sm md:text-base shrink-0">
          Latest News
        </div>

        <div className="relative w-full overflow-hidden whitespace-nowrap group header-news flex items-center">
          <marquee
            className="w-full text-white max-md:text-sm font-medium cursor-default"
            behavior="scroll"
            direction="left"
            scrollamount="7"
            scrolldelay="0"
            loop={Infinity}
            style={{ whiteSpace: "nowrap" }}
            onMouseEnter={(event) => event.currentTarget.stop()}
            onMouseLeave={(event) => event.currentTarget.start()}
          >
            <span className="inline-block mr-8">{newsText}</span>
            <span className="inline-block mr-8">{newsText}</span>
            <span className="inline-block mr-8">{newsText}</span>
          </marquee>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
