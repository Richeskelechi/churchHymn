const hymnService = require('../services/hymnService');

const createHymn = async (req, res) => {
    try {
        const hymn = await hymnService.createHymn(req);
        res.status(201).json(hymn);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getHymnById = async (req, res) => {
    try {
        const hymn = await hymnService.getHymnById(req);
        res.status(200).json(hymn);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const getAllHymns = async (req, res) => {
    try {
        const hymns = await hymnService.getAllHymns(req);
        res.status(200).json(hymns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const searchHymns = async (req, res) => {
    try {
        const hymns = await hymnService.searchHymns(req);
        res.status(200).json(hymns);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateHymn = async (req, res) => {
    try {
        const hymn = await hymnService.updateHymn(req);
        res.status(200).json(hymn);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const deleteHymn = async (req, res) => {
    try {
        const hymn = await hymnService.deleteHymn(req);
        res.status(200).json(hymn);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const updateStatus = async (req, res) => {
    try {
        const hymn = await hymnService.updateStatus(req);
        res.status(200).json(hymn);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const toggleVisibility = async (req, res) => {
    try {
        const hymn = await hymnService.toggleVisibility(req);
        res.status(200).json(hymn);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

module.exports = {
    createHymn,
    getHymnById,
    getAllHymns,
    searchHymns,
    updateHymn,
    deleteHymn,
    updateStatus,
    toggleVisibility
};
