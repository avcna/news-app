import React, { Dispatch, SetStateAction } from "react";
// import { api } from "../api/baseUrl";
import styled from "styled-components";

// const apiKey = import.meta.env.VITE_API_KEY;

// interface Article {
//   author?: string;
//   title?: string;
//   urlToImage?: string;
//   url?: string;
//   publishedAt?: string;
// }

interface FilterProps {
  q?: string;
  filter: FilterState;
  setFilter: Dispatch<SetStateAction<FilterState>>;
  handleFilter:()=>Promise<void>;
}

interface FilterState {
  lang: string;
  sort: string;
}

const Input = styled.input`
  &:disabled {
    cursor: not-allowed;
    color: gray;
  }
`;

const Label = styled.label`
  &:disabled {
    cursor: not-allowed;
    color: gray;
  }
`;

const FilterBtn = styled.button`
  width: 100%;
  padding: 4px;
  margin-top: 20px;
  border-radius: 12px;
  outline: none;
  border: 1px solid #ff5757;
  color: black;
  background-color: #fff;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    background-color: #d4d3d2;
    color: white;
    border: none;
  }
`;

const Div = styled.div`
  height: 100%;
  position: sticky;
  top: 52px;
  @media (max-width: 600px) {
    display: none;
  }
`;

const Filter: React.FC<FilterProps> = ({
  q,
  filter,
  setFilter,
  handleFilter
}) => {

  return (
    <Div style={{ width: "200px" }}>
      <h2>Filter News</h2>
      <p>Language</p>
      <Label>
        <Input
          type="radio"
          name="lang"
          onChange={() => setFilter({ ...filter, lang: "en" })}
          disabled={q?.length === 0}
        />
        <span>English</span>
      </Label>
      <br />
      <label>
        <Input
          type="radio"
          name="lang"
          onChange={() => setFilter({ ...filter, lang: "de" })}
          disabled={q?.length === 0}
        />
        <span>Germany</span>
      </label>
      <br />
      <label>
        <Input
          type="radio"
          name="lang"
          onChange={() => setFilter({ ...filter, lang: "es" })}
          disabled={q?.length === 0}
        />
        <span>Espanol</span>
      </label>
      <br />
      <label>
        <Input
          type="radio"
          name="lang"
          onChange={() => setFilter({ ...filter, lang: "it" })}
          disabled={q?.length === 0}
        />
        <span>Italiano</span>
      </label>
      <br />

      <p>Sort By</p>
      <label>
        <Input
          type="radio"
          name="sort"
          onChange={() => setFilter({ ...filter, sort: "publishedAt" })}
          disabled={q?.length === 0}
        />
        <span>Date and Time</span>
      </label>
      <br />
      <label>
        <Input
          type="radio"
          name="sort"
          onChange={() => setFilter({ ...filter, sort: "relevancy" })}
          disabled={q?.length === 0}
        />
        <span>Relevancy</span>
      </label>
      <br />
      <label>
        <Input
          type="radio"
          name="sort"
          onChange={() => setFilter({ ...filter, sort: "popularity" })}
          disabled={q?.length === 0}
        />
        <span>Popularity</span>
      </label>
      <br />

      <FilterBtn
        onClick={() => {
          handleFilter();
        }}
        disabled={
          q?.length === 0 ||
          (filter.lang.length === 0 && filter.sort.length === 0)
        }
      >
        Filter
      </FilterBtn>
    </Div>
  );
};

export default Filter;
