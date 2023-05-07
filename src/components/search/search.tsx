import React, { useState } from 'react';
// import './search.css';

import { SelectOption } from '../../Select';

interface SearchProps {
  data: SelectOption[];
  displayField: keyof SelectOption;
}

const SearchSelect = ({ data, displayField }: SearchProps) => {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<SelectOption[]>([]);
  const [addedItems, setAddedItems] = useState<SelectOption[]>([]);

  const handleSearchTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleItemClick = (item: SelectOption) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
    setSearchText('');
  };

  const handleAddClick = () => {
    setAddedItems([...addedItems, ...selectedItems]);
    setSelectedItems([]);
  };

  const handleRemoveClick = () => {
    setAddedItems(addedItems.filter((item) => !selectedItems.includes(item)));
    setSelectedItems([]);
  };

  const filteredData = data.filter((item: SelectOption) =>
    String(item[displayField]).toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredAddedItems = addedItems.filter((item) =>
    String(item[displayField]).toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="SearchSelect">
      <div className="SearchSelect-input">
        <input type="text" value={searchText} onChange={handleSearchTextChange} />
        <button onClick={handleAddClick}>Add</button>
        <button onClick={handleRemoveClick}>Remove</button>
      </div>
      <div className="SearchSelect-list">
        <ul>
          {filteredData.map((item: SelectOption) => (
            <li
              key={item.value}
              onClick={() => handleItemClick(item)}
              className={selectedItems.includes(item) ? 'selected' : ''}
            >
              {item[displayField]}
            </li>
          ))}
        </ul>
      </div>
      <div className="SearchSelect-selected">
        {selectedItems.length > 0 && (
          <div className="SearchSelect-selected-items">
            <ul>
              {selectedItems.map((item: SelectOption) => (
                <li key={item.value}>{item[displayField]}</li>
              ))}
            </ul>
          </div>
        )}
        {addedItems.length > 0 && (
          <div className="SearchSelect-added-items">
            <h2>Added Items:</h2>
            <ul>
              {filteredAddedItems.map((item: SelectOption) => (
                <li key={item.value}>{item[displayField]}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchSelect;
