//import { HardhatRuntimeEnvironment } from "hardhat/types";
//import { DeployFunction } from "hardhat-deploy/types";
import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from "./../hardhat/SymfoniContext";
import {BigNumber} from '@ethersproject/bignumber';
//import axios from 'axios';

function Charities() {
    const project = useContext(ProjectContext);
    //const [provider, setProvider] = useContext(ProviderContext);

    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState(0);
    const oneEth = BigNumber.from("1000000000000000000");

    //const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
        //console.log('Form submitted');
        //console.log(charityName);
        //console.log(projectDescription);
        //console.log(goal);
        
        //const { deployments, getNamedAccounts } = hre;
        //const { deploy } = deployments;

        //const { deployer } = await getNamedAccounts();

        //await deploy("Project", {
            //from: deployer,
            //contract: "Project",
            //args: [goal, charityName, projectDescription],
            //log: true,
        //});
    //}

    const handleCreateProject = () => {
        const doAsync = async () => {
            //if(!project.factory) throw Error("Factory instance not ready");
            //let tx = await project.factory.deploy(BigNumber.from(goal).mul(oneEth), charityName, projectDescription);
            //console.log(tx.address);
            //project.instance.attach(tx.address);
            //axios.post('http://localhost:3002/projects', {address: tx.address})
                //.then(res => {
                    //console.log(res);
                    //console.log(res.data)});
            if(!project.instance) return
            let tx = await project.instance.setProject((BigNumber.from(goal).mul(oneEth)), charityName, projectDescription)
            await tx.wait();
        };
        doAsync();
    }

    useEffect(() => {
        const doAsync = async () => {
            if (!project.instance) {
                console.log("Project hasn't been deployed")
            } else {
                console.log("project is already deployed at ", project.instance.address)
            }

        };
        doAsync();
    }, [project])


    return (
            <div className="parent">
            <div className="containerCharity">
                <div className="cardCharity">
                    <p className="card__name"> Sigue los siguientes pasos para crear tu proyecto </p> 
                    <div className="form__group field">
                        <input onChange={(e) => setCharityName(e.target.value)} type="input" className="form__field" placeholder="Charity Name" name="name" id='name' required />
                        <label className="form__label">Nombre de la fundación</label>
                    </div>
                    <div className="form__group field">
                        <input onChange={(e) => setProjectDescription(e.target.value)} type="input" className="form__field" placeholder="Project Description" name="name" id='name' required />
                        <label className="form__label">Descripción del proyecto</label>
                    </div>
                    <div className="form__group field">
                        <input onChange={(e) => setGoal(parseInt(e.target.value))} type="input" className="form__field" placeholder="Goal in ETH" name="name" id='name' required />
                        <label className="form__label">Meta en Eth</label>
                    </div>
                    <button className="btn draw-border" onClick={handleCreateProject}>Crear proyecto!</button>
                </div>
            </div>
            </div>
    );
}

export default Charities;
