import React, { useEffect, useState } from "react";
import {
  useSearchUsersQuery,
  useLazyGetUserReposQuery,
} from "../store/github/github.api";
import { useDebounce } from "../hooks/debounds";
import { RepoCard } from "../components/RepoCard";

export function HomePage() {
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const debounced = useDebounce(search);
  const { isLoading, data, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });

  useEffect(() => {
    setDropdown(debounced.length > 3 && data?.length! > 0);
  }, [debounced, data]);

  const [fetchRepos, { isLoading: areReposLoading, data: areReposData }] =
    useLazyGetUserReposQuery();

  const clickHandler = (username: string) => {
    fetchRepos(username);
    setDropdown(false);
  };
  return (
    <>
      <div className="flex flex-col container items-center pt-10 mx-auto h-screen w-screen">
        {isError && <p className="text-center text-red-600">Error</p>}

        <div className="relative w-[560px] ">
          <input
            type="text"
            className="border p-2 w-full h-[42px] mb-2"
            placeholder="Seacrh"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {dropdown && (
            <ul className="list-none absolute top-[42px] overflow-y-scroll left-0 right-0 max-h-[200px] bg-white shadow-md">
              {isLoading && <p className="text-center">Loading...</p>}
              {data?.map((user) => (
                <li
                  onClick={() => clickHandler(user.login)}
                  key={user.id}
                  className="py-2 px-4 hover:bg-gray-500 hover:text-white  transition-colors cursor-pointer"
                >
                  {user.login}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          {areReposLoading && <p className="text-center">Loading...</p>}
          {areReposData?.map((repo) => (
            <RepoCard repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </>
  );
}
