const express = require('express');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json())
app.use(cookieSession({
  name:'myUser',
  keys:['c30ce10daba199eb1e2951cc4369a1f729c3e6d89ebbfdc0e7074eefca2781b2']
}))

const users = [
  { id:1, username:'Ali', role: 'admin',currency:'USD'},
  { id:2, username:'Jack', role:'user', currency:'CAD'}]

  let exchangeMoney = 
  [{
    currencyTo:'CAD',
    buyRate: 0.72,
    SellRate:  1.37,
    isChecked:false,
    currencyFrom:'USD'
  },
  {
    currencyTo:'USD',
    buyRate: 41.800 ,
    SellRate: 0.00002,
    isChecked:false,
    currencyFrom:'IRR'
  },
  {
    currencyTo:'IRR',
    buyRate: 0.00003,
    SellRate: 30.442,
    isChecked:false,
    currencyFrom:'CAD'
  }
  ]

app.post('/login',(req,res) => {
  const { username } = req.body
  const user = users.find( user => user.username == username)
  if(req.session.isPopulated){
    res.status(400).json('You are already logged In, please log out first')
  }else if(user){
    req.session.user = user;
    res.status(200).json({message: 'login successful', user})
  }else{
    res.status(401).json({message:'Invalid credentials'})
  }
})

app.post('/logout', (req,res) => {
  req.session = null
  res.status(200).json({message:'Logout Successul'})
})

app.get('/currency', (req,res) => {
  const {user} = req.session
  if(user){
    res.status(200).json(user.currency)
  }else{
    res.status(401).json({message:'unAuthorized'})
  }
})


app.get('/exchange', (req,res) => {
  res.json(exchangeMoney)
})

app.get('/convert', (req,res) => {
  const budget = req.query.budget
  const currencyFrom = req.query.currencyFrom
  const currencyTo = req.query.currencyTo
  const currencyExist = exchangeMoney.find(cr => cr.currencyFrom == currencyFrom && cr.currencyTo == currencyTo)
  const reverseCurrency = exchangeMoney.find(cr => cr.currencyTo == currencyFrom && cr.currencyFrom == currencyTo)

  if(currencyExist){
   const convert = budget / currencyExist.buyRate
   res.status(200).json(convert) 
  }
  if(reverseCurrency){
    const convert = budget / reverseCurrency.SellRate
    res.status(200).json(convert) 
  }

  res.status(402).send('Not found!')
})

app.put('/exchange', (req,res) =>{
  const newBuyRate = req.body.buyRate
  console.log('new buy rte-->', newBuyRate)
  const currency = req.body.currency
  console.log('currency to change-->', currency)

  currencyIndex = exchangeMoney.findIndex(cr => cr.currencyFrom == currency)
  console.log('found index', currencyIndex)

  if(currencyIndex>=0){
   exchangeMoney[currencyIndex].buyRate = newBuyRate
   return res.status(200).send('Successful')
  }

  res.status(402).send('Source not found!')
  
})


app.listen(process.env.PORT || 8080);
