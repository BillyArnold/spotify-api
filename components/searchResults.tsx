import { fetchSearchResults } from "@/app/actions/spotify/fetchSearchResults";

interface SearchResultsProps {
  query: string;
}

const SearchResults = async ({ query }: SearchResultsProps) => {
  const results = await fetchSearchResults(query);
  return (
    <div className="flex flex-col mb-6 w-full">{JSON.stringify(results)}</div>
  );
};

export default SearchResults;
