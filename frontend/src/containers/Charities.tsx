//import { HardhatRuntimeEnvironment } from "hardhat/types";
//import { DeployFunction } from "hardhat-deploy/types";
import React, { useState, useEffect, useContext } from 'react';
import { Symfoni, ProjectContext, ProviderContext } from "./../hardhat/SymfoniContext";

function Charities() {
    const project = useContext(ProjectContext);
    const [provider, setProvider] = useContext(ProviderContext);

    const [charityName, setCharityName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [goal, setGoal] = useState(0);

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
        console.log("Creating project... ");
        console.log(project.factory);
        project.factory?.deploy(0,"","");
        project.instance?.attach("0x5fbdb2315678afecb367f032d93f642f64180aa3");
        console.log(project.instance);
    }

    useEffect(() => {
        const doAsync = async () => {
            if (!project.instance) {
                console.log("Project hasn't been deployed")
            } else {
                console.log("project is already deployed at ", project.instance.address)
            //setMessage(await greeter.instance.greet())
            }

        };
        doAsync();
    }, [project])


    return (
        <Symfoni autoInit={true}>
            <div>
                <h1> Follow the next steps to create the project you want to fund </h1>
                <input type="text" name="charityName" value={charityName} onChange={(e) => setCharityName(e.target.value)}></input>
                <input type="text" name="projectDescription" value={projectDescription} onChange={(e) => setProjectDescription(e.target.value)}></input>
                <input type="number" name="goal" value={goal} onChange={(e) => setGoal(parseInt(e.target.value))}></input>
                <button onClick={handleCreateProject}>Create project!</button>
            </div>
        </Symfoni>
    );
}

export default Charities;
