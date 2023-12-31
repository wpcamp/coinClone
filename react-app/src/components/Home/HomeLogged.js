import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetWatchlist } from '../../store/watchlist';
import SideBar from '../Sidebar/index';
import WalletBreakdown from '../Wallet/WalletBreakdown';
import WalletPortfolio from '../Wallet/WalletPortfolio';
import TrendingCard from '../Trending';
import BuyingPowerCard from '../Wallet/BuyingPower';
import './Home.css';


export default function HomeLoggedIn() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(thunkGetWatchlist(sessionUser.id))
    }, [])
    return (
        <div id='homePageFullDiv'>
            <div id='homePageSideWal'>
                <SideBar />
            </div>
            <div id='contentDivHo'>

                <div id='walletDivHome'>
                    <div id='walletBreakdownDiv'>
                        <WalletBreakdown />
                    </div>
                    <div id='buyingPowerCardDiv'>
                        <BuyingPowerCard />
                    </div>

                </div>
                <div id='trendingAndBuyingPowerDiv'>
                    <div id='walletPortfolioDiv'>
                        <p id='breakdownText'>Breakdown of your assets:</p>
                        <WalletPortfolio />
                    </div>
                    <div id='trendingCardDiv'>
                        <TrendingCard />
                    </div>
                </div>
            </div>
        </div>
    );
}
