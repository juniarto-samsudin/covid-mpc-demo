'use client';
import React, {useState} from "react";
import { Button, Container, Form, Input } from 'semantic-ui-react';
import JIFFClient from 'jiff-mpc/lib/jiff-client';

const ComputeArray = (props) => {
    const  [number, setNumber] = useState('');

    const Compute = (jiff_instance, opt) => {
        console.log('ComputeArray')
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }

        var tableToShare = [
            [10, 1, 2, 3, 4],
            [20, 0, 1, 1, 1],
            [25, 2, 1, 1, 2],
            [30, 3, 1, 1, 3],
            [40, 2, 1, 1, 4],
            [50, 3, 1, 1, 5]
          ];
      
        console.log('tableToShare: ', tableToShare)
        console.log('tableToShare length: ', tableToShare.length)
        // Share the table among parties
        var sharedTablePromise = jiff_instance.share_array(tableToShare);
        console.log('sharedTablePromise: ', sharedTablePromise)

        sharedTablePromise.then (function (sharedTable) {
            console.log('sharedTable: ', sharedTable)
            //processing sharedTable party 1
            var AgeColumnShare1 = sharedTable[1].map(function (row) {
              // Extract the first element of each row
              return row[0]
            });
            console.log('resultShare1: ', AgeColumnShare1) // There are 6 Secret Shared Values,pertaining to 6 rows of column1 from Share 1
      
            var sumAgeColumnShare1 =  AgeColumnShare1[0] // Sum of first row of column1 from Share 1
            for (var i = 1; i < AgeColumnShare1.length; i++) {
                sumAgeColumnShare1 = sumAgeColumnShare1.sadd(AgeColumnShare1[i]);
            }
      
            console.log('sumAgeColumnShare1: ', sumAgeColumnShare1)
      
            // processing sharedTable party 2
            var AgeColumnShare2 = sharedTable[2].map(function (row) {
              // Extract the first element of each row
              return row[0]
            });
            console.log('resultShare2: ', AgeColumnShare2) // There are 6 Secret Shared Values,pertaining to 6 rows of column1 from Share 2
      
            var sumAgeColumnShare2 =  AgeColumnShare2[0] // Sum of first row of column1 from Share 2
            for (var i = 1; i < AgeColumnShare2.length; i++) {
                sumAgeColumnShare2 = sumAgeColumnShare2.sadd(AgeColumnShare2[i]);
            }
      
            console.log('sumAgeColumnShare2: ', sumAgeColumnShare2)
      
            // Sum of AgeColumnShare1 and AgeColumnShare2
            var sumAgeColumnShare = sumAgeColumnShare1.sadd(sumAgeColumnShare2);
      
            jiff_instance.open(sumAgeColumnShare).then(function (result) {
              console.log('Result:', result); // The final result after opening
              return result;
            });
      
          }); 








        /* // The MPC implementation should go *HERE*
        var input = 5;
        console.log('number: ', parseInt(number))
        //console.log('input: ', input)
        var shares = jiff_instance.share(parseInt(number));
        var sum = shares[1];
        for (var i = 2; i <= jiff_instance.party_count; i++) {
            sum = sum.sadd(shares[i]);
        }

        // Return a promise to the final output(s)
        return jiff_instance.open(sum); */
    }

    const onSubmit =  (event) => {
        event.preventDefault();
        console.log('Compute')
        console.log('jiffInstance: ', props.jiffInstance)
        console.log('opt',props.opt)
        var result = Compute(props.jiffInstance, props.opt);
        console.log('result', result)
        /* result.then(function (output) {
            console.log('output', output)
        }) */
    }

    return (
        <div>
        <Form>
            <Form.Field>
                <Input 
                    label={{ basic: true, content: 'Number[between 1 - 100]'}}
                    labelPosition='right' 
                    placeholder='Enter an integer number [1 - 100]'
                    value = {number} 
                    onChange = {(event) => setNumber(event.target.value)}
                />
            </Form.Field>
                <Button primary type='submit' onClick={onSubmit}>Compute</Button>
        </Form>
        </div>
    );
}

export default ComputeArray;