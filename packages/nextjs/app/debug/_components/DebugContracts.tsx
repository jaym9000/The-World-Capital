"use client";

import { useEffect, useMemo } from "react";
import { useSessionStorage } from "usehooks-ts";
import { BarsArrowUpIcon } from "@heroicons/react/20/solid";
import { ContractUI } from "~~/app/debug/_components/contract";
import { ContractName, GenericContract } from "~~/utils/scaffold-eth/contract";
import { useAllContracts } from "~~/utils/scaffold-eth/contractsData";

const selectedContractStorageKey = "scaffoldEth2.selectedContract";

export function DebugContracts() {
  const contractsData = useAllContracts();
  const contractNames = useMemo(
    () =>
      Object.keys(contractsData).sort((a, b) => {
        return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
      }) as ContractName[],
    [contractsData],
  );

  const [selectedContract, setSelectedContract] = useSessionStorage<ContractName>(
    selectedContractStorageKey,
    contractNames[0],
    { initializeWithValue: false },
  );

  useEffect(() => {
    if (!contractNames.includes(selectedContract)) {
      setSelectedContract(contractNames[0]);
    }
  }, [contractNames, selectedContract, setSelectedContract]);

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 py-8 lg:py-12 justify-center items-center">
      {contractNames.length === 0 ? (
        <p className="text-3xl mt-14 text-red-600 dark:text-red-400 font-bold">No contracts found!</p>
      ) : (
        <>
          {contractNames.length > 1 && (
            <div className="flex flex-row gap-2 w-full max-w-7xl pb-1 px-6 lg:px-10 flex-wrap">
              {contractNames.map(contractName => (
                <button
                  className={`btn btn-lg font-bold ${
                    contractName === selectedContract
                      ? "bg-blue-600 dark:bg-blue-800 text-white hover:bg-blue-700 dark:hover:bg-blue-900 border-2 border-white dark:border-gray-700"
                      : "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-700 border-2 border-blue-600 dark:border-gray-600"
                  } rounded-full shadow-lg transition-all duration-300`}
                  key={contractName}
                  onClick={() => setSelectedContract(contractName)}
                >
                  <span className="mr-2">📜</span>
                  {contractName}
                  {(contractsData[contractName] as GenericContract)?.external && (
                    <span className="ml-2 text-yellow-400">★</span>
                  )}
                </button>
              ))}
            </div>
          )}
          {contractNames.map(contractName => (
            <ContractUI
              key={contractName}
              contractName={contractName}
              className={contractName === selectedContract ? "" : "hidden"}
              theme={{
                primary: "bg-gradient-to-r from-blue-600 to-red-600",
                secondary: "bg-white text-blue-600",
                accent: "text-yellow-400"
              }}
            />
          ))}
        </>
      )}
    </div>
  );
}
