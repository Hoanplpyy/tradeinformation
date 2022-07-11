export interface market {
  market: string,
  formControlName:string,
  trigger: boolean
}

export const marketNameArray: market[] = [
  { market: '新北市',formControlName:'newTaipei' ,trigger: true },
  { market: '宜蘭縣',formControlName:'yilan', trigger: false },
  { market: '桃園市',formControlName:'taoyuan', trigger: false },
  { market: '新竹縣',formControlName:'hsinchu', trigger: false },
  { market: '苗栗縣',formControlName:'miaoli', trigger: false },
  { market: '台中市',formControlName:'taichung', trigger: false },
  { market: '台中大安',formControlName:'taichungAnn', trigger: false },
  { market: '彰化縣',formControlName:'changhua', trigger: false },
  { market: '南投縣',formControlName:'nantou', trigger: false },
  { market: '雲林縣',formControlName:'yunlin', trigger: false },
  { market: '嘉義市',formControlName:'chiayiCity', trigger: false },
  { market: '嘉義縣',formControlName:'chiayi', trigger: false },
  { market: '臺南安南',formControlName:'tainanAnn', trigger: false },
  { market: '臺南市',formControlName:'tainan', trigger: false },
  { market: '高雄市',formControlName:'kaohsiung', trigger: false },
  { market: '高雄岡山',formControlName:'kaohsiungK', trigger: false },
  { market: '高雄鳳山',formControlName:'kaohsiungF', trigger: false },
  { market: '高雄旗山',formControlName:'kaohsiungC', trigger: false },
  { market: '屏東縣',formControlName:'pingtung', trigger: false },
  { market: '台東縣',formControlName:'taitung', trigger: false },
  { market: '花蓮縣',formControlName:'hualien', trigger: false },
  { market: '澎湖縣',formControlName:'penghu', trigger: false },
];





