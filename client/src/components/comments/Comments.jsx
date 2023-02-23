import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../context/authContext";
import { makeRequest } from "../../axios";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import moment from "moment";

const Comments = ({ postId }) => {
    const { currentUser } = useContext(AuthContext);
    const [description, setDescription] = useState("");

    const { isLoading, error, data } = useQuery(["comments"], () =>
        makeRequest.get("/comments?postId=" + postId).then((res) => {
            return res.data;
        })
    );

    const queryClient = useQueryClient();

    const mutation = useMutation(
        (newComment) => {
            return makeRequest.post("/comments", newComment);
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"]);
            },
        }
    );

    const handleClick = async (e) => {
        e.preventDefault();
        mutation.mutate({ description, postId: postId });
        setDescription("");
    };
    console.log(data)

    return (
        <div className="comments">
            <div className="write">
                <img src={currentUser.profilePic} alt="" />
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Napišite komentar" />
                <button onClick={handleClick}>Komentariši</button>
            </div>
            {isLoading ? "loading" :
                data.map((comment) => (
                    <div className="comment" key={comment.id}>
                        <img src={comment.profilePic} alt="" />
                        <div className="info">
                            <span>{comment.name}</span>
                            <p>{comment.description}</p>
                        </div>
                        <span className="date">{moment(data.createdAt).fromNow()}</span>
                    </div>
                ))}
        </div>
    );
};

export default Comments;