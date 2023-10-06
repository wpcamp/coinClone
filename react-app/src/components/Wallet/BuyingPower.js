import { useSelector } from "react-redux";
import "./Wallet.css";

export default function BuyingPowerCard() {
    const sessionUser = useSelector((state) => state.session.user);


    return (
        <>
            <div id='buyingPowerFull'>
                <div id='buyingPowerHead'>
                    My Cash:
                </div>
                <table className='coinTable' id='buyingPowerTable'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>USDC</td>
                            <td>${sessionUser.buyingPower}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )

}