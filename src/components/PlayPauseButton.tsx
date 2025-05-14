import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { twMerge } from "tailwind-merge";

const PlayPauseButton = ({
  onClick,
  isPlaying,
}: {
  onClick: () => void;
  isPlaying: boolean;
}) => {
  return (
    <button
      className={twMerge(
        "transition ease-in flex items-center justify-center h-10 w-10 md:h-8 md:w-8 rounded-full shadow-md",
        isPlaying
          ? "bg-gray-700 hover:bg-gray-800"
          : "bg-green-500 hover:bg-green-700"
      )}
      onClick={onClick}
    >
      <span className="sr-only">play-pause-btn</span>
      {isPlaying ? (
        <BsFillPauseFill className="h-6 w-6" />
      ) : (
        <BsFillPlayFill className="h-6 w-6" />
      )}
    </button>
  );
};

export default PlayPauseButton;
