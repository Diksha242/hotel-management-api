// Express route act as traffic police which manage the flow 
// it help us to organise and manage these pages or endpoints

const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

// POST request to add a person
router.post('/',async(req,res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('data saved');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


//Get method to get the person 
router.get('/',async (req,res) =>{
  try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
  } catch(err){
   console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})


router.get('/:workType',async(req,res) =>{
  try{
    const workType = req.params.workType;
    if(workType == 'Chef' || workType == 'Waiter' || workType == 'Manager'){

      const response = await Person.find({work: workType});
        res.status(200).json(response);
      console.log('response fetched');
    } else{
      res.status(404).json({error:'Invalid worktype'});
    }

  } catch(err){
    console.log(err);
    res.status(500).json({error:'Internal Server Error'});
  }
})

// Update a person by ID
router.put('/:id', async (req, res) => {
  try {
    const personId = req.params.id;        // Extract id from URL
    const updatedPersonData = req.body;    // Data to update

    const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
      new: true,          // return the updated document
      runValidators: true // validate before saving
    });

    if (!response) {  // ✅ check if document was found in DB
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person updated');
    res.status(200).json(response);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a person by ID
router.delete('/:id', async (req, res) => {
  try {
    const personId = req.params.id;

    const response = await Person.findByIdAndDelete(personId);

    if (!response) {
      return res.status(404).json({ error: 'Person not found' });
    }

    console.log('Person deleted:', response);
    res.status(200).json({ message: 'Person deleted successfully', deleted: response });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

 module.exports = router;