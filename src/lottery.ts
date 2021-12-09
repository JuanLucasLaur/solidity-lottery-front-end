import web3 from './web3';
import {AbiItem} from 'web3-utils';

const contractAddress = '0xBa419213248033F253A377eBa259C57DC6445D57';
const abi: AbiItem[] = [
    {
        inputs: [],
        stateMutability: 'nonpayable',
        type: 'constructor',
        constant: undefined,
        payable: undefined
    },
    {
        constant: true,
        inputs: [],
        name: 'manager',
        outputs: [{'name': '', 'type': 'address'}],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }, {
        constant: false,
        inputs: [],
        name: 'pickWinner',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
    }, {
        constant: true,
        inputs: [],
        name: 'getPlayers',
        outputs: [{'name': '', 'type': 'address[]'}],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }, {
        constant: false,
        inputs: [],
        name: 'enter',
        outputs: [],
        payable: true,
        stateMutability: 'payable',
        type: 'function'
    }, {
        constant: true,
        inputs: [{'name': '', 'type': 'uint256'}],
        name: 'players',
        outputs: [{'name': '', 'type': 'address'}],
        payable: false,
        stateMutability: 'view',
        type: 'function'
    }, {
        inputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor'
    }
];

export default new web3.eth.Contract(abi, contractAddress);
