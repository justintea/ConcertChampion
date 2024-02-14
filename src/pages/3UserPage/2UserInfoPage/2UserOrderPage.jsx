// import UserpreferenceForm from "../../../components/UserPreferenceForm/UserpreferenceForm";
import { Outlet, useOutletContext } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, Divider, List, Skeleton } from 'antd';
import { getToken } from "../../../utilities/0usersService";

export default function UserOrderPage() {
  const { orders, setOrders } = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  //? try 3. 
  const [hasMore, setHasMore] = useState(true);

  //? probably a list 
  console.log(orders);
  //? many arrays
  //? for arrays, go into object 

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.results]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadMoreData();
  }, []);
  

   //? try 2. use Order state method
  //  if (loading) {
  //     return;
  //   }
  //  setLoading(true);
   
  //  fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
  //   fetch('/api/orders', options)

  //     .then((res) => res.json())
  //     .then((body) => {
  //       setData([...data, ...body.results]);
  //       setLoading(false);
  //   })
   
  // setData(...orders, orders);
  //      setLoading(false);
      
   
   //? try 1. fetch GET method
//    if (loading) {
//     return;
//   }
//  setLoading(true);
 
//  const token = getToken();

//  const headers = {
//   "Content-type": "application/json",
//   Authorization: `Bearer ${token}`,
// };

//  const options = {
//   method: "GET",
//   headers,
// };
// //  fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
//  await fetch('/api/orders', options)

//     .then((res) => res.json())
//     .then((body) => {
//       setData([...data, ...body.results]);
//       setLoading(false);
//     })
//     .catch(() => {
//       setLoading(false);
//     });

   //? savept
//    if (loading) {
//     return;
//   }
//  setLoading(true);
 
//  const token = getToken();

//  const headers = {
//   "Content-type": "application/json",
//   Authorization: `Bearer ${token}`,
// };

//  const options = {
//   method: "GET",
//   headers,
// };
// //  fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
//  await fetch('/api/orders', options)

//     .then((res) => res.json())
//     .then((body) => {
//       setData([...data, ...body.results]);
//       setLoading(false);
//     })
//     .catch(() => {
//       setLoading(false);
//     });
   
  // };


  // useEffect(() => {
  //   loadMoreData();
  // }, []);

  
  return (
    <>
      <h2 style={{ fontFamily: "Palatino Linotype" }}> Your Orders </h2>
      <p> probably a list 'Orders', mapped into items and rendered here</p>
      <div
      id="scrollableDiv"
      style={{
        height: 400,
        overflow: 'auto',
        padding: '0 16px',
        border: '1px solid rgba(140, 140, 140, 0.35)',
      }}
    >
      <InfiniteScroll
        dataLength={data.length}
        next={loadMoreData}
        hasMore={data.length < 50}
        loader={
          <Skeleton
            avatar
            paragraph={{
              rows: 1,
            }}
            active
          />
        }
        endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
        scrollableTarget="scrollableDiv"
      >
        <List
          dataSource={data}
          renderItem={(orders) => (
            <List.Item key={orders._id}>
              <List.Item.Meta
                // avatar={<Avatar src={item.picture.large} />}
                //  this should be the Order number
                title={<span>{orders._id}</span>}
                // this should be details of the order 
                description={`Date: ${new Date(orders.dateTime).toLocaleString()}`}       
              />
                {orders.items.map((item, index) => (
          <div key={index}>
            <strong>Service:</strong> {item.title} <br />
            <strong>Details:</strong> {JSON.stringify(item.details)} <br />
            <strong>Total Price:</strong> {item.details.itemPrice} <br />
            <br />
          </div>
        ))}
              {/* this should be the total price */}
              <div>Content</div>              
            </List.Item>
          )}
        />
      </InfiniteScroll>
      </div>
      <br></br>
      <br></br>
    
    </>);
}