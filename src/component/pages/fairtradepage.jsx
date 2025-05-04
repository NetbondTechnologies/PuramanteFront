import FairTradePrinciples from "../newcomponent/tradeinfromation";
import TradeBanner from "../newcomponent/tradebanner";
import InfoFairTrade from "../newcomponent/infofairtrade";
import Jewelryinfo from "../newcomponent/Jewelryinfo";
import HelpSection from "../newcomponent/help";
export default function Fairtradepage() {
  return (
    <div>
      <TradeBanner />
      <FairTradePrinciples />
      <InfoFairTrade />
      <Jewelryinfo />
      <HelpSection/>
    </div>
  );
}
