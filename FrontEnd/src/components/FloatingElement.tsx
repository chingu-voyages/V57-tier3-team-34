import { Users } from "lucide-react";
const FloatingElement = () => {
	return (
		<div className="bg-gradient-to-br from-gray-900 via-black to-gray-900">
			<div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20">
				<Users className="text-white" size={32} />
			</div>
		</div>
	);
};

export default FloatingElement;
