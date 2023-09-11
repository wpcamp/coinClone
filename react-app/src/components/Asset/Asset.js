import AssetChart from "./AssetChart";
import AssetHeader from "./AssetHeader";
import AssetMarketDetails from "./AssetMarketDetails";
import AssetSelect from "./AssetSelect";
import CommentCard from "../Comment/CommentCard";
import Sidebar from "../Sidebar";
import "./Asset.css"






export default function Asset() {
    return (
        <>
            <div className='fullPageDiv'>
                <div id="sideBarDivf">
                    <Sidebar />
                </div>
                <div id="contentDiv">
                    <span id="topDiv">
                        <AssetHeader />
                        <AssetSelect />
                    </span>
                    <div>
                        <AssetChart />
                    </div>
                    <div id="assetComment">
                        <CommentCard />
                        <AssetMarketDetails />
                    </div>
                </div>
            </div>


        </>
    )
}