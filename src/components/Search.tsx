import React, { useState } from 'react';
import { Input, Button } from 'antd';

/*interface SearchComponentProps {
  placeholder: string;
  value: string;
  onSearch: (value: string) => void;
}*/

const Search: React.FC<SearchComponentProps> = ({ placeholder, value, onSearch }) => {
  const [searchText, setSearchText] = useState(value);

  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <div>
      <Input
        placeholder={placeholder}
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </div>
  );
};

export default Search;
