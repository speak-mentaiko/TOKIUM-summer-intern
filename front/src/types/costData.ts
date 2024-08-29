export type costData = {
  id: number;
  cost_id: string;
  user_id: string; //申請者
  date: string; //利用日
  visit: string; //訪問先
  ca: string; //経費科目
  route_from: string; //出発地
  route_via0: string | null; //経由地
  route_via1: string | null;
  route_via2: string | null;
  route_via3: string | null;
  route_via4: string | null;
  route_to: string; //到着地
  route_way: string; //移動方法
  route_amount: number; //金額
  memo: string;
  approval_user_id: string | null; //承認者
  approval_status: string | null;
  approval_date: string | null; //承認日
  approval_message: string | null;
};
