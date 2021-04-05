//import { HardhatRuntimeEnvironment } from "hardhat/types";
//import { DeployFunction } from "hardhat-deploy/types";
import React, { useState, useEffect, useContext } from 'react';
import {Project} from '../hardhat/typechain/Project';
import { ProjectContext } from "./../hardhat/SymfoniContext";

function Charities() {
    const project = useContext(ProjectContext);
    //const [provider, setProvider] = useContext(ProviderContext);

    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState(0);
    const [newProject, setNewProject] = useState<Project>();

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
            //console.log(goal);
            //console.log(charityName);
            //console.log(projectDescription);
            //setNewProject(await project.factory.deploy(goal, charityName, projectDescription));
            //console.log(typeof(newProject?.address));
            //if(!newProject || !project.instance) return
            //project.instance.attach(newProject.address);
            //console.log(project.instance.address);
            if(!project.instance) return
            let tx = await project.instance.setProject(goal, charityName, projectDescription)
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
                console.log(charityName);
            }

        };
        doAsync();
    }, [project])


    return (
            <div>
                <h1> Follow the next steps to create the project you want to fund </h1>
                <input type="text" name="charityName" value={charityName} onChange={(e) => setCharityName(e.target.value)}></input>
                <input type="text" name="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></input>
                <input type="number" name="goal" value={goal} onChange={(e) => setGoal(parseInt(e.target.value))}></input>
                <button onClick={handleCreateProject}>Create project!</button>
            </div>
    );
}

export default Charities;
