const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem');



// Post for adding menuItem in list
router.post('/',async(req,res)=>{
  try{
    const data = req.body;
    const newMenu = new MenuItem(data);

    const response = await newMenu.save();
    console.log('Menu Saved ');
    res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

// Get the menu list 
router.get('/', async(req,res)=>{
  try{
    const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
      
  } catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})



router.get('/:tasteType',async(req,res) =>{
  try{
    const tasteType = req.params.tasteType;
    if(tasteType == 'sweet' || tasteType == 'sour'|| tasteType == 'spicy'){

      const response = await MenuItem.find({taste: tasteType});
        res.status(200).json(response);
      console.log('response fetched');
    } else{
      res.status(404).json({error:'Invalid tasteType'});
    }

  } catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

 module.exports = router;