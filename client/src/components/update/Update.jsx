import { useState } from "react";
import "./update.scss";
import { makeRequest } from "../../axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Update = ({ setOpenUpdate, data }) => {
    const [cover, setCover] = useState(null);
    const [profile, setProfile] = useState(null);


    const [texts, setTexts] = useState({
        name: "",
        city: "",
        website: ""
    });

    const upload = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {
        setTexts((prev) => ({ ...prev, [e.target.value]: [e.target.value] }));
    }

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (user) => {
            return makeRequest.put("/users", user);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["user"]);
            },
        }
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        let coverUrl = data.coverPic;
        let profileUrl = data.profilePic;

        coverUrl = cover && await upload(cover)
        profileUrl = profile && await upload(profile)

        mutation.mutate({ ...texts, coverPic: coverUrl, profilePic: profileUrl });
        setOpenUpdate(false);
    };

    return (
        <div className="update">
            <form action="">
                <input type="file" />
                <input type="file" />
                <input type="text" name="name" onChange={handleChange} />
                <input type="text" name="city" onChange={handleChange} />
                <input type="text" name="website" onChange={handleChange} />
                <button onClick={handleSubmit}>Uredi</button>
            </form>
            <button onClick={() => setOpenUpdate(false)}>X</button>
        </div>
    )
}

export default Update