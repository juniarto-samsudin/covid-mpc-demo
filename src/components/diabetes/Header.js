import React from "react";
import { Header, Icon} from "semantic-ui-react";

const PageHeader = (props) =>{
    return(    
        <Header as='h2' style={{ marginTop: "30px", marginBottom: "20px" }}>
            <Icon name='money bill alternate outline' size="huge"/>
            <Header.Content>{props.name} Blood Glucose Level in Diabetes Study</Header.Content>
            {/* <Header.Subheader>Covid Data</Header.Subheader> */}
        </Header>
    );
};

export default PageHeader;  