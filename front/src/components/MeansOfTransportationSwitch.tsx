import React from "react";

export const MeansOfTransportationSwitch = () => {
  return (
    <>
      <div>#MeansOfTransportationSwitch</div>
      <form>
        <fieldset>
          <div>
            <input
              type="radio"
              id="contactChoice1"
              name="contact"
              value="email"
            />
            <label htmlFor="contactChoice1">社用車</label>

            <input
              type="radio"
              id="contactChoice2"
              name="contact"
              value="phone"
            />
            <label htmlFor="contactChoice2">公共交通機関</label>

            <input
              type="radio"
              id="contactChoice3"
              name="contact"
              value="mail"
            />
            <label htmlFor="contactChoice3">タクシー</label>
          </div>
          <div>
            <button type="submit">送信</button>
          </div>
        </fieldset>
      </form>
    </>
  );
};
