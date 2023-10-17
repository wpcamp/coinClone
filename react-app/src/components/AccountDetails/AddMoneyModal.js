import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkAddFunds } from '../../store/session';
import { useModal } from '../../context/Modal';
import './AddMoneyModal.css';

const AddMoneyModal = () => {
    const [amount, setAmount] = useState('');
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
    };

    const handleAddFunds = () => {
        dispatch(thunkAddFunds(amount));
        setAmount('');
        closeModal();
    };

    return (
        <div class="modal" id="modal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h2>Add Funds</h2>
                        <span class="close" id="close-button">&times;</span>
                    </div>
                        <h5>I hope you're good for it!</h5>
                    <div class="modal-body">
                        <label for="amount">Amount:</label>
                        <input type="number" id="amount" name="amount" onChange={handleAmountChange}/>
                    </div>
                    <div class="modal-footer">
                        <button id="add-funds-button" onClick={handleAddFunds}>Add Funds</button>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default AddMoneyModal;
