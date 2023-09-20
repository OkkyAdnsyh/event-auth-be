const EventModel = require('../Model/EventModel')

// @desc Register New Event
// @route POST /api/event/register
// @access Private
const eventRegister = async (req, res) => {
    // check if all field is filled
    if(!req.body.date || !req.body.month || !req.body.year) return res.status(400).json({message : 'Please fill all the fields'})
    // generate random token number
    const token = Math.floor(Math.random() * 9999)
    // save req.body
    const newEvent = new EventModel({
        scheduledAt : {
            date : req.body.date,
            month : req.body.month,
            year : req.body.year
        },
        createdBy : req.user._id,
        token : token
    })
    // save data to db
    try{
        await newEvent.save()
        return res.status(200).json({message : 'Event registered'})
    }catch{
        return res.status(500).json({message : 'Failed to register event'})
    }
}

// @desc Get all event
// @route GET /api/event/
// @access Private
const getAllEvent = async (req, res) => {
    try{
        // check if event existed
        const eventExist = await EventModel.where({createdBy : req.user._id}).findOne().exec()
        if(!eventExist) return res.status(400).json({message : 'No event registered'})

        const allEvent = await EventModel.where({createdBy : req.user._id}).find().exec()
        return res.status(200).json(allEvent)
    }catch{
        res.status(500).json({message : 'Error on Database'})
    }
}

// @desc update event
// @route PUT /api/event/:id
// @access Private
const updateEvent = async (req, res) => {

    // get the event target
    const targetEvent = await EventModel.where({_id : req.params.id, createdBy : req.user._id}).findOne().select('scheduledAt').exec()
    if(!targetEvent) return res.status(400).json({message : 'Event not found'})

    // save update
    targetEvent.scheduledAt.date = req.body.date
    targetEvent.scheduledAt.month = req.body.month
    targetEvent.scheduledAt.year = req.body.year
    
    try{
        await targetEvent.save()
        return res.status(200).json({message : 'Event update success'})
    }catch{
        res.status(500).json({message : 'Event failed to update'})
    }
}

// @desc delete event
// @route DELETE /api/event/:id
// @access Private
const deleteEvent = async (req, res) => {
    try{
        await EventModel.where({_id : req.params.id, createdBy : req.user._id}).deleteOne()
        return res.status(200).json({message : 'Event deleted'})
    }catch{
        res.status(500).json({message : 'Event failed to delete'})
    }
}


module.exports = {
    eventRegister,
    getAllEvent,
    updateEvent,
    deleteEvent
}