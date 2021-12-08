import './App.css';
import React, {FormEventHandler, useEffect, useState} from 'react';
import web3 from './web3';
import lottery from './lottery';

interface Status {
    message: string;
    ready: boolean;
}

function App() {
    const [manager, setManager] = useState('');
    const [players, setPlayers] = useState<Array<string>>([]);
    const [balance, setBalance] = useState('');
    const [entryFee, setEntryFee] = useState('');
    const [status, setStatus] = useState<Status>({
        message: 'Ready',
        ready: true
    });

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

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const accounts = await web3.eth.getAccounts();

        setStatus({message: 'Waiting on transaction success...', ready: false});

        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei(entryFee, 'ether')
        })

        setStatus({message: 'Entry successful', ready: true});
    };

    return (
        <>
            <section>
                <h2>Lottery Contract</h2>
                <p>Contract managed by {manager}</p>
                <p>There are currently {players.length} people entered.</p>
                <p>The current prize is of {web3.utils.fromWei(balance, 'ether')} eth.</p>
            </section>
            <hr/>
            <section>
                <form onSubmit={handleSubmit}>
                    <h4>Enter lottery</h4>
                    {status.ready ? (<div className="entry-form__input">
                        <label>Amount of eth to enter</label>
                        <input
                            min="0.00100001"
                            onChange={event => {
                                setEntryFee(event.target.value);
                            }}
                            required
                            step="0.00000001"
                            type={'number'}
                            value={entryFee}
                        />
                        <button>Enter</button>
                    </div>) : null}
                    <strong>{status.message}</strong>
                </form>
            </section>
        </>
    );
}

export default App;
