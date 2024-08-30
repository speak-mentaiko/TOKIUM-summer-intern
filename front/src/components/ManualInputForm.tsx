import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { format } from 'date-fns';
import { userState } from "../hooks/userState.ts";

type Inputs = {
  date: string, // 日付をstring型で管理
  visit: string,
  ca: string,
  way: string,
  route_from: string,
  route_via1: string | null,
  route_via2: string | null,
  route_via3: string | null,
  route_via4: string | null,
  to: string,
  route_way: string,
  route_amount: number,
  memo: string
};

interface ManualInputFormProps {
  route: {
    id: number;
    route_id: string;
    from: string;
    via0?: string;
    via1?: string;
    via2?: string;
    via3?: string;
    via4?: string;
    route_to: string;
    way: string;
    amount: string;
    distance: number;
    created_at: string;
    updated_at: string;
  }
}

export const ManualInputForm = ({ route = {} }: ManualInputFormProps) => {
  const API_BASE_URL = "http://localhost:3000/";
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);

  const userId = useRecoilValue(userState);

  const formatDate = (inputDate: string): string => {
    const date = new Date(inputDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState<Inputs>({
    date: route.created_at 
    ? formatDate(route.created_at) 
    : format(new Date(), 'yyyy-MM-dd'),
    visit: '',
    ca: '',
    route_from: route.from || '',
    route_via1: route.via0 || null,
    route_via2: route.via1 || null,
    route_via3: route.via2 || null,
    route_via4: route.via3 || null,
    route_to: route.to || '',
    route_way: route.way || '',
    route_amount: route.amount && parseInt(route.amount.replace(/[^0-9]/g, ''), 10) || 0,
    memo: ''
  });

useEffect(() => {
  setFormData({
    date: route.created_at 
    ? formatDate(route.created_at) 
    : format(new Date(), 'yyyy-MM-dd'),
    visit: '',
    ca: '',
    route_from: route.from || '',
    route_via1: route.via0 || null,
    route_via2: route.via1 || null,
    route_via3: route.via2 || null,
    route_via4: route.via3 || null,
    route_to: route.to || '',
    route_way: route.way || '',
    route_amount: route.amount && parseInt(route.amount.replace(/[^0-9]/g, ''), 10) || 0,
    memo: ''
  });
},[Object.keys(route).length === 0])



  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name= e.target.name;
    const value= e.target.value;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const onFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const inputRoute = {
      ...formData,
      user_id: userId
    };

    console.log(inputRoute)

    fetch(`${API_BASE_URL}/api/v2/costs/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inputRoute),
    })
    .catch((error) => console.log(error));

    alert('submitted!');
    navigate('/home');
  };

  const addViaSpots = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (count <= 3) setCount(count + 1);
  };

  const removeViaSpots = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (count >= 1) setCount(count - 1);
  };

  return (
    <>
      <div>#ManualInputForm</div>
      <form onSubmit={onFormSubmit}>
        <label htmlFor="date">訪問日程:</label><br />
        <input
          name="date"
          value={formData.date}
          onChange={handleChange}
          type="date"
          required
        /><br /><br />

        <label htmlFor="visit">訪問先:</label><br />
        <input
          name="visit"
          value={formData.visit}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="ca">経費科目:</label><br />
        <input
          name="ca"
          value={formData.ca}
          onChange={handleChange}
        /><br /><br />

        <h3>ルート情報</h3>
        <label htmlFor="route_from">出発地 (from):</label><br />
        <input
          name="route_from"
          defaultValue = {route.from}
          value={formData.route_from}
          onChange={handleChange}
          required
        /><br /><br />

        <fieldset>
          <button onClick={addViaSpots}>経由地を追加</button><br />

          {count >= 1 && (
            <>
              <label htmlFor="route_via1">経由1:</label><button onClick={removeViaSpots}>-</button><br /><br />
              <input
                name="route_via1"
                value={formData.route_via1 || ''}
                onChange={handleChange}
              /><br /><br />
            </>
          )}

          {count >= 2 && (
            <>
              <label htmlFor="route_via2">経由2:</label><button onClick={removeViaSpots}>-</button><br />
              <input
                name="route_via2"
                value={formData.route_via2 || ''}
                onChange={handleChange}
              /><br /><br />
            </>
          )}

          {count >= 3 && (
            <>
              <label htmlFor="route_via3">経由3:</label><button onClick={removeViaSpots}>-</button><br />
              <input
                name="route_via3"
                value={formData.route_via3 || ''}
                onChange={handleChange}
              /><br /><br />
            </>
          )}

          {count >= 4 && (
            <>
              <label htmlFor="route_via4">経由4:</label><button onClick={removeViaSpots}>-</button><br />
              <input
                name="route_via4"
                value={formData.route_via4 || ''}
                onChange={handleChange}
              /><br /><br />
            </>
          )}
        </fieldset>

        <label htmlFor="to">目的地 (to):</label><br />
        <input
          name="route_to"
          value={formData.route_to}
          onChange={handleChange}
          required
        /><br /><br />

        <label htmlFor="route_way">ルートの移動手段:</label><br />
        <input
          name="route_way"
          value={formData.route_way}
          onChange={handleChange}
        /><br /><br />

        <label htmlFor="route_amount">金額:</label><br />
        <input
          name="route_amount"
          value={formData.route_amount}
          onChange={handleChange}
          type="number"
          required
        /><br /><br />

        <label htmlFor="memo">メモ:</label><br />
        <textarea
          name="memo"
          value={formData.memo}
          onChange={handleChange}
        /><br /><br />

        <button type="submit">submit</button>
      </form>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
};