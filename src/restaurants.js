import connectDb from './connectDb.js';

//SAME AS ABOVE: 
export const addRestaurant = async (req, res) => {
    // check if request is valid
    if(!req.body || !req.body.name || !req.body.address) { // checking to see if there's not a body, or if there's not a body with a name, or if there's not a body with an address
        res.status(401).send('Invalid request');
        return; 
    }
    // connect to Firestore
    const db = connectDb();
    // prepate the data
    const newRestaurant = {
        name: req.body.name,
        address: req.body.address,
        rating: req.body.rating || 3,
        cuisine: req.body.cuisine || 'American',
    }
    // add data to the restaurants collection
    try {
        const doc = db.collection('restaurants').add(newRestaurant);
        res.status(201).send('Restaurant created ' + doc.id);
        // we can do .then .catch to but we'll practice async await
    // respond with success 
    }catch (err) {
    // respond with error 
    res.status(500).send(err);
    }
}

export const getAllRestaurants = async (req, res) => {
    const db = connectDb();
    try {
        const snapshot = await db.collection('restaurants').get();
        const restaurantsArray = snapshot.docs.map(doc => {
            let restaurant = doc.data();
            restaurant.id = doc.id;
            return restaurant;
        })
        res.send(restaurantsArray);
    } catch (err) {
        res.status(500).send(err);
    }
}