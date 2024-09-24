import { Button } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import {CommunityGroup, newCommunityGroup} from "../types/Community.ts";
import {getUserCommunities, createCommunity, getAllCommunities} from "../api/communityApi.ts";
import {User} from "../types/User.ts"

export type CommunitiesProps = {
    user: User;
}

const Communities = ({user}: CommunitiesProps) => {
    const userId = sessionStorage.getItem("userId")?.replace(/"/g, '');
    const [communities, setCommunities] = useState<CommunityGroup[]>([]);
    useEffect(() => {
        if (!userId) {
            return
        }

        if (!user.admin) {
            console.log(user);
            getUserCommunities(userId).then((data) => setCommunities(data));
        } else {
            getAllCommunities().then((data) => setCommunities(data));
        }

    }, [user, userId]);

    const communityGroup : newCommunityGroup = {

        name : "Opgang",
        createdBy : user,

    }

    const create = () => {
        createCommunity(communityGroup)
        console.log("HEllo")
    }
    return (
        <div>
            <h1>Communities</h1>

            {/* Table Structure */}
            <table cellPadding="10" cellSpacing="0">
                <thead>
                <tr>
                    {/* Define your table headers here */}
                    <th>ID</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {communities.map((community) => (
                    <tr key={community.id}>
                        {/* Render table data based on the community properties */}
                        <td>{community.id}</td>
                        <td>{community.name}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Button onClick={create}>Create new community</Button>
        </div>
    );
};

export default Communities;
