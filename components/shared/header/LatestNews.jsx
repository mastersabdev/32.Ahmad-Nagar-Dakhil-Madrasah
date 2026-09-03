const LatestNews = ({ data }) => {
  return (
    <div className="bg-primary border-y border-primary-800">
      <div className="container flex items-stretch min-h-[36px]">
        <div className="news-label flex items-center px-3 py-1.5 text-sm md:text-base shrink-0">
          Latest News
        </div>

        <div className="relative w-full overflow-hidden whitespace-nowrap group header-news flex items-center">
          <div className="inline-flex animate-marquee group-hover:[animation-play-state:paused] cursor-default">
            <span className="mx-4 text-white shrink-0 max-md:text-sm font-medium">
              {data?.latest_news || ""}
            </span>
            <span className="mx-4 text-white shrink-0 max-md:text-sm font-medium">
              {data?.latest_news || ""}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestNews;
