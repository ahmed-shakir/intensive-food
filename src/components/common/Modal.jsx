import React from 'react';
import Button from './form/Button';
import PropTypes from "prop-types";

function Modal({title, children, hidden, submitDisabled, submitButtonLabel, cancelButtonLabel, onSubmit, onCancel}) {
    return (
        <div style={{ backgroundColor: "rgba(0,0,0,.5)" }} id="myModal" className="modal modal-dialog-centered" tabIndex="-1" aria-labelledby="modalTitle" aria-hidden="true" hidden={hidden}>
            <div style={{ width: "100%" }} className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 id="modalTitle" className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onCancel}></button>
                    </div>
                    <div className="modal-body">
                        {children}
                    </div>
                    <div className="modal-footer">
                        <Button type="reset" label={cancelButtonLabel} className="btn btn-outline-secondary" iconClass="fas fa-ban" onClick={onCancel} />
                        <Button label={submitButtonLabel} className="btn btn-outline-primary" iconClass="fas fa-sd-card" onClick={onSubmit} disabled={submitDisabled} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Modal;

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.object.isRequired,
    hidden: PropTypes.bool.isRequired,
    submitDisabled: PropTypes.bool,
    submitButtonLabel: PropTypes.string,
    cancelButtonLabel: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

Modal.defaultProps = {
    title: "Popup",
    hidden: false,
    submitDisabled: false,
    submitButtonLabel: "Submit",
    cancelButtonLabel: "Cancel"
};
