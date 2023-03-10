import React from "react";
import { IRepo } from "../models/models";

export function RepoCard({ repo }: { repo: IRepo }) {
  return (
    <div className="border py-3 px-5 rounded mb-2 hover:border-b-gray-100 transition-all">
      <a target="_blank" href={repo.html_url}>
        <h2 className="text-lg font-bold">{repo.full_name}</h2>
        <p className="text-sm">
          Forks: <span className="font-bold mr-1">{repo.forks}</span>
          Watchers: <span className="font-bold">{repo.watchers}</span>
        </p>
        {repo?.description && (
          <p className="text-sm font-thin">{repo?.description}</p>
        )}
      </a>
    </div>
  );
}
