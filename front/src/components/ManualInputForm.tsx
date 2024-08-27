import React from "react";

export const ManualInputForm = ({ route = {} }) => {
  return (
    <>
      <div>#ManualInputForm</div>
      <form action="/cost/request" method="POST">
        <label htmlFor="date">訪問先:</label>
        <br />
        <input type="text" id="date" name="date" required />
        <br />
        <br />

        <label htmlFor="vist">訪問先:</label>
        <br />
        <input type="text" id="vist" name="vist" required />
        <br />
        <br />

        <label htmlFor="ca">経費科目:</label>
        <br />
        <input type="text" id="ca" name="ca" required />
        <br />
        <br />

        <label htmlFor="way">移動手段:</label>
        <br />
        <input type="text" id="way" name="way" required />
        <br />
        <br />

        <h3>ルート情報</h3>
        <label htmlFor="from">出発地 (from):</label>
        <br />
        <input
          type="text"
          defaultValue={route.from}
          id="from"
          name="route[from]"
          required
        />
        <br />
        <br />

        {/* 経由地を追加できるようにする */}

        {/* <label htmlFor="point0">経由地1 (point0):</label><br />
        <input type="text" id="point0" name="route[point0]" /><br /><br />

        <label htmlFor="point1">経由地2 (point1):</label><br />
        <input type="text" id="point1" name="route[point1]" /><br /><br />

        <label htmlFor="point2">経由地3 (point2):</label><br />
        <input type="text" id="point2" name="route[point2]" /><br /><br />

        <label htmlFor="point3">経由地4 (point3):</label><br />
        <input type="text" id="point3" name="route[point3]" /><br /><br />

        <label htmlFor="point4">経由地5 (point4):</label><br />
        <input type="text" id="point4" name="route[point4]" /><br /><br /> */}

        <label htmlFor="to">目的地 (to):</label>
        <br />
        <input
          type="text"
          defaultValue={route.to}
          id="to"
          name="route[to]"
          required
        />
        <br />
        <br />

        <label htmlFor="route-way">ルートの移動手段:</label>
        <br />
        <input type="text" id="route-way" name="route[way]" required />
        <br />
        <br />

        <label htmlFor="amount">金額 (amount):</label>
        <br />
        <input
          type="number"
          defaultValue={route.amount}
          id="amount"
          name="route[amount]"
          step="0.01"
          required
        />
        <br />
        <br />

        {/* <label htmlFor="distance">距離 (distance):</label><br />
        <input type="number" defaultValue = {route.distance} id="distance" name="route[distance]" step="0.01" required /><br /><br /> */}

        <label htmlFor="memo">メモ:</label>
        <br />
        <textarea id="memo" name="memo"></textarea>
        <br />
        <br />

        <button type="submit">submit</button>
      </form>
    </>
  );
};
