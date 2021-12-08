import React, {useEffect, useState} from 'react';
import web3 from './web3';
import lottery from './lottery';

function App() {
    const [manager, setManager] = useState('');
    const [players, setPlayers] = useState(['']);
    const [balance, setBalance] = useState('');

    useEffect(() => {
        const fetchManager = async () => {
            const fetchedManager = await lottery.methods.manager().call();
            const fetchedPlayers = await lottery.methods.getPlayers().call();
            const fetchedBalance = await web3.eth.getBalance(lottery.options.address);

            setManager(fetchedManager);
            setPlayers(fetchedPlayers);
            setBalance(fetchedBalance);
        };

        fetchManager();
    }, []);

    return (
        <div>
            <h2>Lottery Contract</h2>
            <p>Contract managed by {manager}</p>
            <p>There are currently {players.length} people entered.</p>
            <p>The current prize is of {web3.utils.fromWei(balance, 'ether')} ether.</p>
        </div>
    );
}

export default App;
