import React from "react";
import { Header, Icon} from "semantic-ui-react";

const PageHeader = (props) =>{
    return(    
        <Header as='h3' style={{ marginTop: "30px" }}>
            <Icon name='microchip' />
            <Header.Content>MPC</Header.Content>
            <Header.Subheader>Secret Sharing</Header.Subheader>
        </Header>
    );
};

export default PageHeader;