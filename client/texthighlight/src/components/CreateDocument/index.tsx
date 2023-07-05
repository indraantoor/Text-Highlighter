import { useState } from "react";
import { useCreateDocument } from "../../hooks/query/useCreateDocument";

const CreateDocument = () => {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const { mutate } = useCreateDocument();

  const handleAuthorChange = (event: any) => {
    setAuthor(event.target.value);
  };

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event: any) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    // Handle form submission here
    // You can access the form values using the `author`, `title`, and `content` variables
    const data = {
      name: title,
      author,
      content,
    };

    mutate(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          id="author"
          value={author}
          onChange={handleAuthorChange}
        />
      </div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateDocument;
