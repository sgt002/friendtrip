var express = require('express');
const { Accessor } = require('../db/models/accessor');
const { addTrip, generateTripJSON } = require('../db/models/trip');
const { generateTravelerJSON, addTraveler, getTraveler } = require('../db/models/traveler');
var router = express.Router();

router.put('/signup', function (req, res, next) {
  // Callback for Firebase auth.
  handleCreateAccount = (status, code) => {
    const id = req.body.email.replace('.', '');

    if (status === 200) {
      const data = generateTravelerJSON(id, req.body.email, req.body.username, req.body.first,
        req.body.last, Date.now(), [], [], []);
      addTraveler(data, handleCreateTraveler);
    }
    else {
      res.json({ status: 401, code });
    }
  }

  // Callback for Firebase addObject (Traveler).
  handleCreateTraveler = (error) => {
    var status;
    if (error) status = 401;
    else status = 200;
    res.json({ status, code: "none" });
  }

  Accessor.createAccount(req.body.email, req.body.password, handleCreateAccount);
});

router.post('/login', function (req, res, next) {
  // Accessor's loginAccount callback function
  handleLoginAccount = (status, code) => {
    if (status === 200) {
      const id = req.body.email.replace('.', '');
      getTraveler(id, handleGetTraveler);
    }
    else {
      // Return error message
      res.json({ status: 401, code });
    }
  }

  // getTraveler callback function
  handleGetTraveler = (snapshotValue) => {
    res.json({ status: 200, code: "Success", id: snapshotValue.id });
  }
  Accessor.loginAccount(req.body.email, req.body.password, handleLoginAccount);
});

router.post('/logout', function (req, res) {
  // Accessor's logout callback function
  handleLogout = (status, code) => {
    if (status === 200) {
      // sign out successful
      res.json({ status: 200 });
    }
    else {
      // Return error message
      res.json({ status: 401, code });
    }
  }

  Accessor.logout(handleLogout);
});

router.put('/createTrip', function (req, res, next) {
  function generateId(length, chars) {
      var result = '';
      for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
      return result;
  }

  const id = ("trip_").concat(generateId(16, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'));
  const data = generateTripJSON(id, req.body.travelerId, req.body.name, Date.now(),
                                req.body.travelerIds, [], [], [], req.body.description, 
                                "", req.body.tripLeaders);

  handleAddTrip = (error) => {
    var status;
    if (error) status = 401;
    else status = 200;
    res.json({ status, tripId: id });
  }

  addTrip(data, handleAddTrip);
});

module.exports = router;
