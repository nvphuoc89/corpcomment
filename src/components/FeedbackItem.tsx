import { TriangleUpIcon } from "@radix-ui/react-icons";
import type { TFeedbackItem } from "../lib/types";

type FeedbackItemProps = {
  feedBackItem: TFeedbackItem;
};

export default function FeedbackItem({ feedBackItem }: FeedbackItemProps) {
  return (
    <li className="feedback">
      <button>
        <TriangleUpIcon />
        <span>{feedBackItem.upvoteCount}</span>
      </button>

      <div>
        <p>{feedBackItem.badgeLetter}</p>
      </div>

      <div>
        <p>{feedBackItem.companyName}</p>
        <p>{feedBackItem.text}</p>
      </div>

      <p>{feedBackItem.daysAgo}d</p>
    </li>
  );
}
