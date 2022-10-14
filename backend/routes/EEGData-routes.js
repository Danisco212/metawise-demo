const express = require('express');

const { check } = require('express-validator');


const eegdataControllers = require('../controller/eegdata-controller');

const router = express.Router();



router.get('/:eid', eegdataControllers.getEEGDataById);

router.post('/', 
eegdataControllers.createEEGData);

/* [check('pow')
.not()
.isEmpty(),
check('eq').not().isEmpty()],  */

router.patch('/:eid', 
check('neurocitygamma').not().isEmpty(),
check('time').isLength({min: 1})
,eegdataControllers.updateEEGData); 

router.delete('/:eid', eegdataControllers.deleteEEGData)

module.exports = router;