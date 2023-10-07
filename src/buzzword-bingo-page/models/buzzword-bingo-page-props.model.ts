import SlideAnimation from "../../models/slide-animation.enum";
import BuzzwordBingoConfig from "./buzzword-bingo-config.model";

export default interface BuzzwordBingoProps {
    buzzwordBingoConfig: BuzzwordBingoConfig;
    animation: SlideAnimation;
}