import Banner from "../Banner/Banner";
import BeMerchant from "../BeMarchant/BeMarchant";
import Benefits from "../Benefits/Benefits";
import Services from "../Services/Services";
import ClientLogosMarquee from "../clientLogosMarquee/ClientLogosMarquee";
const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Services></Services>
      <ClientLogosMarquee></ClientLogosMarquee>
      <Benefits></Benefits>
      <BeMerchant></BeMerchant>
    </div>
  );
};

export default Home;
