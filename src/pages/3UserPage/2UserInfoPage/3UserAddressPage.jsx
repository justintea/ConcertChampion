import { Outlet, useOutletContext } from "react-router-dom";
import { Badge, Descriptions } from 'antd';
import './3UserAddressPage.css';

export default function UserAddressPage() {

  //? needs to have a form
      //? onfinish - does the post request 
  //? and a place it renders this

  const items = [
    {
      key: '1',
      label: 'Full name',
      children: 'Anthony Stark',
    },
    {
      key: '2',
      label: 'Phone Number',
      children: '+1 999 9999',
    },
    {
      key: '3',
      label: 'Automatic Renewal',
      children: 'YES',
    },
    {
      key: '4',
      label: 'Order time',
      children: '2018-04-24 18:00:00',
    },
    {
      key: '5',
      label: 'Usage Time',
      span: 2,
      children: '2019-04-24 18:00:00',
    },
    {
      key: '6',
      label: 'Account status',
      span: 3,
      children: <Badge status="processing" text="Active" />,
    },
    {
      key: '7',
      label: 'Negotiated Amount',
      children: '$80.00',
    },
    {
      key: '8',
      label: 'Discount',
      children: '$20.00',
    },
    {
      key: '9',
      label: 'Official Receipts',
      children: '$60.00',
    },
    {
      key: '10',
      label: 'Config Info',
      children: (
        <>
          Data disk type: MongoDB
          <br />
          Database version: 3.4
          <br />
          Package: dds.mongo.mid
          <br />
          Storage space: 10 GB
          <br />
          Replication factor: 3
          <br />
          Region: East China 1
          <br />
        </>
      ),
    },
  ];
  
  return (
    <>
      <h2 style={{ fontFamily: "Palatino Linotype" }}> Address & Contact details </h2>
      <p> render </p>
      <Descriptions title="User Info" layout="vertical" bordered items={items}  />
      <br></br>
      <br></br>
    </>);
}