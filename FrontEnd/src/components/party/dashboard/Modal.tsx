import { IoCloseOutline } from "react-icons/io5";

interface ModalProps {
	isOpen: boolean;
	children: React.ReactNode;
	onClose: () => void;
	title: string;
}

const Modal = ({ isOpen, children, onClose, title }: ModalProps) => {
	return (
		<>
			<dialog id="my_modal_1" className={`modal ${isOpen ? "modal-open" : ""}`}>
				<div className="modal-box w-4/5">
					<div onClick={onClose} className="flex justify-between items-center">
						<div className="font-semibold text-xl">{title}</div>
						<IoCloseOutline
							className="cursor-pointer hover:text-error"
							size={20}
						/>
					</div>
					<div className="divider my-0"></div>
					<div className="modal-action justify-start mt-5">{children}</div>
				</div>
			</dialog>
		</>
	);
};

export default Modal;
