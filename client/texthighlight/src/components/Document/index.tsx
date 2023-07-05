import HighlightText from "../HighlightText/index";

const Document = ({ title, author, date, content, searchQuery }: any) => {
  return (
    <div>
      <h2>
        <HighlightText text={title} highlightWord={searchQuery} />
      </h2>
      <div>
        <p>{author}</p>
        <p>{date}</p>
      </div>
      <div>
        <p>
          <HighlightText text={content} highlightWord={searchQuery} />
        </p>
      </div>
    </div>
  );
};

export default Document;
