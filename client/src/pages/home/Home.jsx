import Stories from "../../components/stories/Stories"
import Posts from "../../components/posts/Posts"
import Share from "../../components/share/Share"
import "./home.scss"

function Home() {
    return (
        <div className="home">
            <Stories />
            <Share />
            <Posts userId={undefined} />
        </div>
    )
}

export default Home