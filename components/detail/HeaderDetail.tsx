import Heading from "../shared/Heading";
import PosterAnimation from "./PosterAnimation";
import { ReactElement, FC } from "react";
import ButtonCommon from "../shared/ButtonCommon";

interface HeaderDetailProps {
  name: string;
  posterPath: string;
  overview: string;
  children?: ReactElement;
  videoView: React.RefObject<HTMLHeadingElement>;
}

const HeaderDetail: FC<HeaderDetailProps> = ({
  children,
  name,
  posterPath,
  overview,
  videoView,
}) => {
  const handleScrollView = () => {
    if (videoView.current) {
      videoView.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="flex flex-col items-center text-center gap-x-10 sm:flex-row sm:text-start">
      <PosterAnimation src={posterPath}></PosterAnimation>
      <div className="relative z-10 flex-1 sm:-mt-14">
        <ButtonCommon icon onClick={handleScrollView}>
          Xem ngay
        </ButtonCommon>
        <div>
          <Heading>{name}</Heading>
          <h2 className="text-sm text-gray-200 md:text-base">{overview}</h2>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default HeaderDetail;
