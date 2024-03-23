import React from 'react';
import {Grid} from 'semantic-ui-react';
//import Head from "next/head"
//import "semantic-ui-css/semantic.min.css";
//import { BasicTable } from './BasicTable';
//import PlotlyChart from './Plotly';
import RechartsChart from './Recharts';



const GridContent = (props) => {

    const data = [
        {
          x: [1, 2, 3, 4],
          y: [10, 11, 12, 13],
          type: 'scatter',
        },
      ];   

      const layout = {
        title: 'My Plotly Chart',
      };

 return (
    <Grid celled>
        <Grid.Row>
            <Grid.Column width={8}>
                Hello AGAIN
            </Grid.Column>
            <Grid.Column width={8}>
                {/* <PlotlyChart data={data} layout={layout} /> */}
                <RechartsChart />
            </Grid.Column>
        </Grid.Row>
    </Grid>
 );
};
 
export default GridContent;