import styled from "styled-components";
import { API_URL, Colors} from "../constants";
import Background from "../components/Background";
import { MyModulesGuest, ModuleComponent }  from "../components/MyModules";
import NavigationBar from "../components/Navbar";
import { useEffect, useState } from "react";

const HomePageWrapper = styled.div`
    display: grid;
    grid-template-columns: 8.5fr 1.5fr;
    grid-column-gap: 1em;
    padding: 2em;
`

const Heading = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600
    font-size: 2.25em;
    color: ${Colors.white};
`

const PopularModulesWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-column-gap: 1em;
    grid-row-gap: 1em;
    margin-top: 0.5em;
    margin-bottom: 2em;
`

const DisplayWrapper = styled.span`
    font-family: "Poppins", "sans-serif";
    font-weight: 600;
    font-size: 2em;
`

const WelcomeMessage = styled.span`
    background-color: ${Colors.white};
    border-radius: 20px;
    display: inline-block;
    padding: 1.25em;
    display: flex;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 0.75em; 
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`

const MyModulesDiv = styled.div`
    display: grid;
    align-items: center;
    padding: calc(2em + 20px);
`

const HomePage = () => {
    const [modules, setModules] = useState<any[]>([]);

    useEffect(() => {
        fetch(API_URL + `/module`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                keyword: "",
                page: 1,
            }),
        }).then(response => response.json())
        .then(data => {
            setModules(data);
        });
    }, []);

    const sortedModules = [...modules].sort((a, b) => b.SubscriberCount - a.SubscriberCount);

    return (
        <div>
            <NavigationBar/>
            <Background>
                <HomePageWrapper>
                    <div>
                        <DisplayWrapper>
                            <Heading>Popular Modules</Heading><br></br>
                            <PopularModulesWrapper>
                                {sortedModules.map(module => (
                                    <ModuleComponent key={module.Id}>{module.Name}</ModuleComponent>
                                ))}
                            </PopularModulesWrapper>
                            <Heading>What is PINUS Study?</Heading>
                            <WelcomeMessage>
                                PINUS Study is a platform built for PINUSians where they can interact and open a discussion thread for modules.
                                <br /><br />
                                New to PINUS Study? Check out this guide on how to use it.
                                Have something you want to improve? Fill in this feedback form.
                                <br /><br />
                                Have fun studying!
                            </WelcomeMessage>
                        </DisplayWrapper>
                    </div>
                    <MyModulesDiv>
                        <MyModulesGuest />
                    </MyModulesDiv>
                </HomePageWrapper>
            </Background>
        </div>
    )
}

export default HomePage;