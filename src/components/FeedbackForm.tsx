import { useState } from "react";
import { MAX_CHARACTERS } from "../lib/constants";

export default function FeedbackForm() {
  const [text, setText] = useState("");
  const charCount = MAX_CHARACTERS - text.length;

  const handleOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAX_CHARACTERS) return;
    setText(e.target.value);
  };

  return (
    <form className="form" action="">
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
