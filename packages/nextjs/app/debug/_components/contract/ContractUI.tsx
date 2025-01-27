"use client";

// @refresh reset
import { useReducer } from "react";
import { ContractReadMethods } from "./ContractReadMethods";
import { ContractVariables } from "./ContractVariables";
import { ContractWriteMethods } from "./ContractWriteMethods";
import { Address, Balance } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useNetworkColor } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { ContractName } from "~~/utils/scaffold-eth/contract";
import { MagnifyingGlassIcon, PencilIcon, ChartBarIcon } from "@heroicons/react/24/outline";

type ContractUIProps = {
  contractName: ContractName;
  className?: string;
  theme: {
    primary: string;
    secondary: string;
    accent: string;
  };
};

/**
 * UI component to interface with deployed contracts.
 **/
export const ContractUI = ({ contractName, className = "", theme }: ContractUIProps) => {
  const [refreshDisplayVariables, triggerRefreshDisplayVariables] = useReducer(value => !value, false);
  const { targetNetwork } = useTargetNetwork();
  const { data: deployedContractData, isLoading: deployedContractLoading } = useDeployedContractInfo({ contractName });
  const networkColor = useNetworkColor();

  if (deployedContractLoading) {
    return (
      <div className="mt-14">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!deployedContractData) {
    return (
      <p className="text-3xl mt-14">
        {`No contract found by the name of "${contractName}" on chain "${targetNetwork.name}"!`}
      </p>
    );
  }

  return (
    <div className={`${className} w-full max-w-7xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-3xl shadow-xl border-2 border-blue-100 dark:border-gray-700 p-8`}>
      <div className="mb-8">
        <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600 dark:from-blue-400 dark:to-red-400">
          {contractName}
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <Address 
            address={deployedContractData.address} 
          />
          <Balance 
            address={deployedContractData.address} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Read Methods Section */}
        <div className="bg-blue-50 dark:bg-blue-900/50 p-6 rounded-2xl border-2 border-blue-100 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-4">
            <MagnifyingGlassIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
            <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Read Methods</h3>
          </div>
          <ContractReadMethods deployedContractData={deployedContractData} />
        </div>

        {/* Write Methods Section */}
        <div className="bg-red-50 dark:bg-red-900/50 p-6 rounded-2xl border-2 border-red-100 dark:border-red-800">
          <div className="flex items-center gap-2 mb-4">
            <PencilIcon className="h-6 w-6 text-red-600 dark:text-red-300" />
            <h3 className="text-2xl font-bold text-red-800 dark:text-red-200">Write Methods</h3>
          </div>
          <ContractWriteMethods
            deployedContractData={deployedContractData}
            onChange={triggerRefreshDisplayVariables}
          />
        </div>
      </div>

      {/* Variables Section */}
      <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border-2 border-blue-100 dark:border-gray-700 shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <ChartBarIcon className="h-6 w-6 text-blue-600 dark:text-blue-300" />
          <h3 className="text-2xl font-bold text-blue-800 dark:text-blue-200">Contract Variables</h3>
        </div>
        <ContractVariables
          refreshDisplayVariables={refreshDisplayVariables}
          deployedContractData={deployedContractData}
        />
      </div>
    </div>
  );
};
