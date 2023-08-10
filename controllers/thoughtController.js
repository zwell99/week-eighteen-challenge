const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
    // Get all
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Get one
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Create one
    async createThought(req, res) {
        try {
            const thought = Thought.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Delete one
    async deleteThought(req, res) {
        try {
            const thought = Thought.findOneAndRemove({ _id: req.params.thoughtId });
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            const user = User.findOneAndUpdate(
                { thoughts: req.params.thoughtId },
                { $pull: { thoughts: req.params.thoughtId } },
                { new: true }
            );
            if (!user) {
                return res.status(404).json({message: 'Thought deleted, but no User found'});
            }

            res.json({message: "Thought successfully deleted"})
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Add reaction
    async addReaction(req, res) {
        try {
            const thought = Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // Remove reaction
    async removeReaction(req, res) {
        try {
            const thought = Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }
}