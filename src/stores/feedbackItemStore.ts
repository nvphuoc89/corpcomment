import { create } from "zustand";
import { TFeedbackItem } from "../lib/types";

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  getCompanyList: () => string[];
  getFillteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  setSelectedCompany: (selectedCompany: string) => void;
  fetchFeedBackItems: () => Promise<void>;
};

export const useFeedbackItemStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: "",
  selectedCompany: "",
  getCompanyList: () => {
    return get()
      .feedbackItems.map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  },
  getFillteredFeedbackItems: () => {
    const state = get();

    return state.feedbackItems.filter((item) =>
      state.selectedCompany ? item.company === state.selectedCompany : true
    );
  },
  addItemToList: async (text: string) => {
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

    set((state) => ({
      feedbackItems: [...state.feedbackItems, newItem],
    }));

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
  },
  setSelectedCompany: (selectedCompany: string) => {
    set(() => ({ selectedCompany }));
  },
  fetchFeedBackItems: async () => {
    set(() => ({ isLoading: true }));
    try {
      const response = await fetch(
        "https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks"
      );
      const data = await response.json();
      set(() => ({ feedbackItems: data.feedbacks }));
    } catch (error) {
      set(() => ({
        errorMessage: "An error occurred while fetching feedbacks",
      }));
    }
    set(() => ({ isLoading: false }));
  },
}));
