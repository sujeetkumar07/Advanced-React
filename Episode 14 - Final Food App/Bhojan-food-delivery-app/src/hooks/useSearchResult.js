import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  SUBMIT_ACTION_SUGGESTION_API,
  SUBMIT_ACTION_SUGGESTION_API_FRACTION,
} from "../utils/constants";

export const useSearchResult = () => {
  const [searchResult, setSearchResult] = useState({});
  const location = useLocation();
  const urlSearchParam = new URLSearchParams(location.search);
  const searchParam = urlSearchParam.get("query");

  const fetchSearchResult = async () => {
    const searchResultsData = await fetch(
      `${SUBMIT_ACTION_SUGGESTION_API}${searchParam}${SUBMIT_ACTION_SUGGESTION_API_FRACTION}`,
      {
        headers: {
          "x-cors-api-key": "temp_907965272042a5006e2ff57757f88d22",
        },
      }
    );
    const searchResultsResponse = await searchResultsData.json();
    const _searchResultTypeTabsData =
      searchResultsResponse?.data?.cards?.[0]?.card?.card?.tab;
    const searchResultsForDishes =
      searchResultsResponse?.data?.cards?.[1]?.groupedCard?.cardGroupMap?.DISH
        ?.cards;
    const searchResultsForRestaurants =
      searchResultsResponse?.data?.cards?.[1]?.groupedCard?.cardGroupMap
        ?.RESTAURANT?.cards;
    setSearchResult({ searchResultsForDishes, searchResultsForRestaurants });
  };

  useEffect(() => {
    fetchSearchResult();
  }, [searchParam]);

  return { searchResult };
};
