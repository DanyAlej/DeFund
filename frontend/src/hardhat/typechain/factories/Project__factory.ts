/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  Signer,
  BigNumberish,
  Contract,
  ContractFactory,
  Overrides,
} from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";

import type { Project } from "../Project";

export class Project__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    _goal: BigNumberish,
    _charityName: string,
    _description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Project> {
    return super.deploy(
      _goal,
      _charityName,
      _description,
      overrides || {}
    ) as Promise<Project>;
  }
  getDeployTransaction(
    _goal: BigNumberish,
    _charityName: string,
    _description: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _goal,
      _charityName,
      _description,
      overrides || {}
    );
  }
  attach(address: string): Project {
    return super.attach(address) as Project;
  }
  connect(signer: Signer): Project__factory {
    return super.connect(signer) as Project__factory;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Project {
    return new Contract(address, _abi, signerOrProvider) as Project;
  }
}

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_goal",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_charityName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "approvals",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "balanceOfProject",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "charityAddress",
    outputs: [
      {
        internalType: "address payable",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "charityName",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "currentAmount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "description",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "donate",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "donations",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "donators",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getNumberOfDonors",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "goal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "isFunded",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "numberOfApprovals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalDonated",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50604051610a68380380610a688339818101604052606081101561003357600080fd5b81516020830180516040519294929383019291908464010000000082111561005a57600080fd5b90830190602082018581111561006f57600080fd5b825164010000000081118282018810171561008957600080fd5b82525081516020918201929091019080838360005b838110156100b657818101518382015260200161009e565b50505050905090810190601f1680156100e35780820380516001836020036101000a031916815260200191505b506040526020018051604051939291908464010000000082111561010657600080fd5b90830190602082018581111561011b57600080fd5b825164010000000081118282018810171561013557600080fd5b82525081516020918201929091019080838360005b8381101561016257818101518382015260200161014a565b50505050905090810190601f16801561018f5780820380516001836020036101000a031916815260200191505b50604052505082516101a9915060009060208501906101e4565b5080516101bd9060019060208401906101e4565b5050600380546001600160a01b03191633179055506009805460ff19169055600255610277565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061022557805160ff1916838001178555610252565b82800160010185558215610252579182015b82811115610252578251825591602001919060010190610237565b5061025e929150610262565b5090565b5b8082111561025e5760008155600101610263565b6107e2806102866000396000f3fe6080604052600436106100b75760003560e01c8062b37044146100bc57806312424e3f146100e35780631da32711146100fa57806336f89bcd1461010f578063401938831461019957806354015cc5146101ae5780635d0341ba146101c35780637284e4161461020a5780637c6543031461021f57806387cb354014610234578063ac62f56614610249578063afcf2fc41461028f578063cc6cb19a146102a4578063ed88c68e146102d7578063f441b1c8146102df575b600080fd5b3480156100c857600080fd5b506100d16102f4565b60408051918252519081900360200190f35b3480156100ef57600080fd5b506100f86102fa565b005b34801561010657600080fd5b506100d1610471565b34801561011b57600080fd5b50610124610477565b6040805160208082528351818301528351919283929083019185019080838360005b8381101561015e578181015183820152602001610146565b50505050905090810190601f16801561018b5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b3480156101a557600080fd5b506100d1610505565b3480156101ba57600080fd5b506100d161050b565b3480156101cf57600080fd5b506101f6600480360360208110156101e657600080fd5b50356001600160a01b031661050f565b604080519115158252519081900360200190f35b34801561021657600080fd5b50610124610524565b34801561022b57600080fd5b506101f661057e565b34801561024057600080fd5b506100d1610587565b34801561025557600080fd5b506102736004803603602081101561026c57600080fd5b503561058d565b604080516001600160a01b039092168252519081900360200190f35b34801561029b57600080fd5b506102736105b4565b3480156102b057600080fd5b506100d1600480360360208110156102c757600080fd5b50356001600160a01b03166105c3565b6100f86105d5565b3480156102eb57600080fd5b506100d1610693565b60085490565b6000805b6005548110801561030d575081155b15610348576005818154811061031f57fe5b6000918252602090912001546001600160a01b031633141561034057600191505b6001016102fe565b508061039b576040805162461bcd60e51b815260206004820181905260248201527f4f6e6c7920646f6e6f72732063616e2063616c6c2074686973206d6574686f64604482015290519081900360640190fd5b3360009081526006602052604090205460ff166103d957336000908152600660205260409020805460ff191660019081179091556007805490910190555b61040c60405180604001604052806012815260200171417070726f7665642c2072656c656173653f60701b815250610699565b600254600854101580156104235750600554600754145b1561046e576104666040518060400160405280601e81526020017f52656c656173696e672066756e647320636f6e646974696f6e73206d65740000815250610699565b61046e61073f565b50565b60055490565b6000805460408051602060026001851615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104fd5780601f106104d2576101008083540402835291602001916104fd565b820191906000526020600020905b8154815290600101906020018083116104e057829003601f168201915b505050505081565b60025481565b4790565b60066020526000908152604090205460ff1681565b60018054604080516020600284861615610100026000190190941693909304601f810184900484028201840190925281815292918301828280156104fd5780601f106104d2576101008083540402835291602001916104fd565b60095460ff1681565b60075481565b6005818154811061059a57fe5b6000918252602090912001546001600160a01b0316905081565b6003546001600160a01b031681565b60046020526000908152604090205481565b60095460ff1615156001141561062e576040805162461bcd60e51b8152602060048201526019602482015278141c9bda9958dd081a5cc8185b1c9958591e48199d5b991959603a1b604482015290519081900360640190fd5b3360008181526004602052604081208054349081019091556005805460018101825592527f036b6384b5eca791c62761152d0c79bb0604c104a5fb6f4eb0703f3154bb3db090910180546001600160a01b031916909217909155600880549091019055565b60085481565b61046e816040516024018080602001828103825283818151815260200191508051906020019080838360005b838110156106dd5781810151838201526020016106c5565b50505050905090810190601f16801561070a5780820380516001836020036101000a031916815260200191505b5060408051601f198184030181529190526020810180516001600160e01b031663104c13eb60e21b179052925061078b915050565b6003546008546040516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801561077b573d6000803e3d6000fd5b506009805460ff19166001179055565b80516a636f6e736f6c652e6c6f67602083016000808483855afa505050505056fea264697066735822122050a624149b0938ab19307e30d1b3f14e3f8411a32dfafedbf66b883a760d889d64736f6c63430007030033";