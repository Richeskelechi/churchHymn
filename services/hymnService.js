const hymnRepository = require('../repositories/hymnRepository');
const { response } = require('../response/response');
const { validateCreateHymn, validateUpdateHymn, validateHymnId } = require('../validate/hymnValidate');
const { setCache, getCache, deleteCache } = require('../redisCache/cache');
const hymn_prefix = process.env.HYMN_CACHE_PREFIX

const createHymn = async (req) => {
    const { error } = validateCreateHymn(req.body);
    if (error) {
        return response(400, error.details[0].message, null, "Failure", req.apiId);
    }
    // Check if a hymn with the same title already exists
    const existingHymn = await hymnRepository.findByTitle(req.body.title);
    if (existingHymn) {
        return response(409, "A hymn with this title already exists", null, "Failure", req.apiId);
    }
    const hymn = await hymnRepository.createHymn(req.body);
    // Cache the hymn in Redis
    await setCache(`${hymn_prefix}:${hymn.id}`, hymn);
    return response(201, "Hymn created successfully", hymn, "Success", req.apiId);
};

const getHymnById = async (req) => {
    const { error } = validateHymnId(req.params.id);
    if (error) {
      return response(400, error.details[0].message, null, "Failure", req.apiId);
    }
  
    // Check Redis cache for the hymn
    const cachedHymn = await getCache(`${hymn_prefix}:${req.params.id}`);
    if (cachedHymn) {
      return response(200, "Hymn retrieved successfully", cachedHymn, "Success", req.apiId);
    }
  
    // If the hymn is not found in cache, retrieve it from the database
    const hymn = await hymnRepository.getHymnById(req.params.id);
    if (!hymn) {
      return response(404, "Hymn not found", null, "Failure", req.apiId);
    }
  
    // Cache the hymn for future use
    await setCache(`${hymn_prefix}:${hymn.id}`, hymn);
  
    return response(200, "Hymn retrieved successfully", hymn, "Success", req.apiId);
  };

const getAllHymns = async (req) => {
    const allHymns = await hymnRepository.getAllHymns();
    return response(200, "Hymns retrieved successfully", allHymns, "Success", req.apiId);
};

const searchHymns = async (req) => {
    const searchTerm = req.query.searchTerm;
    const results = await hymnRepository.searchHymns(searchTerm);
    return response(200, "Hymns retrieved successfully", results, "Success", req.apiId);
};

const updateHymn = async (req) => {
    // Step 1: Validate the ID
    const { error: idError } = validateHymnId(req.params.id);
    if (idError) {
        return response(400, `Invalid ID: ${idError.details[0].message}`, null, "Failure", req.apiId);
    }

    // Step 2: Validate the body
    const { error: bodyError } = validateUpdateHymn(req.body);
    if (bodyError) {
        return response(400, bodyError.details[0].message, null, "Failure", req.apiId);
    }

    // Step 3: Proceed with the update if validation passes
    const updatedHymn = await hymnRepository.updateHymn(req.params.id, req.body);
    if (!updatedHymn) {
        return response(404, "Hymn not found", null, "Failure", req.apiId);
    }
    // Cache the hymn in Redis
    await setCache(`${hymn_prefix}:${updatedHymn.id}`, updatedHymn);

    return response(200, "Hymn updated successfully", updatedHymn, "Success", req.apiId);
};

const deleteHymn = async (req) => {
    const { error } = validateHymnId(req.params.id);
    if (error) {
      return response(400, error.details[0].message, null, "Failure", req.apiId);
    }
  
    const deletedHymn = await hymnRepository.deleteHymn(req.params.id);
    if (!deletedHymn) {
      return response(404, "Hymn not found", null, "Failure", req.apiId);
    }
  
    // Remove the hymn from the cache
    await deleteCache(`${hymn_prefix}:${req.params.id}`);
  
    return response(200, "Hymn deleted successfully", null, "Success", req.apiId);
};

const updateStatus = async (req) => {
    // Step 1: Validate the ID
    const { error: idError } = validateHymnId(req.params.id);
    if (idError) {
        return response(400, `Invalid ID: ${idError.details[0].message}`, null, "Failure", req.apiId);
    }

    // Step 3: Fetch the hymn by ID
    const hymn = await hymnRepository.getHymnById(req.params.id);
    if (!hymn) {
        return response(404, "Hymn not found", null, "Failure", req.apiId);
    }
    // Step 4: Reverse the status (free <=> premium)
    const newStatus = hymn.status === 'free' ? 'premium' : 'free';

    // Step 5: Update the hymn's status
    const updatedHymn = await hymnRepository.updateStatus(req.params.id, newStatus);
    if (!updatedHymn) {
        return response(404, "Failed to update hymn status", null, "Failure", req.apiId);
    }
    // Cache the hymn in Redis
    await setCache(`${hymn_prefix}:${updatedHymn.id}`, updatedHymn);

    // Step 6: Return success response
    return response(200, `Hymn status updated to ${newStatus}`, updatedHymn, "Success", req.apiId);
};

const toggleVisibility = async (req) => {
    // Step 1: Validate the ID
    const { error: idError } = validateHymnId(req.params.id);
    if (idError) {
        return response(400, `Invalid ID: ${idError.details[0].message}`, null, "Failure", req.apiId);
    }

    // Step 2: Fetch the hymn by ID
    const hymn = await hymnRepository.getHymnById(req.params.id);
    if (!hymn) {
        return response(404, "Hymn not found", null, "Failure", req.apiId);
    }

    // Step 3: Reverse the visibility (true <=> false)
    const newVisibility = hymn.isVisible ? false : true;

    // Step 4: Update the hymn's visibility
    const updatedHymn = await hymnRepository.toggleHymnVisibility(req.params.id, newVisibility);
    if (!updatedHymn) {
        return response(404, "Failed to update hymn visibility", null, "Failure", req.apiId);
    }
    
    // Cache the hymn in Redis
    await setCache(`${hymn_prefix}:${updatedHymn.id}`, updatedHymn);

    // Step 5: Return success response with the updated hymn and visibility status
    const statusText = newVisibility ? "published" : "hidden";
    return response(200, `Hymn successfully ${statusText}`, updatedHymn, "Success", req.apiId);
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
