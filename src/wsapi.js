
import React, { useState } from "react";

import "./wsapi.css";
import * as XLSX from "xlsx";
import axios from "axios";
function WhatsAppButton(props) {

  const [items, setItems] = useState([]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };
  const send_messages=()=>{
    items.map((d) => {
        const payload={
            "messaging_product": "whatsapp",
            "recipient_type": "individual",
            "to": d.phone,
            "type": "template",
            "template": {
            "name": "hello_world",
            "language": {"code": "en_US"}
            
            }
        }
        const access_token="EAAIt0DjXVpsBADIsO5Q1JKRs2Tt7LHunJIIZBsDiZCkbZB7ZA1ubC5e4bZAnltVDL530a9WCHfm7pcSlWZCQsALySZC6oXZCxLpiucavfkVmmfEtKlsMJoz1MiBURHF1PausiseohVtdZCYcdTzAtwZB3g3lnfb2mJWQoprYg2ogPU89xFDaWMudYMm8bB20jbRZBXWbZCAKJiGELAZDZD"
        const headers = {"Authorization": "Bearer "+access_token
                ,"content-type":"application/json"}
        const url='https://graph.facebook.com/v15.0/113591618239054/messages'
        axios.post(url, payload, {
            headers:headers
        });
        
    })
  }

  return (
    <div className='whatsappSection d-flex flex-column justify-content-lg-between align-items-center text-white bg-dark'>
        <table class="table container text-white">
            <thead>
            <tr>
                <th scope="col">name</th>
                <th scope="col">phone</th>
            </tr>
            </thead>
            <tbody>
            {items.map((d) => (
                <tr key={d.name}>
                <th>{d.name}</th>
                <td>{d.phone}</td>
                </tr>
            ))}
            </tbody>
        </table>
        <div className="btnsdiv d-flex flex-row">
            <input
            className="file-input"
                type="file"
                onChange={(e) => {
                const file = e.target.files[0];
                readExcel(file);
                }}
            />
            <button className="send_btn" onClick={send_messages}>Send</button>

        </div>
        
      
    </div>
  )
}

export default WhatsAppButton
