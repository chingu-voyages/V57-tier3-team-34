import React from "react";
import { IoClose } from "react-icons/io5";

const FailureModal = ({
	closeFailureModal,
}: {
	closeFailureModal: () => void;
}) => {
	return (
		<div className="modal modal-open">
			<div className="modal-box text-center">
				<div className="flex justify-center mb-4">
					<div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
						{/*
            Cancel icon using react-icons.
            We'll use IoClose from react-icons/io5 for a clear cancel/close symbol.
          */}
						{/*
            Make sure to import IoClose at the top of the file:
            import { IoClose } from "react-icons/io5";
            (If not already imported elsewhere)
          */}
						<IoClose size={32} className="text-error-content" />
					</div>
				</div>
				<h3 className="font-bold text-lg mb-2">Voting Failed!</h3>
				<p className="mb-4">Please try again or contact support</p>
				<div className="modal-action justify-center">
					<button className="btn btn-primary" onClick={closeFailureModal}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default FailureModal;
