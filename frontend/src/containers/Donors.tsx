//import { HardhatRuntimeEnvironment } from "hardhat/types";
//import { DeployFunction } from "hardhat-deploy/types";
import {BigNumber} from '@ethersproject/bignumber';
import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from "./../hardhat/SymfoniContext";
import { SignerContext } from "./../hardhat/SymfoniContext";

function Donors() {
    const project = useContext(ProjectContext);
    //const [provider, setProvider] = useContext(ProviderContext);
    const [signer, setSigner] = useContext(SignerContext);
    const bigNumberToEth = BigNumber.from("1000000000000000000");
 
    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState<BigNumber>(BigNumber.from('0'));
    const [currentDonatedTotal, setCurrentDonatedTotal] = useState<BigNumber>(BigNumber.from('0'));
    const [donation, setDonation] = useState(0);

    useEffect(() => {
        const doAsync = async () => {
            if (!project.instance) {
                console.log("Project hasn't been deployed")
            } else {
                console.log("project is already deployed at ", project.instance.address)
                setCharityName(await project.instance.charityName());
                setGoal(await project.instance.goal());
                setProjectDescription(await project.instance.description());
                setCurrentDonatedTotal((await project.instance.totalDonated()).div(bigNumberToEth));
            }
        };
        doAsync();
    }, [project])

    function donate() {
        console.log("Donation");
        const doAsync = async () => {
            if(!project.instance) return
            const signerAddress = await signer?.getAddress();
            console.log(signerAddress);
            const tempDonation = BigNumber.from(donation).mul(bigNumberToEth);
            project.instance.donate({from: signerAddress, value: tempDonation});
        }
        doAsync();
    }

    function approve() {
        console.log("Approval");
    }

    return (
        <div>
            <p>Project address: {project.instance?.address}</p>
            <p>Project goal: {goal.toNumber()}</p>
            <p>Project's Charity: {charityName}</p>
            <p>Project description: {projectDescription}</p>
            <p>Doantions until now: {currentDonatedTotal.toNumber()} ETH</p>
            <input onChange={(e) => setDonation(parseInt(e.target.value))}></input>
            <br />
            <button onClick={donate}> Donate! </button>
            <button onClick={approve}> Approve! </button>
        </div>
    );
}

export default Donors;
