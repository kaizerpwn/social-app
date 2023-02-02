import "./leftBar.scss"
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";

function leftBar() {
    return (
        <div className="leftBar">
            <div className="container">
                <div className="menu">
                    <div className="user">
                        <img src="https://images.pexels.com/photos/3754687/pexels-photo-3754687.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                        <span>John Doe</span>
                    </div>
                    <div className="item">
                        <img src={Friends} alt="" />
                        <span>Prijatelji</span>
                    </div>
                    <div className="item">
                        <img src={Groups} alt="" />
                        <span>Grupe</span>
                    </div>
                    <div className="item">
                        <img src={Market} alt="" />
                        <span>Market</span>
                    </div>
                    <div className="item">
                        <img src={Watch} alt="" />
                        <span>Videoteka</span>
                    </div>
                    <div className="item">
                        <img src={Memories} alt="" />
                        <span>Uspomene</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Tvoje prečice</span>
                    <div className="item">
                        <img src={Events} alt="" />
                        <span>Eventi</span>
                    </div>
                    <div className="item">
                        <img src={Gaming} alt="" />
                        <span>Igre</span>
                    </div>
                    <div className="item">
                        <img src={Gallery} alt="" />
                        <span>Galerija</span>
                    </div>
                    <div className="item">
                        <img src={Videos} alt="" />
                        <span>Videozapisi</span>
                    </div>
                    <div className="item">
                        <img src={Messages} alt="" />
                        <span>Poruke</span>
                    </div>
                </div>
                <hr />
                <div className="menu">
                    <span>Ostalo</span>
                    <div className="item">
                        <img src={Fund} alt="" />
                        <span>Akcija</span>
                    </div>
                    <div className="item">
                        <img src={Tutorials} alt="" />
                        <span>Tutoriali</span>
                    </div>
                    <div className="item">
                        <img src={Courses} alt="" />
                        <span>Kursevi</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default leftBar