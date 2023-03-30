/**
 * 
 */
 const paymentStart = () =>{
    console.log("payment started");
    let amount= $("#payment_feild").val();
    console.log(amount);
    if(amount=='' || amount==null){
        //alert("not entered any amount");
        swal("Failed", "amount is required !!", "error");
        
        return;
    }


    $.ajax(
        {
            url: '/user/create_order',
            data:JSON.stringify({amount:amount,info:'order_request'}),
            contentType:'application/json',
            type:'POST',
            dataType:'json',
            success:function(response){
                console.log(response)
                if(response.status=='created')
                {
                    //open payment form
                    var options = {
                        "key": "rzp_test_PFZxZKQKKk12A1", 
                        "amount": "7", 
                        "currency": "INR",
                        "name": "Donate now  ",
                        "description": "Donation for trip",
                        "image": "https://media.licdn.com/dms/image/C5603AQE41_bRxdz63A/profile-displayphoto-shrink_800_800/0/1629359013790?e=1685577600&v=beta&t=6jWyP3P2bWiLucf1TvvrfTUqO2z0WZ-oz0wexJZIY14",
                        "order_id": response.id,
                        handler:function(response){
                            console.log(response.razorpay_payment_id)
                            console.log(response.razorpay_signature)
                            console.log('payement sucessful !!')
                            //alert("congrates !! Payment successful !!")
                            swal("Good job!", "congrates !! Payment successful !!", "success");
                        },
                        "prefill": {
                            "name": "",
                            "email": "",
                            "contact": ""
                            },


                            "notes": {
                                "address": "Preetam Chand Lahre"
                            },


                            "theme": {
                                "color": "#3399cc"
                            }
                };

                let rzp = new Razorpay(options);
                rzp.on('payment.failed', function (response){
                    console.log(response.error.code);
                    console.log(response.error.description);
                    console.log(response.error.source);
                    console.log(response.error.step);
                    console.log(response.error.reason);
                    console.log(response.error.metadata.order_id);
                    console.log(response.error.metadata.payment_id);
                    alert("oops payment failed !!")
                    swal("Failed!", "oops payment failed !!", "error");
                    
                    });
                rzp.open();



            }
            },
            error:function(error){
                console.log('something went wrong!!')
            }

        }
    )








};


 