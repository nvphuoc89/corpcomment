import HashtagItem from "./HashtagItem";

type HastagListProps = {
  companyList: string[];
  handleSelectCompany: React.Dispatch<React.SetStateAction<string>>;
};

export default function HashtagList({
  companyList,
  handleSelectCompany,
}: HastagListProps) {
  return (
    <ul className="hashtags">
      {companyList.map((company) => (
        <HashtagItem
          key={company}
          company={company}
          onSelectCompany={handleSelectCompany}
        />
      ))}
    </ul>
  );
}
