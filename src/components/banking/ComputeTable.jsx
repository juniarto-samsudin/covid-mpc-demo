'use client';
import React, {useState} from "react";
import { Button, Container, Form, Input, Card, CardContent, CardHeader, Message } from 'semantic-ui-react';
import JIFFClient from 'jiff-mpc/lib/jiff-client';
import CSVFileLoader from "./CSVFileLoader";
import { ResultTable } from "./ResultTable";
import BarChartExample from "./BarChartResult";
import share from "jiff-mpc/lib/client/share";
import { Share } from "next/font/google";

const ComputeTable = (props) => {
    const [userId, setUserId] = useState('1');
    const [myMessage, setMyMessage] = useState('');
    const [myMessage1, setMyMessage1] = useState('');
    //const [resultAge, setResultAge] = useState('');
    //const [resultMild, setResultMild] = useState('');
    //const [resultModerate, setResultModerate] = useState('');
    //const [resultCritical, setResultCritical] = useState('');
    //const [resultDeath, setResultDeath] = useState('');
    //const [hideResultChart, setHideResultChart] = useState(true);
    const [hideComputeButton, setHideComputeButton] = useState(true);
    //const [allPartiesSecret, setAllPartiesSecret] = useState({});
    const [totalLoan, setTotalLoan] = useState(0);
    const [finalResult, setFinalResult] = useState(0);
    const [loading, setLoading] = useState(false);
    const [sumTotalLoanState, setSumTotalLoanState] = useState([]);
    const [final1, setFinal1] = useState(0);
    const [final2, setFinal2] = useState(0);
    const [final3, setFinal3] = useState(0);

    

    const  { jsx, value } = CSVFileLoader();
    var resultDict = {}


    let calculateFinalResult = (jiff_instance, opt) => {
        console.log('Calculating final result')
        //console.log('MySharedTablePromise in calculating final result: ', allPartiesSecret)
        console.log('calculateFinalResutl totalLoan: ', totalLoan)
    }

    let getSharedTablePromise = (jiff_instance, opt) => {
        console.log('Calculating sharedTablePromise')
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }

        var valueJson = JSON.parse(value)

        var tableToShare = valueJson.map(item => [
            parseInt(item.user_id),
            parseInt(item.loan),
        ])
      
        console.log('tableToShare: ', tableToShare)
        console.log('tableToShare length: ', tableToShare.length)
        // Share the table among parties
        var sharedTablePromise = jiff_instance.share_array(tableToShare);
        console.log('sharedTablePromise: ', sharedTablePromise)

        //From now on, all are secrets
        //Only userid 1 loan will be summed up
        var sumLoanTotal=[]
        var sumLoan1=[]
        var sumLoan2=[]
        var sumLoan3=[]
        var myUserId = [1,2,3]
        sharedTablePromise.then (function (allPartiesSecret) {
            //var myUserId = parseInt(userId)
            //console.log('userId: ', myUserId)


            console.log('allPartiesSecret: ', allPartiesSecret)

          


            var GetLoanShare1 = allPartiesSecret[1].map(function (row) {
                // Extract user_id of each row
                for (let i=0; i<myUserId.length; i++){
                    var result = row[0].ceq(myUserId[i])
                    console.log('result1: ', result)

                    jiff_instance.open(result).then(function (result) {
                        if (result ==1){
                            console.log('result is 1 get sumLoan1')
                            sumLoan1.push(row[1])
                            console.log('sumLoan1: ', sumLoan1)

                        }
                    })
                }
            }) 

            var GetLoanShare2 = allPartiesSecret[2].map(function (row) {
                for (let i=0; i<myUserId.length; i++){
                    var result = row[0].ceq(myUserId[i]) //user_id is 1 
                    console.log('result2: ', result)
                    jiff_instance.open(result).then(function (result) {
                    if (result ==1){
                        console.log('result is 1 get sumLoan2')
                        sumLoan2.push(row[1])
                        console.log('sumLoan2: ', sumLoan2)
                    }
                })
                }
            })

            var GetLoanShare3 = allPartiesSecret[3].map(function (row) {
                for (let i=0; i<myUserId.length; i++){
                    var result = row[0].ceq(myUserId[i]) //user_id is 1
                    console.log('result3: ', result)
                    jiff_instance.open(result).then(function (result) {
                    if (result ==1){
                        console.log('result is 1 get sumLoan3')
                        sumLoan3.push(row[1])
                        console.log('sumLoan3: ', sumLoan3)
                    }
                })
                }
            })

            var sumLoanAll = []
            function waitForAllSumLoan() {
                return new Promise((resolve) => {
                    if (sumLoan1.length >= 3 && sumLoan2.length >= 3 && sumLoan3.length >= 3) {
                        sumLoanAll = [sumLoan1, sumLoan2, sumLoan3]
                        resolve(sumLoanAll);
                    } else {
                        // If not, set up a watcher or some mechanism to update sumLoan1
                        // For demonstration purposes, using a setInterval here
                        const watcherInterval = setInterval(() => {
                            if (sumLoan1.length >= 3 && sumLoan2.length >= 3 && sumLoan3.length >= 3) {
                                clearInterval(watcherInterval);
                                sumLoanAll = [sumLoan1, sumLoan2, sumLoan3]
                                resolve(sumLoanAll);
                            }
                        }, 100); // Check every 100 milliseconds
                    }
                })
            }


              async function processSumLoan1() {
                try {
                  
                  await waitForAllSumLoan();
                  console.log("Processing sumLoanAll:", sumLoanAll);

                  sumLoan1 = sumLoanAll[0]
                  sumLoan2 = sumLoanAll[1]
                  sumLoan3 = sumLoanAll[2]

                  for (let i=0; i<3; i++){
                    sumLoanTotal[i] = sumLoan1[i].sadd(sumLoan2[i])
                    sumLoanTotal[i] = sumLoanTotal[i].sadd(sumLoan3[i])
                    console.log("Processing sumLoanTotal:", sumLoanTotal[i]);
                  }
                  console.log('sumLoanTotal in processSumLoan1: ', sumLoanTotal)
                 
                  const result1 = await jiff_instance.open(sumLoanTotal[0])
                  const result2 = await jiff_instance.open(sumLoanTotal[1])
                  const result3 = await jiff_instance.open(sumLoanTotal[2])

                  const waitAll = async () => {
                       await Promise.all([result1, result2, result3])
                       console.log('result1: ', result1)
                       console.log('result2: ', result2)
                       console.log('result3: ', result3)
                       setSumTotalLoanState([result1, result2, result3])
                       setHideComputeButton(false)
                       setLoading(false)
                       setMyMessage('') 
                  }

                  waitAll()
                  

                  // Continue with your processing logic here
                } catch (error) {
                  console.error("Error:", error);
                }
              }

              processSumLoan1();
                   
        }) //end of sharedTablePromise

        
    } //end of getSharedTablePromise
            

        //setHideComputeButton(false)
        //return sharedTablePromise
    

    const Compute2 = (jiff_instance, opt) => {
        console.log('ComputeArray')
        if (jiff_instance == null) {
            jiff_instance = saved_instance;
        }jiff_instance

        var valueJson = JSON.parse(value)

        var tableToShare = valueJson.map(item => [
            parseInt(item.user_id),
            parseInt(item.loan),
        ])
      
        console.log('tableToShare: ', tableToShare)
        console.log('tableToShare length: ', tableToShare.length)
        // Share the table among parties
        var sharedTablePromise = jiff_instance.share_array(tableToShare);
        console.log('sharedTablePromise: ', sharedTablePromise)

        //From now on, all are secrets
        //Only userid 1 loan will be summed up
        sharedTablePromise.then (function (sharedTable) {
            console.log('sharedTable: ', sharedTable)
            //processing sharedTable party 1
            var sumLoan1
            var GetLoanShare1 = sharedTable[1].map(function (row) {
              // Extract user_id of each row
              var result = row[0].ceq(1)
              console.log('result: ', result)
              jiff_instance.open(result).then(function (result) {
                console.log('result final: ', result)
                //1 is true user_id is 1, 0 is false user_id is not 1
                if (result == 1) {
                    console.log('result is 1 get sumLoan1')
                    sumLoan1 = row[1]
                    console.log('sumLoan1: ', sumLoan1)
                    /* sumLoan1 {
                        "ready": true,
                        "value": 8157572,
                        "holders": [
                            1,
                            2
                        ],
                        "threshold": 2,
                        "Zp": 16777729
                    } 
                    jiff_instance.open(sumLoan1).then(function (result) {
                        console.log('sumLoan1 : ', result) //10000 is the sum of loan of user_id 1
                    });  */
                    var GetLoanShare2 = sharedTable[2].map(function (row) {
                        var result = row[0].ceq(1) //user_id is 1
                        console.log('result2: ', result)
                        jiff_instance.open(result).then(function (result) {
                            console.log('result2 final: ', result)
                            if (result == 1) {
                                console.log('result2 is 1 get sumLoan2')
                                var sumLoan2 = row[1]
                                console.log('sumLoan2: ', sumLoan2)
                                var sumLoan = sumLoan1.sadd(sumLoan2)
                                console.log('sumLoan: ', sumLoan)
                                jiff_instance.open(sumLoan).then(function (result) {
                                    console.log('sumLoan Total : ', result) //10000 is the sum of loan of user_id 1

                                }); 
                            }
                        })
                    })


                }
              });
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
    

    const Compute = (jiff_instance, opt) => {const MySharedTablePromise = getSharedTablePromise(props.jiffInstance, props.opt);
        console.log('MySharedTablePromise', MySharedTablePromise)
        MySharedTablePromise.then(function (output) {
            console.log('MySharedTablePromise in onSubmit', output)
            setAllPartiesSecret(output)
        })
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
        const result = getSharedTablePromise(props.jiffInstance, props.opt);
        setMyMessage('Sharing Secrets ... Please wait.') //reset message
        setLoading(true)
        setHideComputeButton(true)
        setTotalLoan(0)

        //const result = getSharedTablePromise(props.jiffInstance, props.opt);
        //console.log('onSubmitTotalLoan', totalLoan)
        /* const MySharedTablePromise = getSharedTablePromise(props.jiffInstance, props.opt);
        console.log('MySharedTablePromise', MySharedTablePromise)
        MySharedTablePromise.then(function (output) {
            console.log('MySharedTablePromise in onSubmit', output)
            setAllPartiesSecret(output)
        }) */
    }
    
    const onComputeResult =  (event) => {
        event.preventDefault();
        console.log('ComputeResult')
        //const result = getSharedTablePromise(props.jiffInstance, props.opt);
        //calculateFinalResult(props.jiffInstance, props.opt);
        //console.log('jiffInstance: ', props.jiffInstance)
        //console.log('opt',props.opt)
        console.log('userId in ComputeResult: ', userId)
        console.log('sumTotalLoanState in ComputeResult: ', sumTotalLoanState)
        if (userId == 1){
            setFinalResult(sumTotalLoanState[0])
        } else if (userId == 2){
            setFinalResult(sumTotalLoanState[1])
        } else if (userId == 3){
            setFinalResult(sumTotalLoanState[2])
        }
    }

    
    return (
        <div>
        
        
        {jsx}
        <div style={{ textAlign: 'left', marginTop: '20px', marginBottom: '20px'}}>
                        <Card color="blue" fluid >
                            <CardContent>   
                                <Form success={!!myMessage}>
                                    
                                    <div style={{ textAlign: 'right', marginRight: '200px', marginTop: '30px' , marginBottom: '20px' }}>
                                        {
                                            loading ? <Button loading primary>Loading</Button> : <Button primary type='submit' onClick={onSubmit}>Share</Button>
                                        } 
                                    </div>
                                    <Message success header="Info:" content={myMessage} />
                                </Form>
                            </CardContent>
                        </Card>
        
        </div>
        
        
        
        <div style={{ marginBottom: '30px'}}>
            {
                hideComputeButton ? null : 
                (
                <div>
                    <Container fluid>
                        <Card color="blue" fluid >
                        <CardContent>
                        <Form success={!!myMessage1}>
                        <Form.Field>
                            <Input style={{width: '80%', top: '10px', bottom: '30px', left: '20px', right: '20px'}}
                                label={{ basic: true, content: 'User ID to Query'}}
                                labelPosition='right' 
                                placeholder='Enter User ID'
                                value = {userId}
                                onChange = {(event) => setUserId(event.target.value)}/>
                        </Form.Field>
                        <div style={{ textAlign: 'right', marginRight: '200px', marginTop: '30px' , marginBottom: '20px' }}>
                            <Button primary type='submit' onClick={onComputeResult}>Compute Result</Button>
                        </div>
                        </Form>
                        {/* <Input style={{width: '80%', top: '10px', bottom: '30px', left: '20px', right: '20px'}}
                                        label={{ basic: true, content: 'Total Loan'}}
                                        labelPosition='right' 
                                        placeholder='Enter User ID'
                                        value = {finalResult}/> */}
                                        <Input disabled style={{width: '50%', top: '10px', bottom: '30px', left: '20px', right: '20px'}} 
                                                label="Total Loan" size="huge" value = {finalResult} />
                        </CardContent>
                        </Card>
                    </Container>
                </div>
                )    
            }
        </div>
           
    
        
    

        </div>
    );
}

export default ComputeTable;