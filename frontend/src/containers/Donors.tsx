//import { HardhatRuntimeEnvironment } from "hardhat/types";
//import { DeployFunction } from "hardhat-deploy/types";
import {BigNumber} from '@ethersproject/bignumber';
import React, { useState, useEffect, useContext } from 'react';
import { ProjectContext } from "./../hardhat/SymfoniContext";

function Donors() {
    const project = useContext(ProjectContext);
    //const [provider, setProvider] = useContext(ProviderContext);

    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState<BigNumber>(BigNumber.from('0'));

    useEffect(() => {
        const doAsync = async () => {
            if (!project.instance) {
                console.log("Project hasn't been deployed")
            } else {
                console.log("project is already deployed at ", project.instance.address)
                setCharityName(await project.instance.charityName());
                setGoal(await project.instance.goal());
                setProjectDescription(await project.instance.description());
            }

        };
        doAsync();
    }, [project])


    return (
        <div>
            <p>Project address: {project.instance?.address}</p>
            <p>Project goal: {goal.toNumber()}</p>
            <p>Project's Charity: {charityName}</p>
            <p>Project description: {projectDescription}</p>
        </div>
    );
}

export default Donors;
