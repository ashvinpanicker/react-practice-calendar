import { useState, useEffect } from "react";
import octokit from "../api/github-api";
import GithubFilter from "./GithubFilter";


export interface Milestone {
    url: string;
    html_url: string;
    labels_url: string;
    id: number;
    node_id: string;
    number: number;
    state: "open" | "closed";
    title: string;
    description: string | null;
    creator: {
        name?: string | null;
        // other fields...
    } | null;
    // other fields...
    due_on: string | null;
};

const MilestoneFilter = () => {
    //   const milestoneIcon = "🏁"; 
    const milestoneIconURL = "https://www.svgrepo.com/show/347792/milestone.svg";

    const [milestones, setMilestones] = useState<Milestone[]>([]);
    useEffect(() => {
        const fetchMilestones = async () => {
            const { data } = await octokit.request(
                "GET /repos/{owner}/{repo}/milestones",
                {
                    owner: "facebook",
                    repo: "react",
                }
            );
            setMilestones(data);
        };
        fetchMilestones();
    }, []);

    return <GithubFilter name="Milestones" data={milestones} labelKey="title" labelIconKey={milestoneIconURL} />;
};

export default MilestoneFilter;