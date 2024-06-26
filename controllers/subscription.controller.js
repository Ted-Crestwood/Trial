const Subscription = require("../models/subscription.model");
const sendSubscription = require("../util/sendSubscription");

const createSubscription = async (req, res) => {
    const subs = req.body;
    const email = subs.email;
    try {
        // if (!subs ) {
        //     res.status(404).json({ message: 'Failed to create subscription' })
        // }
        // } else {
        //     await sendSubscription(subs.email)
        //     await Subscription.create(subs)
        //     res.status(201).json({ message: 'Subscription created successfully' })
        // }
        const existingSubscriber = await Subscription.find({ email: email })
        if (existingSubscriber === email) {
            res.status(500).json({ message: 'Subscriber already exists' })
        } else {
            await sendSubscription(email)
            await Subscription.create(subs)
            res.status(201).json({ message: 'Subscription created successfully' })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getSubscribers = async (req, res) => {
    const subscriber = await Subscription.find({},{_id:0})
    try {
        if (!subscriber) {
            res.status(404).json({ message: 'No subscribers yet' })
        } else {
            res.status(201).json({ message: 'Subscribers found', subscriber: subscriber})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createSubscription, getSubscribers }