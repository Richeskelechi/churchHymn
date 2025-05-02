const Hymn = require('../models/Hymns');

const createHymn = async (hymnData) => {
    const hymn = new Hymn(hymnData);
    return await hymn.save();
};

const getHymnById = async (id) => {
    return await Hymn.findOne({ _id: id});
};

const findByTitle = async (title) => {
    return await Hymn.findOne({ title });
};

const getAllHymns = async () => {
    return await Hymn.find({ isVisible: true });
};

const searchHymns = async (searchTerm) => {
    return await Hymn.find({
        title: { $regex: searchTerm, $options: 'i' },
        isVisible: true
    });
};

const updateHymn = async (id, hymnData) => {
    return await Hymn.findByIdAndUpdate(id, hymnData, { new: true });
};

const deleteHymn = async (id) => {
    return await Hymn.findByIdAndDelete(id);
};

const updateStatus = async (id, status) => {
    return await Hymn.findByIdAndUpdate(id, { status }, { new: true });
};

const toggleHymnVisibility = async (id, isVisible) => {
    return await Hymn.findByIdAndUpdate(id, { isVisible }, { new: true });
};

module.exports = {
    createHymn,
    getHymnById,
    findByTitle,
    getAllHymns,
    searchHymns,
    updateHymn,
    deleteHymn,
    updateStatus,
    toggleHymnVisibility
};
