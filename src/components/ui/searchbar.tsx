import React, { useState, forwardRef, useRef } from 'react';
import { Input } from './input';
import { Button } from './button';
import clsx from 'clsx';

export interface SearchBarProps {
  className?: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar = forwardRef<HTMLDivElement, SearchBarProps>(
  ({ className, onSearch, placeholder = 'Search...' }, ref) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = () => {
      if (query.trim()) {
        onSearch(query);
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    return (
      <div ref={ref} className={clsx('flex items-center gap-2 w-[40vw] mx-auto mt-8', className)}>
        <Input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1"
        />
        <Button onClick={handleSearch} color="indigo">
          Search
        </Button>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';