import React, { useEffect, useState } from "react";
import { useSearchUsersQuery } from "../store/github/github.api";
import { useDebounce } from "../hooks/debounds";

export function HomePage() {
  const [search, setSearch] = useState("");
  const debounced = useDebounce(search);
  const { isLoading, data, isError } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
  });
  console.log(isLoading, data);

  useEffect(() => {
    console.log(debounced);
  }, [debounced]);

  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && <p className="text-center text-red-600">Error</p>}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 w-full h-[42px] mb-2"
          placeholder="Seacrh"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="absolute top-[42px] left-0 right-0 max-h-[200px] bg-white shadow-md">
          Vlad
        </div>
      </div>
    </div>
  );
}
