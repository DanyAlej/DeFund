//import { HardhatRuntimeEnvironment } from "hardhat/types";
//import { DeployFunction } from "hardhat-deploy/types";
import {BigNumber} from '@ethersproject/bignumber';
import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from "./../hardhat/SymfoniContext";
import { SignerContext } from "./../hardhat/SymfoniContext";
import './Donors.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
//import axios from 'axios';

function Donors() {
    const project = useContext(ProjectContext);
    //const [provider, setProvider] = useContext(ProviderContext);
    const [signer, setSigner] = useContext(SignerContext);
    const oneEth = BigNumber.from("1000000000000000000");
    //const [deployedAdresses, setDeployedAddresses] = useState<String[]>([]);
 
    const [projectAddress, setProjectAddress] = useState<string>("");
    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState<BigNumber>(BigNumber.from('0'));
    const [currentDonatedTotal, setCurrentDonatedTotal] = useState<BigNumber>(BigNumber.from('0'));
    const [numberOfApprovals, setNumberOfApprovals] = useState(0);
    const [numberOfDonors, setNumberOfDonors] = useState(0);
    const [donation, setDonation] = useState(0);
    const [donors, setDonors] = useState<String[]>([]);
    const [isFunded, setIsFunded] = useState<Boolean>(false);
    
    //Non-functional Aesthetics only
    const [copied, setCopied] = useState<boolean>(false);

    useEffect(() => {
        const doAsync = async () => {
            //axios.get('http://localhost:3002/projects')
                //.then(res => {
                    //console.log(res.data);
                    //for(var i=0; i < res.data.length; i++) {
                        //console.log(res.data[i].address);
                        //console.log(typeof(res.data[i].address));
                        //setDeployedAddresses(deployedAdresses => [...deployedAdresses, res.data[i].address]);
                    //}
                //});
            //for(var i=0; i < deployedAdresses.length; i++) {
                //if(!project.instance) return
                //let currentAddress = deployedAdresses[i];
                //project.instance.attach(currentAddress.toString());
                //console.log(await project.instance.description());
                //console.log(await project.instance.charityName());
            //}
            if (!project.instance) {
                console.log("Project hasn't been deployed")
            } else {
                console.log("project is already deployed at ", project.instance.address)
                setProjectAddress(project.instance.address)
                setGoal((await project.instance.goal()).div(oneEth));
                setProjectDescription(await project.instance.description());
                let totalDonatedNow = await project.instance.totalDonated();
                if (totalDonatedNow.eq(BigNumber.from(0))) {
                    setCurrentDonatedTotal(BigNumber.from(0));
                }
                else {
                    setCurrentDonatedTotal((await project.instance.totalDonated()).div(oneEth));
                }
                setCharityName(await project.instance.charityName());
                setNumberOfApprovals((await project.instance.numberOfApprovals()).toNumber());
                setNumberOfDonors((await project.instance.getNumberOfDonors()).toNumber());
                setIsFunded(await project.instance.isFunded());
                console.log(await project.instance.balanceOfProject());
                let newDonor: String;
                let i;
                for(i=0; i < numberOfDonors; i++) {
                    newDonor = await project.instance.donators(i);
                    console.log(newDonor);
                    setDonors(donors => [...donors, newDonor]);
                }
            }
        };
        doAsync();
    }, [project, numberOfDonors])

    function donate() {
        const doAsync = async () => {
            if(!project.instance) return
            const signerAddress = await signer?.getAddress();
            const tempDonation = BigNumber.from(donation).mul(oneEth);
            project.instance.donate({from: signerAddress, value: tempDonation});
        }
        doAsync();
    }

    function approve() {
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
        <div className="containerDonor">
            <div className="card">
                {isFunded ? <p> Funded </p> :
                <p> Not Funded </p>}
                <div className="projectAddressSection">
                    <p className="card__name">{projectAddress}</p>
                    <CopyToClipboard text={projectAddress} onCopy={() => setCopied(true)}>
                    <button className="copyButton" aria-expanded="false" id="menu-trigger">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-clipboard" viewBox="0 0 16 16">
                          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
                        </svg>
                    </button>
                    </CopyToClipboard>
                </div>
                { copied ? <p> Copied! </p> : <span></span>}
                <p className="card__name">{charityName}</p>
                <p className="card__name">Project goal: {goal.toNumber()} ETH</p>
                <p>{projectDescription}</p>
                <p>Donations until now: {currentDonatedTotal.toNumber()} ETH</p>
                <p>Approvals until now: {numberOfApprovals}</p>
                <p>Number of donors until now: {numberOfDonors}</p>
                {donorList}
                <div className="form__group field">
                    <input onChange={(e) => setDonation(parseInt(e.target.value))} type="input" className="form__field" placeholder="Donation in ETH" name="name" id='name' required />
                    <label className="form__label">Donation in ETH</label>
                </div>
                <br />
                <button onClick={donate} className="btn draw-border"> Donate! </button>
                <button onClick={approve} className="btn draw-border">  Approve! </button>
            </div>
        </div>
    );
}

export default Donors;
