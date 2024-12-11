import { useFeedbackItemStore } from "../../stores/feedbackItemStore";
import HashtagItem from "./HashtagItem";

export default function HashtagList() {
  const companyList = useFeedbackItemStore((state) => state.getCompanyList());
  const setSelectedCompany = useFeedbackItemStore(
    (state) => state.setSelectedCompany
  );

  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={setSelectedCompany}
        />
      ))}
    </ul>
  );
}
