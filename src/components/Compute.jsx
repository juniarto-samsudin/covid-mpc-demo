import React, {useState} from "react";
import { Button, Container, Form, Input } from 'semantic-ui-react';
import JIFFClient from 'jiff-mpc/lib/jiff-client';

const Compute = (props) => {
    const  [nomer, setNomer] = useState('');

    const Compute = (jiff_instance, opt) => {
        console.log('Compute')
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }

        // The MPC implementation should go *HERE*
        var input = 5;
        console.log('number: ', parseInt(number))
        //console.log('input: ', input)
        var shares = jiff_instance.share(parseInt(number));
        var sum = shares[1];
        for (var i = 2; i <= jiff_instance.party_count; i++) {
            sum = sum.sadd(shares[i]);
        }

        // Return a promise to the final output(s)
        return jiff_instance.open(sum);
    }

    const onSubmit =  (event) => {
        event.preventDefault();
        console.log('Compute')
        console.log('jiffInstance: ', props.jiffInstance)
        console.log('opt',props.opt)
        var result = Compute(props.jiffInstance, props.opt);
        result
        .then(function (output) {
            console.log('output', output)
        })
    }

    return (
        <div>
        <Form>
            <Form.Field>
                <Input 
                    label={{ basic: true, content: 'Number[between 1 - 100]'}}
                    labelPosition='right' 
                    placeholder='Enter an integer number [1 - 100]'
                    value = {nomer}
                    onChange = {(event) => setNomer(event.target.value)}/>
            </Form.Field>
                <Button primary type='submit' onClick={onSubmit}>Compute</Button>
        </Form>
        </div>
    );
}

export default Compute;