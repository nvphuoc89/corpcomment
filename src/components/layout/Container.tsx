import { TFeedbackItem } from "../../lib/types";
import FeedbackList from "../feedback/FeedbackList";
import Header from "./Header";

type ContainerProps = {
  isLoading: boolean;
  errorMessage: string;
  feedBackItems: TFeedbackItem[];
  handleAddToList: (text: string) => void;
};

export default function Container({
  isLoading,
  errorMessage,
  feedBackItems,
  handleAddToList,
}: ContainerProps) {
  return (
    <main className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedBackItems={feedBackItems}
      />
    </main>
  );
}
