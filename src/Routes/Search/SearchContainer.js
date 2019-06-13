import React from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { SEARCH } from "./SearchQueries";
import { useQuery } from "react-apollo-hooks";

export default withRouter(({ location: { search } }) => {
  const { term } = queryString.parse(search);
  const searchTerm = term.trim();
  const { data, loading } = useQuery(SEARCH, {
    skip: searchTerm === "",
    variables: {
      term: searchTerm
    }
  });

  return (
    <SearchPresenter searchTerm={searchTerm} loading={loading} data={data} />
  );
});
