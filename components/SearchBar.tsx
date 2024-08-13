interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (term: string) => void;
  }
  
  const SearchBar = ({ searchTerm, setSearchTerm }: SearchBarProps) => {
    return (
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />
    );
  };
  
  export default SearchBar;
  