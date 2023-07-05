import HighlightText from "../HighlightText/index";

const Document = ({ title, author, date, content, searchQuery }: any) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-2 mt-4">
      <h2 className="text-xl font-semibold mb-2">
        <HighlightText text={title} highlightWord={searchQuery} />
      </h2>
      <div className="flex flex-col md:flex-row mb-4">
        <p className="text-gray-600 mr-4">{author}</p>
        <p className="text-gray-600">{date}</p>
      </div>
      <div>
        <p className="text-gray-800">
          <HighlightText text={content} highlightWord={searchQuery} />
        </p>
      </div>
    </div>
  );
};

export default Document;
