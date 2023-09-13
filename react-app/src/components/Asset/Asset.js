import AssetChart from "./AssetChart";
import AssetHeader from "./AssetHeader";
import AssetMarketDetails from "./AssetMarketDetails";
import AssetSelect from "./AssetSelect";
import CommentCard from "../Comment/CommentCard";
import Sidebar from "../Sidebar";
import "./Asset.css"
import OpenModalButton from "../OpenModalButton";


export default function Asset() {
    return (
        <>
            <div className='fullPageDiv'>
                <div id="sideBarDivAsset">
                    <Sidebar />
                </div>
                <div id="contentDiv">
                    <span id="topDiv">
                        <AssetHeader />
                        <OpenModalButton 
                        modalComponent={<AssetSelect/>}
                        buttonText={"Select an asset"}
                        />
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