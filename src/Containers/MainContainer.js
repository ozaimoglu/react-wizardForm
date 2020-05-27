import React from 'react';
import HeaderComponent from '../Components/HeaderComponent';
import FormComponent from '../Components/FormComponent';

class MainContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentState : "step1"
        }
    }

    render() {
        return (
            <div className="mainContainer">
                <HeaderComponent/>
                <FormComponent
                    title = "step1"
                />
            </div>
        );
    }
}

export default MainContainer;