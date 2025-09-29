import "../css/ConfirmModal.css";

export default function ConfirmModal({onCancel, onConfirm}) {
    return <div className="confirm-modal-container">
        <div className="confirm-modal">
            <p>Are you sure you want to proceed with payment?</p>
            <div className="button-container">
                <button onClick={onCancel}>Cancel</button>
                <button onClick={onConfirm}>Confirm</button>
            </div>
        </div>
    </div>
}