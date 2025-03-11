import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

export type Author = {
    login: string,
    id: number,
    node_id: string,
    avatar_url: string,
    gravatar_id: string | null,
    url: string,
    html_url: string,
    followers_url: string,
    following_url: string,
    gists_url: string,
    starred_url: string,
    subscriptions_url: string,
    organizations_url: string,
    repos_url: string,
    events_url: string,
    received_events_url: string,
    type: string,
    user_view_type: string,
    site_admin: boolean,
    contributions: number,
};

const AuthorFilter = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  useEffect(() => {
    const fetchAuthors = async () => {
      const { data } = await octokit.request(
        "GET /repos/{owner}/{repo}/contributors",
        {
          owner: "facebook",
          repo: "react",
        }
      );
      // not type safe if API Changes or if the API returns unexpected data
      // alternative create a runtime safe type mapping function
      setAuthors(data as Author[]);
    };
    fetchAuthors();
  }, []);

  return <GithubFilter name="Authors" data={authors} labelKey="login" labelIconKey="avatar_url" />;
};

export default AuthorFilter;
