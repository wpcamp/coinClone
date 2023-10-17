import AssetChart from "./AssetChart";
import AssetHeader from "./AssetHeader";
import AssetMarketDetails from "./AssetMarketDetails";
import AssetSelect from "./AssetSelect";
import CommentCard from "../Comment/CommentCard";
import Sidebar from "../Sidebar";
import TransactCard from "../TransactionCard";
import { useSelector } from "react-redux";
import "./Asset.css"
import OpenModalButton from "../OpenModalButton";
import NewsComponent from "../Trending/NewsComponent";


export default function Asset() {
    const crypto = useSelector(state => state.crypto.crypto);

    return (
        <>
            <div className='fullPageDiv'>
                <div id="sideBarDivAsset">
                    <Sidebar />
                </div>
                <div id="contentDiv">
                    <span id="topDiv">
                        {/* <AssetHeader /> */}
                        <OpenModalButton 
                        modalComponent={<AssetSelect/>}
                        buttonText={"Select an asset"}
                        />
                    </span>
                    <div id="assetChartDiv">
                        <AssetChart />
                    </div>
                    <div>
                        <TransactCard />
                    </div>
                    <div id="assetComment">
                        <CommentCard />
                        <AssetMarketDetails />
                        <NewsComponent />
                    </div>
                </div>
            </div>
        </>
    )
}