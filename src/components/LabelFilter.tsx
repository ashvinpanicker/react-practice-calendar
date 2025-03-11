import { useEffect, useState } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";

export type Label = {
    id: number;
    node_id: string;
    url: string;
    name: string;
    description: string | null;
    color: string;
    default: boolean;
};

const LabelFilter = () => {
    const [labels, setLabels] = useState<Label[]>([]);
    useEffect(() => {
        const fetchLabels = async () => {
            const { data } = await octokit.request(
                "GET /repos/{owner}/{repo}/labels",
                {
                    owner: "facebook",
                    repo: "react",
                }
            );
            setLabels(data);
        };
        fetchLabels();
    }, []);

    return <GithubFilter name="Labels" data={labels} labelKey="name" labelColorKey="color" />;
};

export default LabelFilter;