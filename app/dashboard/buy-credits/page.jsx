"use client";
import React, { useContext, useState } from "react";
import { Button } from "@/components/ui/button";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { db } from "@/config/db";
import { UserDetailContext } from "@/app/_context/UserDetailContext";
import { useRouter } from "next/navigation";
function BuyCredits() {
  const creditsOptions = [
    {
      credits: 5,
      amount: 0.99,
    },
    {
      credits: 10,
      amount: 1.99,
    },
    {
      credits: 25,
      amount: 3.99,
    },
    {
      credits: 50,
      amount: 6.99,
    },
    {
      credits: 100,
      amount: 9.99,
    },
  ];
const router=useRouter();
  const [selectedOption, setSelectedOption] = useState([]);
 const {userDetail,setUserDetail}=useContext(UserDetailContext)
  const onPaymentSuccess=async()=>{
    console.log("Payment Success...")
    //update user credits in db
    const result=await db.update(Users).set({
      credits:userDetail?.credits+selectedOption?.credits
    }).returning({id:Users.id})

    if(result){
      setUserDetail(prev=>({
        ...prev,
        credits:userDetail?.credits+selectedOption?.credits
      }))
      router.push('/dashboard')
    }
  }
  return (
    <div >
      <h2 className="font-bold text-2xl mb-2">Buy More Credits</h2>
      <p>
        Unlock endless possibilities - Buy more credits and transform your room
        with AI magic!✨🛋️
      </p>
      <div className="gap-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-4">
        {creditsOptions.map((item, index) => (
          <div
            className={`shadow-lg  flex flex-col gap-2 justify-center items-center p-4 border rounded-md
                    ${
                      selectedOption?.credits === item.credits &&
                      "border-purple-900 shadow-purple-500"
                    }`}
          >
            <h2 className="text-center">{item.credits} </h2>
            <h2 className="font-medium text-xl">Credits</h2>
            <Button className="w-full" onClick={() => setSelectedOption(item)}>
              Select
            </Button>
            <h2 className="font-medium text-purple-500">${item.amount}</h2>
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-col items-center justify-center">
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            onApprove={()=>onPaymentSuccess()}
            onCancel={()=>console.log("Payment Cancel")}
            createOrder={(data, actions) => {
              return actions?.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption?.amount?.toFixed(2),
                      currency_code:'USD'
                    },
                  },
                ],
              });
            }}
          />
        )}
        <Button className="mt-6 flex flex-col items-center" onClick={() => router.push('/dashboard')}>
  🔙 Go Back to Dashboard
</Button>
      </div>
    </div>
  );
}

export default BuyCredits;
