import FeedbackItem from "./FeedbackItem";
import Spinner from "../Spinner";
import ErrorMessage from "../ErrorMessage";
import { useFeedbackItemStore } from "../../stores/feedbackItemStore";

export default function FeedbackList() {
  const isLoading = useFeedbackItemStore((state) => state.isLoading);
  const errorMessage = useFeedbackItemStore((state) => state.errorMessage);
  const feedbackItems = useFeedbackItemStore((state) =>
    state.getFillteredFeedbackItems()
  );
  return (
    <ol className="feedback-list">
      {isLoading && <Spinner />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map((feedbackItem) => (
        <FeedbackItem key={feedbackItem.id} feedBackItem={feedbackItem} />
      ))}
    </ol>
  );
}
