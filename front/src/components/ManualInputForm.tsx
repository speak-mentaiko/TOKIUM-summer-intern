import React,  {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { format } from 'date-fns';
// この2つはinstallしました
type Inputs = {
  date: Date, //利用日
  visit: string, //訪問先
  ca: string, //経費科目
  way: string, //移動手段
  route_from: string,
  route_via1: string|null, //経由地
  route_via2: string|null,
  route_via3: string|null,
  route_via4: string|null,
  to: string,
  route_way: string,
  route_amount: number,
  memo: string
};

export const ManualInputForm = ({ route = {} }) => {
  const API_BASE_URL = "http://localhost:3000/";
  const navigate = useNavigate();
  const [count, setCount] = useState<number>(0);

  const today = new Date()
  const defaultDate = format(today, 'yyyy-MM-dd')

  const {
    register,
    // watch,
    getValues,
    // formState: { errors }
  } = useForm<Inputs>();

  const onFormSubmit = (event) => {
    event.preventDefault();
    let inputRoute = getValues();
    // inputRoute["test"] = "test";
    // こんな感じで追加できます
    console.log(inputRoute)

    fetch(`${API_BASE_URL}api/v2/costs/request`, {
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

  const addViaSpots = (event) =>{
    event.preventDefault();
    if (count <= 3){setCount(count +1)};
  };

  const removeViaSpots = (event) =>{
    event.preventDefault();
    if (count >= 1){setCount(count - 1)};
  };  

  return (
    <>
      <div>#ManualInputForm</div>
      <form onSubmit = {onFormSubmit}>
        <label htmlFor="date">訪問日程:</label><br />
        <input defaultValue = {defaultDate} {...register("date")} type = "Date" required/><br /><br />

        <label htmlFor="visit">訪問先:</label><br />
        <input {...register("visit")} required /><br /><br />


        <label htmlFor="ca">経費科目:</label><br />
        <input {...register("ca")} /><br /><br />

        <h3>ルート情報</h3>
        <label htmlFor="route_from">出発地 (from):</label><br />
        <input defaultValue = {route.from} {...register("route_from")} required /><br /><br />

        <fieldset>
        <button onClick = {addViaSpots}>経由値を追加</button><br />


        {count >= 1 && (<>
          <label htmlFor="route_via1">経由1:</label><button onClick = {removeViaSpots}>-</button><br /><br />
          <input {...register("route_via1")} /><br /><br /></>)}

        {count >= 2 && (<>
          <label htmlFor="route_via2">経由2:</label><button onClick = {removeViaSpots}>-</button><br />
          <input {...register("route_via2")} /><br /><br /></>)}

          {count >= 3 && (<>
          <label htmlFor="route_via3">経由3:</label><button onClick = {removeViaSpots}>-</button><br />
          <input {...register("route_via3")} /><br /><br /></>)}

          {count >= 4 && (<>
          <label htmlFor="route_via4">経由4:</label><button onClick = {removeViaSpots}>-</button><br />
          <input {...register("route_via4")} /><br /><br /></>)}

        </ fieldset>

        <label htmlFor="route_to">目的地 (to):</label><br />
        <input defaultValue = {route.to} {...register("route_to")} required /><br /><br />

        <label htmlFor="route_way">ルートの移動手段:</label><br />
        <input {...register("route_way")} /><br /><br />

        <label htmlFor="route_amount">金額:</label><br />
        <input {...register("route_amount")} type="number" required /><br /><br />

        <label htmlFor="memo">メモ:</label><br />
        <textarea {...register("memo")} /><br /><br />

        <button type="submit">submit</button>
      </form>
    </>
  );
};
