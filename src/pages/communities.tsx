import { Button } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import {CommunityGroup, newCommunityGroup} from "../types/Community.ts";
import { getUserCommunities, createCommunity } from "../api/communityApi.ts";
import {User} from "../types/User.ts"
import {getUser} from "../api/userApi.ts";

const Communities = () => {
    const userId = sessionStorage.getItem("userId")?.replace(/"/g, '');
    const [user, setUser] = useState<User | null>(null);
    const [communities, setCommunities] = useState<CommunityGroup[]>([]);
    useEffect(() => {
        if (!userId) {
            return
        }
        getUser(userId).then((data) => setUser(data))
        getUserCommunities(userId).then((data) => setCommunities(data));
    }, []);

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
