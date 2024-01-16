import React, {useState} from "react";
import JIFFClient from 'jiff-mpc/lib/jiff-client';
import { Button, Container, Form, Input, Card, CardContent, CardHeader } from 'semantic-ui-react';
import Compute from './Compute';
import ComputeTable from './ComputeTable';


const Connect = () => {
    const [computationId, setComputationId] = useState('');
    const [partyCount, setPartyCount] = useState('');
    const [number, setNumber] = useState('');
    const [savedInstanceInState, setSavedInstanceInState] = useState(saved_instance);
    const [savedOptInState, setSavedOptInState] = useState({
        crypto_provider: true,
        party_count: parseInt(partyCount)
    });
    var saved_instance = null;

    /* const Compute = (jiff_instance) => {
        console.log('Compute')
        var opt = {};
        opt.crypto_provider = true;
        opt.party_count = parseInt(partyCount);
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }

        // The MPC implementation should go *HERE*
        var input = 5;
        console.log('number: ', parseInt(number))
        console.log('input: ', input)
        jiff_instance = new JIFFClient("http://localhost:8080", computationId, opt);
        var shares = jiff_instance.share(input);
        var sum = shares[1];
        for (var i = 2; i <= jiff_instance.party_count; i++) {
            sum = sum.sadd(shares[i]);
        }

        // Return a promise to the final output(s)
        return jiff_instance.open(sum);
    } */

    const Connect = (url, computation_id) => {
        console.log('Connect' )
        var opt = {};
        opt.crypto_provider = true;
        opt.party_count = parseInt(partyCount);
        setSavedOptInState(opt)
        opt.onConnect = function () {
            console.log('connectedxxx')
        };
      

        // eslint-disable-next-line no-undef
        //JIFFClient = require('jiff-mpc/lib/jiff-client');
        saved_instance = new JIFFClient("http://localhost:8080", computationId, opt);
        console.log('saved_instance', saved_instance)
        setSavedInstanceInState(saved_instance)

        return saved_instance;
    }

    const onSubmit =  (event) => {
        event.preventDefault();
        console.log('clicked')
        var computation_id = 'test';
        var party_count = 2;
    
        Connect('http://localhost:8080', computation_id);
      }

    const onSubmit2 =  (event) => {
        event.preventDefault();
        console.log('clicked')
        var result = Compute(saved_instance);
        result
        .then(function (output) {
            console.log('output', output)
        })
    }

  return (
    <div className="connect">
      <Container fluid>
      <Card fluid >
        <CardContent>
            <CardHeader>Create Session</CardHeader>
            <Form>
                <Form.Field>
                    <Input style={{width: '60%', top: '10px', bottom: '10px', left: '20px', right: '20px'}}
                    label={{ basic: true, content: 'Session ID'}}
                    labelPosition='right' 
                    placeholder='Enter Session ID'
                    value = {computationId}
                    onChange = {(event) => setComputationId(event.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Input style={{width: '60%', top: '10px', bottom: '10px', left: '20px', right: '20px'}}
                    label={{ basic: true, content: 'Number of Parties'}}
                    labelPosition='right' 
                    placeholder='Enter Party Count'
                    value = {partyCount}
                    onChange = {(event) => setPartyCount(event.target.value)}
                    />
                </Form.Field>
                <div style={{ textAlign: 'right' }}>
                <Button primary type='submit' onClick={onSubmit}>Create</Button>
                </div>
            </Form>
        </CardContent>
      </Card>
      
      <ComputeTable jiffInstance={savedInstanceInState} opt={savedOptInState} /> 
      
      
      
      </Container>
    </div>
  );
}

export default Connect;