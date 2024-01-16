'use client';
import React, {useState} from "react";
import { Button, Container, Form, Input, Card } from 'semantic-ui-react';
import JIFFClient from 'jiff-mpc/lib/jiff-client';
import CSVFileLoader from "./CSVFileLoader";
import { ResultTable } from "./ResultTable";
import BarChartExample from "./BarChartResult";

const ComputeTable = (props) => {
    const  [number, setNumber] = useState('');
    const [resultAge, setResultAge] = useState('');
    const [resultMild, setResultMild] = useState('');
    const [resultModerate, setResultModerate] = useState('');
    const [resultCritical, setResultCritical] = useState('');
    const [resultDeath, setResultDeath] = useState('');
   
    

    const  { jsx, value } = CSVFileLoader();
    var resultDict = {}

    const Compute2 = (jiff_instance, opt) => {
        console.log('ComputeArray')
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }

        var valueJson = JSON.parse(value)

        var tableToShare = valueJson.map(item => [
            parseInt(item.age),
            parseInt(item.mild),
            parseInt(item.moderate),
            parseInt(item.critical),
            parseInt(item.death)
        ])
      
        console.log('tableToShare: ', tableToShare)
        console.log('tableToShare length: ', tableToShare.length)
        // Share the table among parties
        var sharedTablePromise = jiff_instance.share_array(tableToShare);
        console.log('sharedTablePromise: ', sharedTablePromise)

        sharedTablePromise.then (function (sharedTable) {
            console.log('sharedTable: ', sharedTable)
            //processing sharedTable party 1
            var AgeColumnShare1 = sharedTable[1].map(function (row) {
              // Extract element 1,2,3,4 of each row - element 0 is age not used
              return row[0] //mild, moderate, critical, death
            });

            var MildColumnShare1 = sharedTable[1].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[1] //mild, moderate, critical, death
            });

            var ModerateColumnShare1 = sharedTable[1].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[2] //mild, moderate, critical, death
            });

            var CriticalColumnShare1 = sharedTable[1].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[3] //mild, moderate, critical, death
            });

            var DeathColumnShare1 = sharedTable[1].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[4] //mild, moderate, critical, death
            });

            console.log('resultShare1: ', AgeColumnShare1) // There are 6 Secret Shared Values,pertaining to 6 rows of column1 from Share 1
            
            var sumAgeColumnShare1 =  AgeColumnShare1[0] // row 1
            for (var i = 1; i < AgeColumnShare1.length; i++) {
                sumAgeColumnShare1 = sumAgeColumnShare1.sadd(AgeColumnShare1[i]);
            }

            var sumMildColumnShare1 =  MildColumnShare1[0] // row 1
            for (var i = 1; i < MildColumnShare1.length; i++) {
                sumMildColumnShare1 = sumMildColumnShare1.sadd(MildColumnShare1[i]);
            }

            var sumModerateColumnShare1 =  ModerateColumnShare1[0] // row 1
            for (var i = 1; i < ModerateColumnShare1.length; i++) {
                sumModerateColumnShare1 = sumModerateColumnShare1.sadd(ModerateColumnShare1[i]);
            }

            var sumCriticalColumnShare1 =  CriticalColumnShare1[0] // row 1
            for (var i = 1; i < CriticalColumnShare1.length; i++) {
                sumCriticalColumnShare1 = sumCriticalColumnShare1.sadd(CriticalColumnShare1[i]);
            }

            var sumDeathColumnShare1 =  DeathColumnShare1[0] // row 1
            for (var i = 1; i < DeathColumnShare1.length; i++) {
                sumDeathColumnShare1 = sumDeathColumnShare1.sadd(DeathColumnShare1[i]);
            }

            console.log('sumAgeColumnShare1: ', sumAgeColumnShare1)
      
            // processing sharedTable party 2
            var AgeColumnShare2 = sharedTable[2].map(function (row) {
              // Extract the first element of each row
              return row[0]
            });

            var MildColumnShare2 = sharedTable[2].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[1] //mild, moderate, critical, death
            });

            var ModerateColumnShare2 = sharedTable[2].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[2] //mild, moderate, critical, death
            });

            var CriticalColumnShare2 = sharedTable[2].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[3] //mild, moderate, critical, death
            });

            var DeathColumnShare2 = sharedTable[2].map(function (row) {
                // Extract element 1,2,3,4 of each row - element 0 is age not used
                return row[4] //mild, moderate, critical, death
            });

            console.log('resultShare2: ', AgeColumnShare2) // There are 6 Secret Shared Values,pertaining to 6 rows of column1 from Share 2
      
            var sumAgeColumnShare2 =  AgeColumnShare2[0] // Sum of first row of column1 from Share 2
            for (var i = 1; i < AgeColumnShare2.length; i++) {
                sumAgeColumnShare2 = sumAgeColumnShare2.sadd(AgeColumnShare2[i]);
            }

            var sumMildColumnShare2 =  MildColumnShare2[0] // row 1
            for (var i = 1; i < MildColumnShare2.length; i++) {
                sumMildColumnShare2 = sumMildColumnShare2.sadd(MildColumnShare2[i]);
            }

            var sumModerateColumnShare2 =  ModerateColumnShare2[0] // row 1
            for (var i = 1; i < ModerateColumnShare2.length; i++) {
                sumModerateColumnShare2 = sumModerateColumnShare2.sadd(ModerateColumnShare2[i]);
            }

            var sumCriticalColumnShare2 =  CriticalColumnShare2[0] // row 1
            for (var i = 1; i < CriticalColumnShare2.length; i++) {
                sumCriticalColumnShare2 = sumCriticalColumnShare2.sadd(CriticalColumnShare2[i]);
            }

            var sumDeathColumnShare2 =  DeathColumnShare2[0] // row 1
            for (var i = 1; i < DeathColumnShare2.length; i++) {
                sumDeathColumnShare2 = sumDeathColumnShare2.sadd(DeathColumnShare2[i]);
            }
      
            console.log('sumAgeColumnShare2: ', sumAgeColumnShare2)
      
            // Sum of AgeColumnShare1 and AgeColumnShare2
            var sumAgeColumnShare = sumAgeColumnShare1.sadd(sumAgeColumnShare2);
            var sumMildColumnShare = sumMildColumnShare1.sadd(sumMildColumnShare2);
            var sumModerateColumnShare = sumModerateColumnShare1.sadd(sumModerateColumnShare2);
            var sumCriticalColumnShare = sumCriticalColumnShare1.sadd(sumCriticalColumnShare2);
            var sumDeathColumnShare = sumDeathColumnShare1.sadd(sumDeathColumnShare2);
      
            jiff_instance.open(sumAgeColumnShare).then(function (result) {
              console.log('Result:', result); // The final result after opening
              setResultAge(result);
              //setResultDict({...resultDict, age: result})  
            });

            jiff_instance.open(sumMildColumnShare).then(function (result) {
                console.log('Result:', result); // The final result after opening
                setResultMild(result);
                //setResultDict({...resultDict, mild: result})
            });

            jiff_instance.open(sumModerateColumnShare).then(function (result) {
                console.log('Result:', result); // The final result after opening
                setResultModerate(result);
                //setResultDict({...resultDict, moderate: result})
            });

            jiff_instance.open(sumCriticalColumnShare).then(function (result) {
                console.log('Result:', result); // The final result after opening
                setResultCritical(result);
                //setResultDict({...resultDict, critical: result})
            });
            
            jiff_instance.open(sumDeathColumnShare).then(function (result) {
                console.log('Result:', result); // The final result after opening
                setResultDeath(result);
                //setResultDict({...resultDict, death: result})
            });

            
          })
        }
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
    

    const Compute = (jiff_instance, opt) => {
        console.log('ComputeArray')
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }

        var valueJson = JSON.parse(value)

        var tableToShare = valueJson.map(item => [
            parseInt(item.age),
            parseInt(item.mild),
            parseInt(item.moderate),
            parseInt(item.critical),
            parseInt(item.death)
        ])
      
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
        var result = Compute2(props.jiffInstance, props.opt);
        console.log('result', result)
        /* result.then(function (output) {
            console.log('output', output)
        }) */
    }

    resultDict = {
        mild: resultMild,
        moderate: resultModerate,
        critical: resultCritical,
        death: resultDeath
    }

    console.log('resultDict: ', resultDict)
    var resultDictArray = [resultDict]
    return (
        <div>
        {/* <CSVFileLoader />    
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
        </Form> */}
        <Card fluid>
        {jsx}
        <div style={{ textAlign: 'right', marginTop: '20px', marginBottom: '20px'}}>
            <Button primary type='submit' onClick={onSubmit}>Share</Button>
        </div>
        </Card>
        {/* <p>Return value: {value}</p>: */}
        
        <Card fluid>
            <p>Return value: {resultAge} {resultMild} {resultModerate} {resultCritical} {resultDeath}</p>
            {resultDict.mild &&  (
                <div>
                <BarChartExample data={resultDictArray} />    
                {/* <ResultTable data={resultDictArray} /> */}
                </div>
            )}
            <Button primary type='submit' onClick={onSubmit}>Compute</Button>
        </Card>
        </div>
    );
}

export default ComputeTable;