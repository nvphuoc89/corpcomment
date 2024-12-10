import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { TFeedbackItem } from "../../lib/types";
import { useState } from "react";

type FeedbackItemProps = {
  feedBackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedBackItem }: FeedbackItemProps) {
  const [open, setOpen] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(feedBackItem.upvoteCount);

  const handleUpvote = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    setUpvoteCount((prev) => prev + 1);
    event.currentTarget.disabled = true;
    event.currentTarget.style.color = "var(--color-accent)";
    event.stopPropagation();
  };

  return (
    <li
      className={`feedback ${open ? "feedback--expand" : null}`}
      onClick={() => setOpen(!open)}
    >
      <button onClick={handleUpvote}>
        <TriangleUpIcon />
        <span>{upvoteCount}</span>
      </button>

      <div>
        <p>{feedBackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedBackItem.company}</p>
        <p>{feedBackItem.text}</p>
      </div>

      <p>{feedBackItem.daysAgo === 0 ? "NEW" : `${feedBackItem.daysAgo}d`}</p>
    </li>
  );
}
