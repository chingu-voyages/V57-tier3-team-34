import React from "react";
import { CheckCircle, Shield, Eye } from "lucide-react";
const Features = () => {
	return (
		<div className="py-16 bg-gradient-to-br from-gray-900 via-black to-gray-900">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="text-center mb-12">
					<h2 className="text-4xl font-bold text-white mb-4">
						Why Choose E-Voting?
					</h2>
					<p className="text-xl text-gray-400">
						Building trust through transparency and technology
					</p>
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:shadow-2xl hover:shadow-white/10 transition-all hover:border-white/40">
						<div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
							<Shield className="text-black" size={28} />
						</div>
						<h3 className="text-xl font-bold text-white mb-3">
							Secure & Private
						</h3>
						<p className="text-gray-400">
							encryption ensures your vote remains confidential and
							tamper-proof.
						</p>
					</div>

					<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:shadow-2xl hover:shadow-white/10 transition-all hover:border-white/40">
						<div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
							<CheckCircle className="text-black" size={28} />
						</div>
						<h3 className="text-xl font-bold text-white mb-3">
							Verified Results
						</h3>
						<p className="text-gray-400">
							vote counting with verification for complete transparency.
						</p>
					</div>

					<div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-8 rounded-2xl border border-white/20 hover:shadow-2xl hover:shadow-white/10 transition-all hover:border-white/40">
						<div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-4">
							<Eye className="text-black" size={28} />
						</div>
						<h3 className="text-xl font-bold text-white mb-3">
							Transparent Process
						</h3>
						<p className="text-gray-400">
							Track your vote results with complete visibility into the
							electoral process.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Features;
