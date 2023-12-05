import { Link } from "react-router-dom";
import style from './style/landing.module.css'
import landingVideo from '../../assets/img/landingVideo4.mp4'

const LandingPage = () => {
  return (
    <div className={style.contenLandingView}>
      
      <video src={landingVideo} muted autoPlay loop className={style.background}></video>

      <div  className={style.landing}>
        <Link to="/home"><button className={style.buttonLanding}>Start</button></Link>
      </div>   

    </div>
  );
}
export default LandingPage;
