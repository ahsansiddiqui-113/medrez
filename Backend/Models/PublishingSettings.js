const mongoose = require('mongoose');

const publishingSettingsSchema = new mongoose.Schema({
    institutionName: { type: String, required: true },
    departmentName: { type: String, required: true },
    isSearchable: { type: Boolean, default: false },
    extraSearchTerms: { type: String, default: '' },
    requirePassword: { type: Boolean, default: false },
    password: { type: String, default: '' },
    timezone: { type: String, default: '' },
});

const PublishingSettings = mongoose.model('PublishingSettings', publishingSettingsSchema);

module.exports = PublishingSettings;
