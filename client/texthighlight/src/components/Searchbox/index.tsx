const Searchbox = () => {
  return (
    <form>
      <input
        type="text"
        // value={query}
        // onChange={handleChange}
        placeholder="Search..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default Searchbox;
