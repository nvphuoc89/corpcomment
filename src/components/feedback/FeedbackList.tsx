import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { TFeedbackItem } from "../../lib/types";

type FeedbackListProps = {
  isLoading: boolean;
  errorMessage: string;
  feedBackItems: TFeedbackItem[];
};

export default function FeedbackList({
  isLoading,
  errorMessage,
  feedBackItems,
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedBackItems.map((feedBackItem) => (
        <FeedbackItem key={feedBackItem.id} feedBackItem={feedBackItem} />
      ))}
    </ol>
  );
}
