import { useState } from "react";
import { MAX_CHARACTERS } from "../../lib/constants";

export default function FeedbackForm({
  onAddToList,
}: {
  onAddToList: (text: string) => void;
}) {
  const [text, setText] = useState("");
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInValidIndicator, setShowInValidIndicator] = useState(false);

  const charCount = MAX_CHARACTERS - text.length;

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_CHARACTERS) return;
    setText(e.target.value);
  };

  const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.includes("#") && text.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => {
        setShowValidIndicator(false);
      }, 1000);
    } else {
      setShowInValidIndicator(true);
      setTimeout(() => {
        setShowInValidIndicator(false);
      }, 2000);
      return;
    }

    onAddToList(text);
    setText("");
  };

  return (
    <form
      className={`form ${showValidIndicator ? "form--valid" : ""} ${
        showInValidIndicator ? "form--invalid" : ""
      }`}
      action=""
      onSubmit={handleOnSubmit}
    >
      <textarea
        value={text}
        onChange={handleOnChange}
        id="feedback-textarea"
        placeholder=""
        spellCheck={false}
      ></textarea>

      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>

      <div>
        <p className="u-italic">{charCount}</p>

        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
