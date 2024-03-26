import React, {useState} from "react";
import JIFFClient from 'jiff-mpc/lib/jiff-client';
import jiff_restAPI from './jiff-client-restful';
import { Button, Container, Form, Input, Card, CardContent, CardHeader, Message } from 'semantic-ui-react';
import ComputeTable from './ComputeTable';
//import { config } from "next/dist/build/templates/pages";
//import config from 'config';

var myConfig;
var __jiff_instance;
var opt;

const Connect = () => {
    const [computationId, setComputationId] = useState('');
    const [partyCount, setPartyCount] = useState('');
    const [number, setNumber] = useState('');
    const [savedInstanceInState, setSavedInstanceInState] = useState(saved_instance);
    const [savedOptInState, setSavedOptInState] = useState({
        crypto_provider: true,
        party_count: parseInt(partyCount)
    });
    const [myMessage, setMyMessage] = useState('');
    const [hideComputeTable, setHideComputeTable] = useState(true);
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


const mpcConnect = function (hostname, computation_id, options, _config) {
    var config = _config;
    console.log('inside mpcConnect')
    console.log('config:', config)
    opt = Object.assign({}, options);
    opt['crypto_provider'] = config.preprocessing === false;
    opt['initialization'] = { role: 'input' };
    opt['party_count'] = config.party_count;
    opt['autoConnect'] = false;
    setSavedOptInState(opt)
    opt.onConnect = function () {
        console.log('connectedxxx')
        setMyMessage(`${computationId} Session with ${partyCount} parties succesfully created! ` )
        setHideComputeTable(false)
    };

    // eslint-disable-next-line no-undef
    __jiff_instance = new JIFFClient(hostname, computation_id, opt);
    // eslint-disable-next-line no-undef
    __jiff_instance.apply_extension(jiff_restAPI);
    __jiff_instance.connect();
    setSavedInstanceInState(__jiff_instance)
    return __jiff_instance;
  };
  
  
const mpcCompute = function (input, jiff_instance_) {
    console.log('inside mpcCompute')
    //var jiff_instance = __jiff_instance;
    var jiff_instance = savedInstanceInState;
    if (jiff_instance_) {
      jiff_instance = jiff_instance_;
    }
    var config = myConfig;
    // Share with compute parties
    console.log(jiff_instance)
    jiff_instance.share(input, null, config.compute_parties, config.input_parties);

    // If this party is still connected after the compute parties are done, it will
    // receive the result.
    var promise = jiff_instance.receive_open(config.compute_parties);
    promise.then(function () {
      jiff_instance.disconnect(true, true);
    });

    return promise;
  };

    const join = (url, computation_id) => {
        console.log('Connect' )
        var opt = {};
        opt.crypto_provider = true;
        opt.party_count = parseInt(partyCount);
        setSavedOptInState(opt)
        setMyMessage('Waiting for parties to connect...')
        opt.onConnect = function () {
            console.log('connectedxxx')
            setMyMessage(`${computationId} Session with ${partyCount} parties succesfully created! ` )
            setHideComputeTable(false)
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
    
        join('http://localhost:8080', computation_id);
      }

    const onSubmit2 =  (event) => {
        event.preventDefault();
        console.log('clicked')
        savedInstanceInState.disconnect(false, true);
        setMyMessage('')
        setHideComputeTable(true)
        /* var result = Compute(saved_instance);
        result
        .then(function (output) {
            console.log('output', output)
        }) */
    }

    const onSubmit3 = async (event) => {
        event.preventDefault();
        console.log('onSubmit3 clicked')
        console.log(process.cwd())
        fetch('http://localhost:8080/config.js')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
                })
            .then(data => {
                // Do something with your data
                //console.log('DATA:')
                //console.log(data);
                myConfig = JSON.parse(data);
                console.log('myConfig:', myConfig)
                var options = { party_count: myConfig.party_count };
                var hostname = window.location.hostname.trim();
                var port = window.location.port;
                if (port == null || port === '') {
                    port = '80';
                }
                if (!(hostname.startsWith('http://') || hostname.startsWith('https://'))) {
                    hostname = 'http://' + hostname;
                }
                if (hostname.endsWith('/')) {
                    hostname = hostname.substring(0, hostname.length-1);
                }
                if (hostname.indexOf(':') > -1 && hostname.lastIndexOf(':') > hostname.indexOf(':')) {
                    hostname = hostname.substring(0, hostname.lastIndexOf(':'));
                }

                hostname = hostname + ':' + port;
                console.log('hostname:', hostname)
                var jiff = mpcConnect(hostname, computationId, options, myConfig);
                jiff.wait_for(myConfig.compute_parties, function () {
                    console.log('Connected to the computation parties');
                    //setHideComputeTable(false)
                    //setMyMessage(`${computationId} Session with ${partyCount} parties succesfully created! ` )
                })
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
            });
        
        
    }

    const onSubmit4 = async (event) => {
        event.preventDefault();
        console.log('onSubmit4 clicked')
        var promise = mpcCompute(parseInt('2'));
        promise.then(function (output) {
            console.log('output', output)
        });
    }

  return (
    <div className="connect">
      <Container fluid>
      <Card color="blue" fluid >
        <CardContent>
            <CardHeader>Create Session</CardHeader>
            <Form success={!!myMessage}>
                <Form.Field>
                    <Input style={{width: '80%', top: '10px', bottom: '10px', left: '20px', right: '20px'}}
                    label={{ basic: true, content: 'Session ID'}}
                    labelPosition='right' 
                    placeholder='Enter Session ID'
                    value = {computationId}
                    onChange = {(event) => setComputationId(event.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Input style={{width: '80%', top: '10px', bottom: '10px', left: '20px', right: '20px'}}
                    label={{ basic: true, content: 'Number of Parties'}}
                    labelPosition='right' 
                    placeholder='Enter Party Count'
                    value = {partyCount}
                    onChange = {(event) => setPartyCount(event.target.value)}
                    />
                </Form.Field>
                <Message success header="Success" content={myMessage} />
                <div style={{ textAlign: 'right', marginRight: '200px', marginTop: '30px' }}>
                <Button primary type='submit' onClick={onSubmit3}>Create</Button>
                <Button primary type='submit' onClick={onSubmit4}>Disconnect</Button>
                </div>
            </Form>
        </CardContent>
      </Card>
      {
            hideComputeTable ? null : <ComputeTable jiffInstance={savedInstanceInState} opt={savedOptInState} config={myConfig} /> 
      }
      
      
      </Container>
    </div>
  );
}

export default Connect;