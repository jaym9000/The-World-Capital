import { DebugContracts } from "./_components/DebugContracts";
import type { NextPage } from "next";
import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";

export const metadata = getMetadata({
  title: "Contract Debugger",
  description: "Inspect and interact with smart contracts",
});

const Debug: NextPage = () => {
  return (
    <>
      <DebugContracts />
      <div className="text-center mt-8 bg-gradient-to-r from-blue-600 to-red-600 text-white py-12 px-8 rounded-3xl shadow-2xl mb-12 animate-fade-in">
        <h1 className="text-center mb-8">
          <span className="block text-4xl mb-4 font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-white">
            🛠 Smart Contract Inspector
          </span>
          <span className="block text-5xl font-bold mb-4">CONTRACT DEBUGGER</span>
          <span className="block text-3xl bg-white text-blue-600 px-4 py-2 rounded-full inline-block">
            <ShieldCheckIcon className="h-8 w-8 inline-block mr-2" />
            Verified Tools
          </span>
        </h1>
        <div className="bg-white/20 p-6 rounded-xl">
          <p className="text-xl mb-4">
            Safely interact with and verify contract functionality
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <p className="text-sm font-mono italic">
                Looking for the debug components? They&apos;re in{" "}
                <code className="bg-white/20 text-yellow-200 px-2 py-1 rounded">
                  packages/nextjs/app/debug
                </code>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Debug;
