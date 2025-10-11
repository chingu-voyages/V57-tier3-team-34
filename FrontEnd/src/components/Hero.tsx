import { Shield, CheckCircle, ArrowRight, Lock } from "lucide-react";
import { Link } from "react-router";
const Hero = () => {
	return (
		
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
			 <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                  🇳🇬 Secure • Transparent • Democratic
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                Your Voice,
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400"> Your Vote</span>,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-300 to-white">Nigeria's Future</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Experience secure, transparent, and accessible voting for all Nigerians. Exercise your democratic right with confidence and ease.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
				<Link to="/voter/register">
                <button className="bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg shadow-white/20 flex items-center justify-center space-x-2">
                  <span >Register to Vote</span>
                  <ArrowRight size={20} />
                </button>
               </Link>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/20">
                <div>
                  <p className="text-3xl font-bold text-white">2.5M+</p>
                  <p className="text-sm text-gray-400">Registered Voters</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">99.9%</p>
                  <p className="text-sm text-gray-400">Uptime</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-white">100%</p>
                  <p className="text-sm text-gray-400">Secure</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20">
                <div className="space-y-6">
                  <div className="text-center pb-6 border-b border-white/20">
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Voting Process
                    </h3>
                    <p className="text-gray-400 text-sm">Simple, secure, and transparent</p>
                  </div>

                  <div className="space-y-5">
                    <div className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black">
                        1
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Register</h4>
                        <p className="text-gray-400 text-sm">Create your voter account with valid identification</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black">
                        2
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Verify</h4>
                        <p className="text-gray-400 text-sm">Complete identity verification for secure access</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black">
                        3
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Vote</h4>
                        <p className="text-gray-400 text-sm">Cast your vote securely and privately</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-black">
                        4
                      </div>
                      <div>
                        <h4 className="text-white font-semibold mb-1">Track</h4>
                        <p className="text-gray-400 text-sm">Monitor your vote status and view results</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20 flex items-center justify-center space-x-2 text-gray-400 text-xs">
                    <Lock size={12} />
                    <span>Verified voting system</span>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 animate-pulse">
                <Shield className="text-white" size={32} />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white/10 backdrop-blur-md p-4 rounded-xl shadow-lg border border-white/20 animate-pulse">
                <CheckCircle className="text-white" size={32} />
              </div>
            </div>
          </div>
        </div>
		</div>
		</div>
		
	);
};

export default Hero;
