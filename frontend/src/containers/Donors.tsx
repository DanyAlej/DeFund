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
    const oneEth = BigNumber.from("1000000000000000000");
 
    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState<BigNumber>(BigNumber.from('0'));
    const [currentDonatedTotal, setCurrentDonatedTotal] = useState<BigNumber>(BigNumber.from('0'));
    const [numberOfApprovals, setNumberOfApprovals] = useState(0);
    const [numberOfDonors, setNumberOfDonors] = useState(0);
    const [donation, setDonation] = useState(0);
    const [donors, setDonors] = useState<String[]>([]);

    useEffect(() => {
        const doAsync = async () => {
            if (!project.instance) {
                console.log("Project hasn't been deployed")
            } else {
                console.log("project is already deployed at ", project.instance.address)
                console.log(await project.instance.donators(0))
                setGoal(await project.instance.goal());
                setProjectDescription(await project.instance.description());
                setCurrentDonatedTotal((await project.instance.totalDonated()).div(oneEth));
                setCharityName(await project.instance.charityName());
                setNumberOfApprovals((await project.instance.numberOfApprovals()).toNumber());
                setNumberOfDonors((await project.instance.getNumberOfDonors()).toNumber());
                let newDonor;
                let i;
                for(i=0; i < numberOfDonors; i++) {
                    newDonor = await project.instance.donators(i);
                    setDonors([...donors, newDonor]);
                }
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
            const tempDonation = BigNumber.from(donation).mul(oneEth);
            project.instance.donate({from: signerAddress, value: tempDonation});
        }
        doAsync();
    }

    function approve() {
        console.log("Approval");
        const doAsync = async () => {
            if(!project.instance) return
                project.instance.approve();
            }
            doAsync();
    }

    const donorList = donors.map((donor, key) => 
        <p key={key}> Donor address: {donor} </p>
        )

    return (
        <div>
            <p>Project address: {project.instance?.address}</p>
            <p>Project goal: {(goal.div(oneEth)).toNumber()} ETH</p>
            <p>Project's Charity: {charityName}</p>
            <p>Project description: {projectDescription}</p>
            <p>Donations until now: {currentDonatedTotal.toNumber()} ETH</p>
            <p>Approvals until now: {numberOfApprovals}</p>
            <p>Number of donors until now: {numberOfDonors}</p>
            {donorList}
            <input onChange={(e) => setDonation(parseInt(e.target.value))}></input>
            <br />
            <button onClick={donate}> Donate! </button>
            <button onClick={approve}> Approve! </button>
        </div>
    );
}

export default Donors;
