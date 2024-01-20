import React from 'react';
import { Container } from 'semantic-ui-react';
//import Head from "next/head"
import PageHeader from "./Header";
import GridContent from './GridContent';



const Layout = (props) => {
 return (
   <>
   <Container>
       <PageHeader children=""/>
       {props.children}
   </Container>

   {/* <Container>
        <GridContent/>
   </Container> */}

   </>
 );
};
 
export default Layout;