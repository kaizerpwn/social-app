import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axios";

const Share = () => {
    const [file, setFile] = useState(null);
    const [desc, setDesc] = useState("");

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("file", file);
            const res = await makeRequest.post("/upload", formData);
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };

    const { currentUser } = useContext(AuthContext);

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newPost) => {
            return makeRequest.post("/posts/add", newPost);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["posts"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        let imgUrl = "";
        if (file) imgUrl = await upload();
        mutation.mutate({ description: desc, img: imgUrl });
        setDesc("");
        setFile(null);
    };

    return (
        <div className="share">
            <div className="container">
                <div className="top">
                    <div className="left">
                        <img src={"/upload/" + currentUser.profilePic} alt="" />
                        <input
                            type="text"
                            placeholder={`O čemu razmišljate trenutno, ${currentUser.name}?`}
                            onChange={(e) => setDesc(e.target.value)}
                            value={desc}
                        />
                    </div>
                    <div className="right">
                        {file && (
                            <img className="file" alt="" src={URL.createObjectURL(file)} />
                        )}
                    </div>
                </div>
                <hr />
                <div className="bottom">
                    <div className="left">
                        <input
                            type="file"
                            id="file"
                            style={{ display: "none" }}
                            onChange={(e) => setFile(e.target.files[0])}
                        />
                        <label htmlFor="file">
                            <div className="item">
                                <img src={Image} alt="" />
                                <span>Dodaj sliku</span>
                            </div>
                        </label>
                        <div className="item">
                            <img src={Map} alt="" />
                            <span>Označi mjesto</span>
                        </div>
                        <div className="item">
                            <img src={Friend} alt="" />
                            <span>Taguj prijatelja</span>
                        </div>
                    </div>
                    <div className="right">
                        <button onClick={handleClick}>Podijeli</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Share;