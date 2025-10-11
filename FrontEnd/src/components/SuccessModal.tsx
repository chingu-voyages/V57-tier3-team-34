import React from "react";
import { IoCheckmark } from "react-icons/io5";

const SuccessModal = ({
	closeSuccessModal,
}: {
	closeSuccessModal: () => void;
}) => {
	return (
		<div className="modal modal-open">
			<div className="modal-box text-center">
				<div className="flex justify-center mb-4">
					<div className="w-16 h-16 bg-success rounded-full flex items-center justify-center">
						<IoCheckmark size={32} className="text-success-content" />
					</div>
				</div>
				<h3 className="font-bold text-lg mb-2">
					Votes Submitted Successfully!
				</h3>
				<p className="mb-4">
					Thank you for participating in the democratic process. Your vote has
					been recorded.
				</p>
				<div className="modal-action justify-center">
					<button className="btn btn-primary" onClick={closeSuccessModal}>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default SuccessModal;
