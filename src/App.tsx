import { useEffect, useMemo, useState } from "react";
import Container from "./components/layout/Container";
import Footer from "./components/layout/Footer";
import HashtagList from "./components/hashtag/HashtagList";
import { TFeedbackItem } from "./lib/types";

function App() {
  const [feedBackItems, setFeedBackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const filterdFeedBackItems = useMemo(
    () =>
      feedBackItems.filter((item) =>
        selectedCompany ? item.company === selectedCompany : true
      ),
    [feedBackItems, selectedCompany]
  );

  const companyList = useMemo(
    () =>
      feedBackItems
        .map((item) => item.company)
        .filter((company, index, array) => array.indexOf(company) === index),
    [feedBackItems]
  );

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

  const handleAddToList = async (text: string) => {
    const companyName =
      text
        .split(" ")
        .find((word) => word.includes("#"))
        ?.substring(1) || "";

    const newItem: TFeedbackItem = {
      id: Date.now(),
      text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.slice(0, 1).toUpperCase() || "",
    };
    setFeedBackItems([...feedBackItems, newItem]);

    await fetch(
      "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks",
      {
        method: "POST",
        body: JSON.stringify(newItem),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };

  useEffect(() => {
    fetchFeedBackItems();
  }, []);

  return (
    <div className="app">
      <Footer />
      <Container
        isLoading={isLoading}
        errorMessage={errorMessage}
        feedBackItems={filterdFeedBackItems}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={setSelectedCompany}
      />
    </div>
  );
}

export default App;
