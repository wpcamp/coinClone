import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import OpenModalButton from '../OpenModalButton';
import Sidebar from '../Sidebar';
import './AccountDetails.css';
import AddMoneyModal from './AddMoneyModal';

export default function AccountDetails() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(logout());
        localStorage.removeItem("userEmail");
    };

    // let stringBuying = `${user.buyingPower}`?.split(".");
    // let firstHalf = stringBuying[0];
    // let secondHalf = stringBuying[1]?.slice(0, 2);
    // let finalBuying = firstHalf + "." + secondHalf;

    const formattedBuyingPower = parseFloat(user.buyingPower).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });


    return (
        <div className="account-details-container">
            <div className="sidebar-container">
                <Sidebar />
            </div>
            <div className="content-container">
                <div className="section">
                    <h2 className="section-title">Basic Information</h2>
                    <p className="info"><strong>Name:</strong> {user.firstName} {user.lastName}</p>
                    <p className="info"><strong>Email:</strong> {user.email}</p>
                </div>
                <div className="section">
                    <h2 className="section-title">Wallet Info</h2>
                    <p className="info"><strong>Buying Power:</strong> {formattedBuyingPower}</p>
                </div>
                <div className="sectionAdd">
                    <div className='add-funds-button'>
                        <OpenModalButton
                            modalComponent={<AddMoneyModal />}
                            buttonText={"Add Funds"}
                        />
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}
