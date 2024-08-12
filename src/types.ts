export interface IExchange {
    buyRate: number;
    SellRate: number;
    currencyTo: string;
    isChecked:boolean
    currencyFrom:string
  }

export  interface Ishow {
    getExchangeData(): Promise<void>
    exchangeData : IExchange
    toggleCheckBox: (value:string) => void
  }

type productKey = 'name' | 'description'
type shippingKey = 'address' | 'user'
type salesKey = 'productStatus'

export interface ISearchData{
  products:Record<productKey, string>
  shipping:Record<shippingKey, string>
  sales:Record<salesKey,string>
}

export interface IConvertMoney {
  currencyFrom?: string;
  currencyTo?: string;
}

export interface IUser{
  id:number, 
  username:string, 
  role: string,
  currency:string
}