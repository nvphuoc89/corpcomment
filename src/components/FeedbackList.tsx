import { useEffect, useState } from "react";
import FeedbackItem from "./FeedbackItem";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { TFeedbackItem } from "../lib/types";

export default function FeedbackList() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchFeedBackItems = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      const data = await response.json();
      setFeedBackItems(data.feedbacks);
    } catch (error) {
      setErrorMessage("An error occurred while fetching feedbacks");
    }
    setIsLoading(false);
  };

  const handleAddToList = (text: string) => {
    const companyName =
      text
        .split("")
        .find((word) => word.includes("#"))
        ?.substring(1) || "";

    const newItem: TFeedbackItem = {
      id: Date.now(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      companyName,
      badgeLetter: companyName.substring(1).toUpperCase() || "",
    };

    setFeedBackItems([...feedBackItems, newItem]);
  };

  useEffect(() => {
    fetchFeedBackItems();
    // setIsLoading(true);
    // fetch(
    //   "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Something went wrong");
    //     }
    //     return response.json();
    //   })
    //   .then((data) => {
    //     setFeedBackItems(data.feedbacks);
    //     setIsLoading(false);
    //   })
    //   .catch(() => {
    //     setErrorMessage("An error occurred while fetching feedbacks");
    //     setIsLoading(false);
    //   });
  }, []);

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
