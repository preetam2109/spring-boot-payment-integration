package com.preetamlahre.springbootpaymentintegration;

import java.util.Map;



import org.json.JSONObject;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;

@RestController
@RequestMapping("/user")
public class MyController {
	
	
	@PostMapping("/create_order")
    @ResponseBody
    public String createOrder(@RequestBody Map<String, Object>data) throws Exception {
       // System.out.println("Hey order function executed");
        System.out.println(data);
        int amt=Integer.parseInt(data.get("amount").toString());
        var client=new RazorpayClient("rzp_test_PFZxZKQKKk12A1", "JLm4cfzDJE7uB3Z2niY6Rr1g");
        
        JSONObject ob = new JSONObject();
        ob.put("amount", amt*100);
        ob.put("currency", "INR");
        ob.put("receipt", "txn_123456");
        Order order = client.Orders.create(ob);
        System.out.println(order);
        
        return order.toString();
    }
}
